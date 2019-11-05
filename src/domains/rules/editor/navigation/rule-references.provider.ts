import * as vscode from 'vscode';
import { getRulesLanguageSupport } from '../../../../extension';
import { containsPosition, createLocation } from '../../../../shared/antlr-vsc.utils';
import { RULES_EXTENSION } from '../../../../shared/common.model';
import { RuleDefinition } from '../../grammar/model/rule-definition';
import { RulesFile } from '../../grammar/model/rules-file';
import { getReferencesToRule } from './rule-references-finder';



export function createRulesReferencesProvider() {
	return vscode.languages.registerReferenceProvider(RULES_EXTENSION, new RulesReferenceProvider());
}

class RulesReferenceProvider implements vscode.ReferenceProvider{


    provideReferences(document: vscode.TextDocument, position: vscode.Position, context: vscode.ReferenceContext, token: vscode.CancellationToken): vscode.ProviderResult<vscode.Location[]> {
        const references: vscode.Location[] = [];

        const model = getRulesLanguageSupport().getModel(document.uri);
        const ruleDeclaration = this.getRuleDeclarationAtPosition(model, position);
        if (ruleDeclaration){

            if (context.includeDeclaration){
                references.push(createLocation(model.uri, ruleDeclaration.ctx));
            }    

            references.push(...getReferencesToRule(ruleDeclaration.expression, ruleDeclaration.kind, token));
        }

        return references;
    }

    private getRuleDeclarationAtPosition(ruleModel: RulesFile, position: vscode.Position): RuleDefinition | undefined {
        let ruleDefinition: RuleDefinition = undefined;

        ruleModel.getDefinitions().forEach(definition => {
            if (containsPosition(definition.ctx, position)) {
                ruleDefinition = definition;
            }
        });

        return ruleDefinition;
    }
    
}
