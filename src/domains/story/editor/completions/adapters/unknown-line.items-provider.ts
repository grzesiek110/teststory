import * as vs from "vscode";
import { UnknownLineContext } from "../../../grammar/parser/StoryParser";
import { CompletionItemsProvider } from "../completions.model";
import { findRangeToReplace } from "./utils";




export class UnknownLineItemsProvider implements CompletionItemsProvider {
    
    constructor(private ctx: UnknownLineContext){}
    
    provideCompletionItems(_document: vs.TextDocument, _position: vs.Position): vs.CompletionItem[] {
        return [
            this.createComment()
        ];
    }

    private createComment(): vs.CompletionItem {

        const item = new vs.CompletionItem('Comment this line');
        item.filterText = this.ctx.text;
        item.insertText = this.getText();
        item.kind = vs.CompletionItemKind.Keyword;
        item.range = findRangeToReplace(this.ctx);        
        item.preselect = true;
        
        return item;
    }


    private getText(): string | vs.SnippetString {
        const contentLength = this.ctx.text.length;
        const content = this.ctx.text.trim();
        const commented = `# ${content}`;

        return commented.padStart(contentLength, ' ');
    }
}