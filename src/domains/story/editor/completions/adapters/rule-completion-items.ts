import { CompletionItem, Position, TextDocument } from "vscode";
import { TerminalNode } from "antlr4ts/tree";

import { StoryRule } from "../../../grammar/model/elements";
import { ExpressionCompletionItems } from "./expression-completion-items";
import { CompletionItemsProvider } from "../completions.model";
import { ParserRuleContext } from "antlr4ts";


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

    private atKeywordToken(position: number, node: ParserRuleContext) {
        return position >= node.start.charPositionInLine && 
               position <= (node.stop.charPositionInLine + node.stop.text.length);
    }

    private afterKeywordToken(position: number, node: ParserRuleContext) {
        return position > (node.stop.charPositionInLine + node.stop.text.length);
    }
}