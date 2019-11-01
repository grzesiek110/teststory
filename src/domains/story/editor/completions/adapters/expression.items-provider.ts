import * as vs from "vscode";

import { ExpressionContext } from "../../../grammar/parser/StoryParser";
import { CompletionItemsProvider } from "../completions.model";
import { findRangeToReplace } from "./utils";
import { getAvailableRulesService, getStoryLanguageSupport } from "../../../../../extension";
import { RuleDefinition  } from "../../../../rules/grammar/model/rule-definition";
import { StoryRule } from "../../../grammar/model";
import { MainRuleType } from "../../../../../shared/common.model";




export class ExpressionItemsProvider implements CompletionItemsProvider {

    constructor(private ctx: ExpressionContext){}
    
    provideCompletionItems(document: vs.TextDocument, position: vs.Position): vs.CompletionItem[] {        
        
        const storyModel = getStoryLanguageSupport().getModel(document.uri);
        const nearestRuleAbove = <StoryRule>storyModel.getNearestScopeElementAbove(position.line + 1);
        if (nearestRuleAbove){
            const availableRules = getAvailableRulesService().getAvailableRules(nearestRuleAbove.kind as MainRuleType); // 'AND' is not scope line
            return availableRules.map(rule => this.createCompletionItem(rule));
        }
        return [];
    }

    private createCompletionItem(rule: RuleDefinition): vs.CompletionItem {

        const item = new vs.CompletionItem(rule.expression);
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

    private getDescription(rule: RuleDefinition) {
        return new vs.MarkdownString(
            `${rule.description}\r\n___\r\n rule: ${rule.kind}`);
    }

}