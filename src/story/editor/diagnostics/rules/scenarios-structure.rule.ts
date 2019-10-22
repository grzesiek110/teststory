import {Diagnostic} from 'vscode';
import { StoryVisitor } from '../../../grammar/parser/StoryVisitor';
import { ModelContext, ScenarioContext } from '../../../grammar/parser/StoryParser';
import { AbstractParseTreeVisitor } from 'antlr4ts/tree';
import { StoryModel } from '../../../grammar/ast';


export class ScenariosStructureRule {

    getDiagnostics(model: StoryModel): Diagnostic[]{
        const diagnostics: Diagnostic[] = [];
        this.checkScenarios(model, diagnostics);

        return [];
    }

    private checkScenarios(model: StoryModel, diagnostics: Diagnostic[]) {
        
    }


}