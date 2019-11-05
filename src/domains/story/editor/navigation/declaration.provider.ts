import { AbstractParseTreeVisitor } from 'antlr4ts/tree';
import * as vscode from 'vscode';
import { getStoryLanguageSupport } from '../../../../extension';
import { containsPosition } from '../../../../shared/antlr-vsc.utils';
import { MainRuleType, STORY_EXTENSION } from "../../../../shared/common.model";
import { getDeclarationOfRule } from '../../../rules/editor/navigation/rule-declaration-finder';
import { getDeclarationOfVariable } from '../../../variables/editor/navigation/variable-declaration-finder';
import { StoryModel, StoryRule } from '../../grammar/model';
import { ExpressionTextContext, StaticValueContext, VariableNameContext } from '../../grammar/parser/StoryParser';
import { StoryVisitor } from '../../grammar/parser/StoryVisitor';


export function createDeclarationProvider() {
	return vscode.languages.registerDeclarationProvider(STORY_EXTENSION, new StoryReferenceProvider());
}

class StoryReferenceProvider implements vscode.DeclarationProvider{

    provideDeclaration(document: vscode.TextDocument, position: vscode.Position): vscode.ProviderResult<vscode.Declaration> {
        
        const model = getStoryLanguageSupport().getModel(document.uri);
        const declarationFinder = new StoryDeclarationFinderVisitior(model, position);
        model.getContext().accept(declarationFinder);
        return declarationFinder.declaration;
    }

}

class StoryDeclarationFinderVisitior extends AbstractParseTreeVisitor<void> implements StoryVisitor<void> {
    declaration: vscode.Declaration;

    constructor(
        private storyModel: StoryModel,
        private position: vscode.Position){

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
        this.declaration = getDeclarationOfVariable(variableName);
    }

    private addRerefencesToRule() {
        const line = this.position.line + 1;
        const expressionRule = this.storyModel.getElement<StoryRule>(line);
        const scopeRule = <StoryRule>this.storyModel.getNearestScopeElementAbove(line);
        if (scopeRule){

            const ruleMask = expressionRule.expression.mask;
            const ruleKind = scopeRule.kind as MainRuleType;

            this.declaration = getDeclarationOfRule(ruleMask, ruleKind);
        }
    }    
}

