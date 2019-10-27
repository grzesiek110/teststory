import * as vs from "vscode";
import { ParserRuleContext } from "antlr4ts";

import { AndKeywordContext, ExamplesKeywordContext, FeatureKeywordContext, GivenKeywordContext, ScenarioKeywordContext, ScenarioOutlineKeywordContext, ThenKeywordContext, WhenKeywordContext } from "../../../grammar/parser/StoryParser";
import { CompletionItemsProvider } from "../completions.model";
import { AbstractArrayTreeVisitor } from "./abstract-array-tree-visitior";
import { findRangeToReplace } from "./utils";




export class WrongKeywordsItemsProvider implements CompletionItemsProvider {
    
    constructor(private ctx: ParserRuleContext){}
    
    provideCompletionItems(_document: vs.TextDocument, _position: vs.Position): vs.CompletionItem[] {
        return this.ctx.accept(new WrongKeywordsContextProvider());
    }

}

class WrongKeywordsContextProvider extends AbstractArrayTreeVisitor<vs.CompletionItem> {

    visitFeatureKeyword(ctx: FeatureKeywordContext){
        if (!ctx.FEATURE()){
            return [
                this.createCorrectKeyword(ctx, 'Feature:')
            ];
        }
    }

    visitScenarioKeyword(ctx: ScenarioKeywordContext){
        if (!ctx.SCENARIO()){
            return [
                this.createCorrectKeyword(ctx, 'Scenario:')
            ];
        }
    }    

    visitScenarioOutlineKeyword(ctx: ScenarioOutlineKeywordContext){
        if (!ctx.SCENARIO_OUTLINE()){
            return [
                this.createCorrectKeyword(ctx, 'Scenario Outline:')
            ];
        }
    }

    visitExamplesKeyword(ctx: ExamplesKeywordContext){
        if (!ctx.EXAMPLES()){
            return [
                this.createCorrectKeyword(ctx, 'Examples:')
            ];
        }
    }

    visitGivenKeyword(ctx: GivenKeywordContext){
        if (!ctx.GIVEN()){
            return [
                this.createCorrectKeyword(ctx, 'Given')
            ];
        }        
    }

    visitWhenKeyword(ctx: WhenKeywordContext){
        if (!ctx.WHEN()){
            return [
                this.createCorrectKeyword(ctx, 'When')
            ];
        }        
    }

    visitThenKeyword(ctx: ThenKeywordContext){
        if (!ctx.THEN()){
            return [
                this.createCorrectKeyword(ctx, 'Then')
            ];
        }          
    }

    visitAndKeyword(ctx: AndKeywordContext){
        if (!ctx.AND()){
            return [
                this.createCorrectKeyword(ctx, 'And')
            ];
        }           
    }

    private createCorrectKeyword(keywordContext: ParserRuleContext, correctKeyword: string) {
        const item = new vs.CompletionItem(correctKeyword);

        item.insertText = correctKeyword;
        item.filterText = keywordContext.text;
        item.kind = vs.CompletionItemKind.Keyword;
        item.range = findRangeToReplace(keywordContext);

        return item;        
    }

}