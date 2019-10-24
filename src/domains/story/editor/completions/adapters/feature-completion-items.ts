import { CompletionItem, Position, TextDocument } from "vscode";
import { TerminalNode } from "antlr4ts/tree";

import { StoryFeature } from "../../../grammar/model/elements";
import { StoryLexer } from "../../../grammar/parser/StoryLexer";
import { CompletionItemsProvider } from "../completions.model";



export class FeatureCompletionItems implements CompletionItemsProvider {
    
    constructor(private element: StoryFeature){}
    
    provideCompletionItems(_document: TextDocument, position: Position): CompletionItem[] {
        
        const featureNode = this.element.ctx.getToken(StoryLexer.FEATURE, 0);
        if (featureNode){
            if (this.atFeatureKeyword(position.character, featureNode)){
                return [
                    new CompletionItem('Feature: ')
                ];
            }
        }
        return [];
    }

    private atFeatureKeyword(position: number, node: TerminalNode) {
        return position >= node.symbol.charPositionInLine && 
               position <= (node.symbol.charPositionInLine + node.text.length);
    }
}