import { CompletionItem, Position, TextDocument } from "vscode";
import { TerminalNode } from "antlr4ts/tree";

import { StoryRule } from "../../../grammar/model/elements";
import { ExpressionCompletionItems } from "./expression-completion-items";
import { CompletionItemsProvider } from "../completions.model";


export class RuleCompletionItems implements CompletionItemsProvider {
    
    constructor(private element: StoryRule){}
    
    provideCompletionItems(document: TextDocument, position: Position): CompletionItem[] {        

        const keywordToken = this.element.getKeywordToken();
        if (keywordToken){
            if (this.atKeywordToken(position.character, keywordToken)){
                return [
                    new CompletionItem(keywordToken.text)
                ];
            }

            if (this.afterKeywordToken(position.character, keywordToken)){
                const adapter = new ExpressionCompletionItems(this.element.expression);
                return adapter.provideCompletionItems(document, position);
            }
        }
        return [];

        
    }

    private atKeywordToken(position: number, node: TerminalNode) {
        return position >= node.symbol.charPositionInLine && 
               position <= (node.symbol.charPositionInLine + node.text.length);
    }

    private afterKeywordToken(position: number, node: TerminalNode) {
        return position > (node.symbol.charPositionInLine + node.text.length);
    }
}