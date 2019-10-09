import * as vscode from 'vscode';


export abstract class AstElement {
    constructor(
        public line: number
    ){}

    abstract provideCompletionItems(position: number): vscode.CompletionItem[];

    abstract getErrors(): any | undefined;
}