import * as vscode from 'vscode';
import * as antlr from 'antlr4ts';
import { StoryLexer } from '../grammar/parser/StoryLexer';
import { StoryParser, ModelContext } from '../grammar/parser/StoryParser';


export function createAst(document: vscode.TextDocument): ModelContext{
    const documentText = document.getText();

    let inputStream = new antlr.ANTLRInputStream(documentText);
    let lexer = new StoryLexer(inputStream);
    let tokenStream = new antlr.CommonTokenStream(lexer);
    let parser = new StoryParser(tokenStream);
    parser.buildParseTree = true;

    return parser.model();
}

