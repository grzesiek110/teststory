import { CompletionItem, CompletionItemKind, MarkdownString, Position, SnippetString, TextDocument } from "vscode";
import { getAvailableVariablesService } from "../../../../../extension";
import { VariableDefinition } from "../../../../variables/variables.service";
import { VariableRefContext } from "../../../grammar/parser/StoryParser";
import { CompletionItemsProvider } from "../completions.model";
import { findRangeToReplace } from "./utils";




export class VariableRefItemsProvider implements CompletionItemsProvider {
    
    constructor(private ctx: VariableRefContext){}
    
    provideCompletionItems(_document: TextDocument, _position: Position): CompletionItem[] {        
        return getAvailableVariablesService().getAvailableVariables().map(variable => this.mapAsCompletionItem(variable));
    }

    private mapAsCompletionItem(variable: VariableDefinition): CompletionItem {

        const item = new CompletionItem(variable.name);
        item.filterText = this.ctx.text;
        item.insertText = this.getTextToInsert(variable);
        item.documentation = this.getDescription(variable);
        item.kind = CompletionItemKind.Variable;
        item.range = findRangeToReplace(this.ctx);

        return item;        
    }

    private getTextToInsert(variable: VariableDefinition): string | SnippetString {
        return `<${variable.name}>`;
    }

    private getDescription(variable: VariableDefinition) {
        return new MarkdownString(
            `#### ${variable.name} #### \r\n___\r\n${variable.description}\r\n___\r\n type: ${variable.type}`);
    }
}