import * as antlr from 'antlr4ts';
import { AbstractParseTreeVisitor } from "antlr4ts/tree";
import * as vscode from 'vscode';

import { MainRuleType } from '../../../../shared/common.model';
import { VariablesLexer } from '../parser/VariablesLexer';
import { ModelContext, VariableDefinitionContext, VariablesParser } from '../parser/VariablesParser';
import { VariablesVisitor } from '../parser/VariablesVisitor';
import { VariableDefinition } from './variable-definition';
import { VariablesFile } from './variables-file';




export function parseVariablesModel(uri: vscode.Uri, text: string): VariablesFile {
    const parserModel = parseDocument(text);
    return buildVariablesModel(uri, parserModel);
}

function parseDocument(documentText: string) {

    const inputStream = new antlr.ANTLRInputStream(documentText);
    const lexer = new VariablesLexer(inputStream);
    const tokenStream = new antlr.CommonTokenStream(lexer);
    const parser = new VariablesParser(tokenStream);
    parser.buildParseTree = true;

    return parser.model();
}

function buildVariablesModel(uri: vscode.Uri, ctx: ModelContext) {
    const variablesModel = new VariablesFile(uri, ctx);
    ctx.accept(new VariablesTreeVisitor(variablesModel));

    return variablesModel;
}

export class VariablesTreeVisitor extends AbstractParseTreeVisitor<void> implements VariablesVisitor<void> {
    activeScope: MainRuleType;

    constructor(private variablesFile: VariablesFile){
        super();
    }

    defaultResult() {
    }

    visitVariableDefinition(ctx: VariableDefinitionContext){
        let variableName =  '';
        let variableType =  '';

        const commentLines = ctx.commentLine();
        const variableLineCtx = ctx.variableLine();
        const variableNameCtx = variableLineCtx && variableLineCtx.variableName();
        if (variableNameCtx.validVariableName()){
            variableName = variableNameCtx.validVariableName().text;
        }
        if (variableNameCtx.wrongVariableName()){
            variableName = '[wrong name] '+variableNameCtx.wrongVariableName().text;
        }
        if (variableLineCtx.variableTypeRef()){
            variableType = variableLineCtx.variableTypeRef() && variableLineCtx.variableTypeRef().variableType().text;
        }

        const commentText = commentLines.map(line => line.commentText().text.trim()).join('\r\n') || '';

        const definition = new VariableDefinition(
            this.variablesFile.uri,
            variableLineCtx,
            variableName,
            variableType,
            commentText);

        this.variablesFile.addDefinition(definition);
    }
}