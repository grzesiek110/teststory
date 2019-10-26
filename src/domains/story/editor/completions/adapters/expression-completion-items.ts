import * as vs from "vscode";

import { StoryExpression } from "../../../grammar/model/elements";
import { expressionsService, RuleExpression, RuleDefinition } from "../../../../../services";
import { CompletionItemsProvider } from "../completions.model";


export class ExpressionCompletionItems implements CompletionItemsProvider {

    constructor(private element: StoryExpression){}
    
    provideCompletionItems(_document: vs.TextDocument, _position: vs.Position): vs.CompletionItem[] {        
        const availableRules = expressionsService.getAvailableRules();
        const items = availableRules.map(rule => this.createCompletionItem(rule));

        return items;
    }

    private createCompletionItem(rule: RuleDefinition): vs.CompletionItem {

        const item = new vs.CompletionItem(rule.mask);
        item.detail = this.getDescription(rule);
        item.insertText = new vs.SnippetString(rule.snippet);
        item.kind = vs.CompletionItemKind.Text;
        item.range = this.findRangeToReplace();

        return item;
    }

    private getDescription(rule: RuleExpression) {
        return `**${rule.description}**
               This is expression for ${rule.kind} rule`;
    }

    private findRangeToReplace() {
        const line = this.element.ctx.start.line - 1;
        const startIndex = this.element.ctx.start.charPositionInLine;
        const endIndex = this.element.ctx.stop.charPositionInLine + this.element.ctx.stop.text.length;

        console.log(line +' '+startIndex+':'+endIndex);
        return new vs.Range(new vs.Position(line, startIndex), new vs.Position(line, endIndex));
    }

}