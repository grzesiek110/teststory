
import * as vscode from 'vscode';

export interface CompletionItemsProvider {
    provideCompletionItems(document: vscode.TextDocument, position: vscode.Position): vscode.CompletionItem[];
}
