import { CompletionItem, Position, TextDocument } from "vscode";
import { StoryRule } from "../../../grammar/ast/parts";
import { CompletionItemsProvider } from "../completion-provider";
import { TerminalNode } from "antlr4ts/tree";
import { RulesService } from "../../../../rules/rules";
import { ExpressionCompletionProviderAdapter } from ".";


export class RuleCompletionProviderAdapter implements CompletionItemsProvider {
    
    constructor(private element: StoryRule, private rulesService: RulesService){}
    
    provideCompletionItems(document: TextDocument, position: Position): CompletionItem[] {        

        const keywordToken = this.element.getKeywordToken();
        if (keywordToken){
            if (this.atKeywordToken(position.character, keywordToken)){
                return [
                    new CompletionItem(keywordToken.text)
                ];
            }

            if (this.afterKeywordToken(position.character, keywordToken)){
                const adapter = new ExpressionCompletionProviderAdapter(this.element.expression, this.rulesService);
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