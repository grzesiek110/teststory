import * as vscode from 'vscode';
import * as antlr from 'antlr4ts';
import { storyLexer } from '../grammar/storyLexer';
import { storyParser, ModelContext } from '../grammar/storyParser';


export function createAst(document: vscode.TextDocument): ModelContext{
    const documentText = document.getText();

    let inputStream = new antlr.ANTLRInputStream(documentText);
    let lexer = new storyLexer(inputStream);
    let tokenStream = new antlr.CommonTokenStream(lexer);
    let parser = new storyParser(tokenStream);

    parser.buildParseTree = true;
    return parser.model();
}

