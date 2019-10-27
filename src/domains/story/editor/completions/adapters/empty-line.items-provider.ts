import * as vs from "vscode";
import { ParserRuleContext } from "antlr4ts";
import { AbstractParseTreeVisitor } from "antlr4ts/tree";

import { getStoryLanguageSupport } from "../../../../../extension";
import { AndKeywordContext, FeatureKeywordContext, GivenKeywordContext, ScenarioKeywordContext, ScenarioOutlineKeywordContext, ThenKeywordContext, WhenKeywordContext } from "../../../grammar/parser/StoryParser";
import { StoryVisitor } from "../../../grammar/parser/StoryVisitor";
import { CompletionItemsProvider } from "../completions.model";




export class EmptyLineItemsProvider implements CompletionItemsProvider {
    
    constructor(private emptyLineContent: string){}
    
    provideCompletionItems(document: vs.TextDocument, position: vs.Position): vs.CompletionItem[] {
        const model = this.getDocumentModel(document);
        const usedLine = model.getNearestElementAbove(position.line + 1, true);
        return usedLine.getContext().accept(new EmptyLineContextProvider(this.emptyLineContent, position));
    }

    private getDocumentModel(document: vs.TextDocument) {
        const languageSupport = getStoryLanguageSupport();
        const model = languageSupport.getModel(document.uri);
        return model;
    }

}

class EmptyLineContextProvider extends AbstractParseTreeVisitor<vs.CompletionItem[]> 
                               implements StoryVisitor<vs.CompletionItem[]> {

    constructor(private emptyLine: string, private position: vs.Position){
        super();
    }

    protected defaultResult() {
        return [];
    }

    visitFeatureKeyword(ctx: FeatureKeywordContext){
        return [
            this.createRuleItem(this.emptyLine, ctx, this.position, 'Scenario:'),
            this.createRuleItem(this.emptyLine, ctx, this.position, 'Scenario Outline:')
        ];
    }

    visitScenarioKeyword(ctx: ScenarioKeywordContext){
        return [
            this.createRuleItem(this.emptyLine, ctx, this.position, 'Given'),
            this.createRuleItem(this.emptyLine, ctx, this.position, 'When')
        ];
    }

    visitScenarioOutlineKeyword(ctx: ScenarioOutlineKeywordContext){
        return [
            this.createRuleItem(this.emptyLine, ctx, this.position, 'Given'),
            this.createRuleItem(this.emptyLine, ctx, this.position, 'When'),
            this.createRuleItem(this.emptyLine, ctx, this.position, 'And'),
            this.createRuleItem(this.emptyLine, ctx, this.position, 'Examples:')
        ];
    }

    visitGivenKeyword(ctx: GivenKeywordContext){
        return [
            this.createRuleItem(this.emptyLine, ctx, this.position, 'And'),
            this.createRuleItem(this.emptyLine, ctx, this.position, 'When'),
            this.createRuleItem(this.emptyLine, ctx, this.position, 'Then')
        ];
    }

    visitWhenKeyword(ctx: WhenKeywordContext) {
        return [
            this.createRuleItem(this.emptyLine, ctx, this.position, 'And'),
            this.createRuleItem(this.emptyLine, ctx, this.position, 'Then')
        ];
    }

    visitThenKeyword(ctx: ThenKeywordContext){
        return [
            this.createRuleItem(this.emptyLine, ctx, this.position, 'And')
        ];
    }

    visitAndKeyword(ctx: AndKeywordContext){
        return [
            this.createRuleItem(this.emptyLine, ctx, this.position, 'And')
        ];
    }

    aggregateResult(aggregate: vs.CompletionItem[], nextResult: vs.CompletionItem[]): vs.CompletionItem[] {
        if (aggregate.length && nextResult.length){
            aggregate = [
                ...aggregate,
                ...nextResult
            ];
        }
        if (nextResult.length){
            aggregate = nextResult;
        }
        return aggregate;
    }

    private createRuleItem(emptyLine: string, keywordContext: ParserRuleContext, position: vs.Position, keywordName: string) {
        const item = new vs.CompletionItem(keywordName);

        item.insertText = new vs.SnippetString(this.snippetText(keywordName, keywordContext));
        item.filterText = emptyLine;
        item.kind = vs.CompletionItemKind.Text;
        item.range = new vs.Range(new vs.Position(position.line, 0), new vs.Position(position.line, emptyLine.length));
        item.keepWhitespace = true;
        item.command = {
            title: 'Show available expressions',
            command: 'editor.action.triggerSuggest'
        };

        return item;        
    }

    private snippetText(ruleKeyword: string, keywordContext: ParserRuleContext): string {
        const lineEndMarker = keywordContext.stop.charPositionInLine + keywordContext.stop.text.length;
        const prefixedKeyword = ruleKeyword.padStart(lineEndMarker, ' ');
        return `${prefixedKeyword} $0`;
    }
}

