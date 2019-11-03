import * as vscode from 'vscode';
import * as antlr from 'antlr4ts';
import { AbstractParseTreeVisitor } from "antlr4ts/tree";

import { RulesLexer } from '../parser/RulesLexer';
import { RuleDefinitionContext, RulesParser, SectionLineContext, ModelContext } from '../parser/RulesParser';
import { RulesVisitor } from '../parser/RulesVisitor';
import { RuleDefinition } from './rule-definition';
import { RulesFile } from './rules-file';
import { MainRuleType } from '../../../../shared/common.model';



export function parseRulesModel(uri: vscode.Uri, text: string): RulesFile {
    const parserModel = parseDocument(text);
    return buildStoryModel(uri, parserModel);
}

function parseDocument(documentText: string) {

    const inputStream = new antlr.ANTLRInputStream(documentText);
    const lexer = new RulesLexer(inputStream);
    const tokenStream = new antlr.CommonTokenStream(lexer);
    const parser = new RulesParser(tokenStream);
    parser.buildParseTree = true;

    return parser.model();
}

function buildStoryModel(uri: vscode.Uri, ctx: ModelContext) {
    const rulesModel = new RulesFile(uri, ctx);
    ctx.accept(new RulesAbstractArrayTreeVisitor(rulesModel));

    return rulesModel;
}

export class RulesAbstractArrayTreeVisitor extends AbstractParseTreeVisitor<void> implements RulesVisitor<void> {
    activeScope: MainRuleType;

    constructor(private rulesFile: RulesFile){
        super();
    }

    defaultResult() {
    }

    visitSectionLine(ctx: SectionLineContext){
        if (ctx.GIVEN()){
            this.activeScope = 'GIVEN';
        }
        if (ctx.WHEN()){
            this.activeScope = 'WHEN';
        }
        if (ctx.THEN()){
            this.activeScope = 'THEN';
        }
    }

    visitRuleDefinition(ctx: RuleDefinitionContext){
        const commentLines = ctx.commentLine();
        const expression = ctx.ruleLine();

        const commentText = commentLines.map(line => line.commentText().text.trim()).join('\r\n') || '';
        const expressionText = expression.expression().text.trim();

        const definition = new RuleDefinition(
            this.rulesFile.uri,
            expression.expression(),
            this.activeScope,
            expressionText,
            commentText);

        this.rulesFile.addDefinition(definition);
    }
}