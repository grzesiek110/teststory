import * as vs from "vscode";
import { expressionsService, RuleDefinition, RuleExpression } from "../../../../../services";
import { ExpressionContext } from "../../../grammar/parser/StoryParser";
import { CompletionItemsProvider } from "../completions.model";
import { findRangeToReplace } from "./utils";



export class ExpressionItemsProvider implements CompletionItemsProvider {

    constructor(private ctx: ExpressionContext){}
    
    provideCompletionItems(_document: vs.TextDocument, _position: vs.Position): vs.CompletionItem[] {        
        const availableRules = expressionsService.getAvailableRules();
        const items = availableRules.map(rule => this.createCompletionItem(rule));

        return items;
    }

    private createCompletionItem(rule: RuleDefinition): vs.CompletionItem {

        const item = new vs.CompletionItem(rule.mask);
        item.filterText = this.ctx.text;
        item.documentation = this.getDescription(rule);
        item.insertText = new vs.SnippetString(rule.snippet);
        item.kind = vs.CompletionItemKind.Text;
        item.range = findRangeToReplace(this.ctx);
        if (rule.autoExpandVariable){
            item.command = {
                title: 'Show available variables',
                command: 'editor.action.triggerSuggest'
            };
        }

        return item;
    }

    private getDescription(rule: RuleExpression) {
        return new vs.MarkdownString(
            `#### ${rule.name} #### \r\n___\r\n${rule.description}\r\n___\r\n rule: ${rule.kind}`);
    }

}