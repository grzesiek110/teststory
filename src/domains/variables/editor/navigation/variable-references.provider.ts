import { AbstractParseTreeVisitor } from 'antlr4ts/tree';
import * as vscode from 'vscode';

import { getVariablesLanguageSupport } from '../../../../extension';
import { containsPosition } from '../../../../shared/antlr-vsc.utils';
import { VARIABLES_EXTENSION } from '../../../../shared/common.model';
import { ValidVariableNameContext } from '../../grammar/parser/VariablesParser';
import { VariablesVisitor } from '../../grammar/parser/VariablesVisitor';
import { getDeclarationOfVariable } from './variable-declaration-finder';
import { getReferencesToVariable } from './variable-references-finder';




export function createVariableReferencesProvider() {
	return vscode.languages.registerReferenceProvider(VARIABLES_EXTENSION, new RulesReferenceProvider());
}

class RulesReferenceProvider implements vscode.ReferenceProvider{


    provideReferences(document: vscode.TextDocument, position: vscode.Position, context: vscode.ReferenceContext, token: vscode.CancellationToken): vscode.ProviderResult<vscode.Location[]> {
        const references: vscode.Location[] = [];

        const model = getVariablesLanguageSupport().getModel(document.uri);
        model.ctx.accept(new VariablesElementContextVisitior(position, context.includeDeclaration, references, token));

        return references;
    }
}

class VariablesElementContextVisitior extends AbstractParseTreeVisitor<void> implements VariablesVisitor<void> {

    constructor(
        private position: vscode.Position,
        private includeDeclaration: boolean,
        private references: vscode.Location[],
        private token: vscode.CancellationToken){

        super();
    }

    protected defaultResult() {}

    visitValidVariableName(ctx: ValidVariableNameContext){
        if (containsPosition(ctx, this.position)){
            this.addRerefencesToVariable(ctx);
        }

    }

    private addRerefencesToVariable(ctx: ValidVariableNameContext) {
        const variableName = ctx.text;
        if (this.includeDeclaration) {
            const declaration = getDeclarationOfVariable(variableName);
            if (declaration) {
                this.references.push(declaration);
            }
        }
        const referencesToVariable = getReferencesToVariable(variableName, this.token);
        this.references.push(...referencesToVariable);
    }
}