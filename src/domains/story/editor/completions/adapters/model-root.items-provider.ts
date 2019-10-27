import * as vscode from 'vscode';
import { ParserRuleContext } from 'antlr4ts';
import { AbstractParseTreeVisitor } from 'antlr4ts/tree';

import { StoryModel } from '../../../grammar/model';
import { ExpressionContext, ExpressionTextContext, FeatureKeywordContext, UnknownLineContext, VariableRefContext } from '../../../grammar/parser/StoryParser';
import { StoryVisitor } from '../../../grammar/parser/StoryVisitor';
import { CompletionItemsProvider } from '../completions.model';
import * as snippets from './completions.snippets';
import { EmptyLineItemsProvider } from './empty-line.items-provider';
import { ExpressionItemsProvider } from './expression.items-provider';
import { FeatureItemsProvider } from './feature.items-provider';
import { UnknownLineItemsProvider } from './unknown-line.items-provider';
import { VariableRefItemsProvider } from './variable-ref.items-provider';



export class ModelRootItemsProvider implements CompletionItemsProvider {

    constructor(private model: StoryModel){}

    provideCompletionItems(document: vscode.TextDocument, position: vscode.Position): vscode.CompletionItem[] {
        const lineIndex = position.line + 1;

        if (this.model.isEmpty()){
            return this.defaultFeatureKeyword(document, position);
        }

        if (this.positionIsBeforeFeature(lineIndex)){
            return [];
        }

        if (this.emptyOrNotExistingLine(lineIndex, document, position)){
            return this.getEmptylineCompletionItems(document, position);
        }

        const completionProviderFinder = new FindCompletionItemsProvider(position);
        const completionProvider = this.model.getContext().accept(completionProviderFinder);
        if (completionProvider){
            return completionProvider.provideCompletionItems(document, position);
        }
        
        return [];
    }


    private defaultFeatureKeyword(document: vscode.TextDocument, position: vscode.Position): vscode.CompletionItem[] {
        
        const item = new vscode.CompletionItem('Create new story');
        item.detail = 'Create new story';
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

    private emptyOrNotExistingLine(lineIndex: number, document: vscode.TextDocument, position: vscode.Position) {
        if (!this.model.getElement(lineIndex)){
            const lineContent = document.lineAt(position.line).text;
            return lineContent.trim().length === 0;
        }
    }

    private getEmptylineCompletionItems(document: vscode.TextDocument, position: vscode.Position): vscode.CompletionItem[] {
        const emptyLineContent = document.lineAt(position.line).text;
        const provider = new EmptyLineItemsProvider(emptyLineContent);
        return provider.provideCompletionItems(document, position);
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

    visitUnknownLine(ctx: UnknownLineContext){
        if (this.containsPosition(ctx)){
            return new UnknownLineItemsProvider(ctx);
        }
    }

    visitFeatureKeyword(ctx: FeatureKeywordContext){
        if (this.containsPosition(ctx)){
            return new FeatureItemsProvider(ctx);
        }
    }

    visitExpression(ctx: ExpressionContext){
        if (this.containsPosition(ctx) && this.expressionIsEmpty(ctx)){
            return new ExpressionItemsProvider(ctx);
        }
        return super.visitChildren(ctx);
    }

    visitExpressionText(ctx: ExpressionTextContext){
        if (this.containsPosition(ctx)){
            return new ExpressionItemsProvider(ctx.parent as ExpressionContext);
        }
    }

    visitVariableRef(ctx: VariableRefContext){
        if (this.containsPosition(ctx)){
            if (this.isPositionAtBorderOfVariableRef(ctx)){
                return new CombinedCompletionItemsProvider(
                    new ExpressionItemsProvider(ctx.parent as ExpressionContext),
                    new VariableRefItemsProvider(ctx)
                );
            } else {
                return new VariableRefItemsProvider(ctx);
            }
        }
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