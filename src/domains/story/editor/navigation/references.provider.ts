import * as vscode from 'vscode';
import { STORY_EXTENSION, MainRuleType } from "../../../../shared/common.model";
import { getStoryLanguageSupport, logToOutput } from '../../../../extension';
import { AbstractParseTreeVisitor } from 'antlr4ts/tree';
import { StoryVisitor } from '../../grammar/parser/StoryVisitor';
import { VariableNameContext, ExpressionTextContext, StaticValueContext, ExpressionContext } from '../../grammar/parser/StoryParser';
import { containsPosition } from '../../../../shared/antlr-vsc.utils';
import { getDeclarationOfVariable } from '../../../variables/editor/navigation/variable-declaration-finder';
import { getReferencesToVariable } from '../../../variables/editor/navigation/variable-references-finder';
import { getDeclarationOfRule } from '../../../rules/editor/navigation/rule-declaration-finder';
import { getReferencesToRule } from '../../../rules/editor/navigation/rule-references-finder';
import { StoryModel, StoryRule } from '../../grammar/model';


export function createReferencesProvider() {
	return vscode.languages.registerReferenceProvider(STORY_EXTENSION, new StoryReferenceProvider());
}

class StoryReferenceProvider implements vscode.ReferenceProvider{

    provideReferences(
        document: vscode.TextDocument, 
        position: vscode.Position, 
        context: vscode.ReferenceContext, 
        token: vscode.CancellationToken): vscode.ProviderResult<vscode.Location[]> {

        const references: vscode.Location[] = [];

        const model = getStoryLanguageSupport().getModel(document.uri);
        model.getContext().accept(new StoryReferencesFinderVisitior(
            model,
            position, 
            context.includeDeclaration, 
            references,
            token));

        return references;
    }

}


class StoryReferencesFinderVisitior extends AbstractParseTreeVisitor<void> implements StoryVisitor<void> {

    constructor(
        private storyModel: StoryModel,
        private position: vscode.Position,
        private includeDeclaration: boolean,
        private references: vscode.Location[],
        private token: vscode.CancellationToken){

        super();
    }

    protected defaultResult() {}

    visitVariableName(ctx: VariableNameContext){
        if (containsPosition(ctx, this.position)){
            this.addRerefencesToVariable(ctx);
        }
    }

    visitExpressionText(ctx: ExpressionTextContext){
        if (containsPosition(ctx, this.position)){
            this.addRerefencesToRule();
        }
    }

    visitStaticValue(ctx: StaticValueContext){
        if (containsPosition(ctx, this.position)){
            this.addRerefencesToRule();
        }
    }


    private addRerefencesToVariable(ctx: VariableNameContext) {
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

    private addRerefencesToRule() {
        const line = this.position.line + 1;
        const expressionRule = this.storyModel.getElement<StoryRule>(line);
        const scopeRule = <StoryRule>this.storyModel.getNearestScopeElementAbove(line);
        if (scopeRule){

            const ruleMask = expressionRule.expression.mask;
            const ruleKind = scopeRule.kind as MainRuleType;

            if (this.includeDeclaration) {
                const declaration = getDeclarationOfRule(ruleMask, ruleKind);
                if (declaration) {
                    this.references.push(declaration);
                }
            }
            const referencesToVariable = getReferencesToRule(ruleMask, ruleKind, this.token);
            this.references.push(...referencesToVariable);    
        }
    }    
}

