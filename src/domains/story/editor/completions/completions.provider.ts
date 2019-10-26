import { ParserRuleContext } from 'antlr4ts';
import { AbstractParseTreeVisitor } from 'antlr4ts/tree';
import * as vscode from 'vscode';

import { StoryModel } from '../../grammar/model';
import { ExpressionTextContext, FeatureKeywordContext, VariableRefContext } from '../../grammar/parser/StoryParser';
import { StoryVisitor } from '../../grammar/parser/StoryVisitor';
import { STORY_LANGUAGE_ID } from '../../story.model';
import { StoryLanguageSupport } from '../story.language-support';
import { ExpressionCompletionItems, FeatureCompletionItems, VariableRefCompletionItems } from './adapters';
import { CompletionItemsProvider } from './completions.model';
import * as snippets from './completions.snippets';

let storyLanguageSupport: StoryLanguageSupport;

export function createCompletionItemProvider(languageSupport: StoryLanguageSupport) {
    storyLanguageSupport = languageSupport;

	return vscode.languages.registerCompletionItemProvider(STORY_LANGUAGE_ID, {
		provideCompletionItems(document: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken, context: vscode.CompletionContext) {
            
            const storyModel = storyLanguageSupport.getModel(document.uri);
			const completionProvider = new StoryCompletionItemsProvider(storyModel);
			return completionProvider.provideCompletionItems(document, position);
		}
	});
}

export class StoryCompletionItemsProvider implements CompletionItemsProvider {

    constructor(private model: StoryModel){}

    provideCompletionItems(document: vscode.TextDocument, position: vscode.Position): vscode.CompletionItem[] {
        const lineIndex = position.line + 1;

        if (this.model.isEmpty()){
            return this.defaultFeatureKeyword(document, position);
        }

        if (this.positionIsBeforeFeature(lineIndex)){
            return [];
        }

        const completionProviderFinder = new FindCompletionItemsProvider(position);
        const completionProvider = this.model.getContext().accept(completionProviderFinder);
        if (completionProvider){
            return completionProvider.provideCompletionItems(document, position);
        }
        
        return [];
    }


    private defaultFeatureKeyword(document: vscode.TextDocument, position: vscode.Position): vscode.CompletionItem[] {
        
        const item = new vscode.CompletionItem('Feature');
        item.detail = 'Add Feature: keyword';
        item.insertText = new vscode.SnippetString(snippets.default_feature_for_empty_file);
        item.kind = vscode.CompletionItemKind.Keyword;
        item.range = this.findRangeToInsertFeatureKeyword(document, position);

        return [ item ];
    }

    private findRangeToInsertFeatureKeyword(document: vscode.TextDocument, position: vscode.Position) {
        let range: vscode.Range;
        const textLine = document.lineAt(position.line);
        if (textLine.isEmptyOrWhitespace) {
            range = new vscode.Range(new vscode.Position(textLine.lineNumber, 0), new vscode.Position(textLine.lineNumber, 'Feature:'.length));
        }
        return range;
    }

    private positionIsBeforeFeature(line: number) {
        const lines = this.model.getUsedLines();
        return line < lines[0];
    }


}

class FindCompletionItemsProvider extends AbstractParseTreeVisitor<CompletionItemsProvider | undefined> 
                                  implements StoryVisitor<CompletionItemsProvider | undefined> {

    constructor(private position: vscode.Position){
        super();
    }

    protected defaultResult() {
        return undefined;
    }

    visitVariableRef(ctx: VariableRefContext){
        if (this.containsPosition(ctx)){
            return new VariableRefCompletionItems(ctx);
        }
        return undefined;
    }

    visitExpressionText(ctx: ExpressionTextContext){
        if (this.containsPosition(ctx)){
            return new ExpressionCompletionItems(ctx);
        }
        return undefined;
    }

    visitFeatureKeyword(ctx: FeatureKeywordContext){
        if (this.containsPosition(ctx)){
            return new FeatureCompletionItems(ctx);
        }
        return undefined;
    }

    aggregateResult(aggregate: CompletionItemsProvider | undefined, nextResult: CompletionItemsProvider | undefined): CompletionItemsProvider{
        if (aggregate && nextResult){
            throw new Error('Multiple rules matched');
        }
        if (nextResult){
            aggregate = nextResult;
        }
        return aggregate;
    }

    private containsPosition(ctx: ParserRuleContext){
        const tokenLine = ctx.start.line - 1;
        if (this.position.line !== tokenLine){
            return false;
        }

        const tokenStartIndex = ctx.start.charPositionInLine;
        const tokenStopIndex = tokenStartIndex + ctx.text.length;

        return this.position.character >= tokenStartIndex &&
               this.position.character <= tokenStopIndex;
    }

}