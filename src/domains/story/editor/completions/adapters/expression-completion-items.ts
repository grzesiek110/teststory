import { CompletionItem, Position, TextDocument } from "vscode";

import { StoryExpression } from "../../../grammar/model/elements";
import { expressionsService, RuleExpression } from "../../../../../services";
import { CompletionItemsProvider } from "../completions.model";


export class ExpressionCompletionItems implements CompletionItemsProvider {
    
    constructor(private _element: StoryExpression){}
    
    provideCompletionItems(_document: TextDocument, _position: Position): CompletionItem[] {        
        const availableRules = expressionsService.getAvailableRules();
        const items = availableRules.map(rule => this.createCompletionItem(rule));

        return items;
    }

    private createCompletionItem(rule: RuleExpression): CompletionItem {
        return new CompletionItem(rule.mask);
    }
}