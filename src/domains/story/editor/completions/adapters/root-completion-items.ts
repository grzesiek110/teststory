import * as vscode from 'vscode';
import { ParserRuleContext } from 'antlr4ts';
import { AbstractParseTreeVisitor } from 'antlr4ts/tree';

import { StoryModel } from '../../../grammar/model';
import { ExpressionTextContext, FeatureKeywordContext, VariableRefContext, ExpressionContext } from '../../../grammar/parser/StoryParser';
import { StoryVisitor } from '../../../grammar/parser/StoryVisitor';
import { CompletionItemsProvider } from '../completions.model';
import { ExpressionCompletionItems } from './expression-completion-items';
import { FeatureCompletionItems } from './feature-completion-items';
import { VariableRefCompletionItems } from './variable-ref-completion-items';

import * as snippets from './completions.snippets';

export class RootCompletionItemsProvider implements CompletionItemsProvider {

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
        item.detail = 'Create Feature: element';
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

    visitFeatureKeyword(ctx: FeatureKeywordContext){
        if (this.containsPosition(ctx)){
            return new FeatureCompletionItems(ctx);
        }
        return undefined;
    }

    visitExpression(ctx: ExpressionContext){
        if (this.containsPosition(ctx) && this.expressionIsEmpty(ctx)){
            return new ExpressionCompletionItems(ctx);
        }
        return super.visitChildren(ctx);
    }

    visitExpressionText(ctx: ExpressionTextContext){
        if (this.containsPosition(ctx)){
            return new ExpressionCompletionItems(ctx.parent as ExpressionContext);
        }
        return undefined;
    }

    visitVariableRef(ctx: VariableRefContext){
        if (this.containsPosition(ctx)){
            if (this.isPositionAtBorderOfVariableRef(ctx)){
                return new CombinedCompletionItemsProvider(
                    new ExpressionCompletionItems(ctx.parent as ExpressionContext),
                    new VariableRefCompletionItems(ctx)
                );
            } else {
                return new VariableRefCompletionItems(ctx);
            }
        }
        return undefined;
    }

    aggregateResult(aggregate: CompletionItemsProvider | undefined, nextResult: CompletionItemsProvider | undefined): CompletionItemsProvider{
        if (aggregate && nextResult){
            aggregate = new CombinedCompletionItemsProvider(aggregate, nextResult);
        }
        if (nextResult){
            aggregate = nextResult;
        }
        return aggregate;
    }

    private expressionIsEmpty(ctx: ExpressionContext) {
        return ctx.text.length === 0;
    }

    private isPositionAtBorderOfVariableRef(ctx: VariableRefContext) {
        const character = this.position.character;
        const varRefStart = ctx.start.charPositionInLine;
        const varRefEnd = varRefStart + ctx.text.length;

        return character === varRefStart || character === varRefEnd;
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

class CombinedCompletionItemsProvider implements CompletionItemsProvider {
    constructor(private first: CompletionItemsProvider, private second: CompletionItemsProvider){}

    provideCompletionItems(document: vscode.TextDocument, position: vscode.Position): vscode.CompletionItem[] {
        return [
            ...this.first.provideCompletionItems(document, position),
            ...this.second.provideCompletionItems(document, position)
        ];
    }
}