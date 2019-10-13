import { CompletionItem, Position, TextDocument } from "vscode";
import { Rule, RulesService } from "../../../../rules/rules";
import { StoryExpression } from "../../../grammar/ast/parts";
import { CompletionItemsProvider } from "../completion-provider";


export class ExpressionCompletionProviderAdapter implements CompletionItemsProvider {
    
    constructor(private element: StoryExpression, private rulesService: RulesService){}
    
    provideCompletionItems(_document: TextDocument, _position: Position): CompletionItem[] {        
        const availableRules = this.rulesService.getAvailableRules();
        const items = availableRules.map(rule => this.createCompletionItem(rule));

        return items;
    }

    private createCompletionItem(rule: Rule): CompletionItem {
        return new CompletionItem(rule.mask);
    }
}