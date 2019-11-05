import { CompletionItem, CompletionItemKind, MarkdownString, Position, SnippetString, TextDocument } from "vscode";
import { getAvailableVariablesService } from "../../../../../extension";
import { VariableRefContext } from "../../../grammar/parser/StoryParser";
import { CompletionItemsProvider } from "../completions.model";
import { VariableDefinition } from "../../../../variables/grammar/model/variable-definition";
import { createRange } from "../../../../../shared/antlr-vsc.utils";



export class VariableRefItemsProvider implements CompletionItemsProvider {
    
    constructor(private ctx: VariableRefContext){}
    
    provideCompletionItems(_document: TextDocument, _position: Position): CompletionItem[] {        
        return getAvailableVariablesService().getAvailableVariables().map(variable => this.mapAsCompletionItem(variable));
    }

    private mapAsCompletionItem(variable: VariableDefinition): CompletionItem {

        const item = new CompletionItem(variable.variableName);
        item.filterText = this.ctx.text;
        item.insertText = this.getTextToInsert(variable);
        item.documentation = this.getDescription(variable);
        item.kind = CompletionItemKind.Variable;
        item.range = createRange(this.ctx);

        return item;        
    }

    private getTextToInsert(variable: VariableDefinition): string | SnippetString {
        return `<${variable.variableName}>`;
    }

    private getDescription(variable: VariableDefinition) {
        return new MarkdownString(variable.description);
    }
}