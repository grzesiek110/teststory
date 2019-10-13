import { CompletionItem, Position, TextDocument } from "vscode";
import { StoryFeature } from "../../../grammar/ast/parts";
import { StoryLexer } from "../../../grammar/parser/StoryLexer";
import { CompletionItemsProvider } from "../completion-provider";
import { TerminalNode } from "antlr4ts/tree";


export class FeatureCompletionProviderAdapter implements CompletionItemsProvider {
    
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