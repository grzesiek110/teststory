import * as vs from "vscode";
import { FeatureKeywordContext, StoryParser } from "../../../grammar/parser/StoryParser";
import { CompletionItemsProvider } from "../completions.model";
import { findRangeToReplace } from "./utils";




export class FeatureItemsProvider implements CompletionItemsProvider {
    
    constructor(private ctx: FeatureKeywordContext){}
    
    provideCompletionItems(_document: vs.TextDocument, _position: vs.Position): vs.CompletionItem[] {
        
        const wrongFeature = this.ctx.tryGetToken(StoryParser.WRONG_FEATURE, 0);
        if (wrongFeature){
            return [
                this.createFeatureKeyword()
            ];
        }

        return [];
    }

    private createFeatureKeyword(): vs.CompletionItem {

        const item = new vs.CompletionItem('Feature:');
        item.kind = vs.CompletionItemKind.Keyword;
        item.range = findRangeToReplace(this.ctx);
        item.preselect = true;
        
        return item;
    }

}