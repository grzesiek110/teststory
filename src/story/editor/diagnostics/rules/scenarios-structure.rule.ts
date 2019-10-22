import { Diagnostic, Range, Position, DiagnosticSeverity, DiagnosticRelatedInformation, Location, TextDocument } from 'vscode';
import { StoryModel, StoryUnknown, StoryScenario, StructureElementType, RuleType } from '../../../grammar/ast';


export class ScenariosStructureRule {

    getDiagnostics(document: TextDocument, model: StoryModel): Diagnostic[]{
        const diagnostics: Diagnostic[] = [];
        this.checkScenarios(document, model, diagnostics);

        return diagnostics;
    }

    private checkScenarios(document: TextDocument, model: StoryModel, diagnostics: Diagnostic[]) {
        this.markUnknowLinesAsErrorInsideScenarios(model, document, diagnostics);
        this.checkRulesSequence(document, diagnostics, model);
    }

    private markUnknowLinesAsErrorInsideScenarios(model: StoryModel, document: TextDocument, diagnostics: Diagnostic[]) {
        const scenarios = model.getScenarios();
        if (scenarios.length) {
            const firstScenario = scenarios[0];
            const unknownLines = model.getElements<StoryUnknown>(firstScenario.getLine(), undefined, false, 'UNKNOWN');
            unknownLines.forEach(unknown => this.errorUnknownNotAllowedInScenario(document, diagnostics, model, unknown));
        }
    }

    private errorUnknownNotAllowedInScenario(document: TextDocument, diagnostics: Diagnostic[], model: StoryModel, unknown: StoryUnknown) {
        
        const line = unknown.ctx.start.line -1;
        const startIndex = unknown.ctx.start.charPositionInLine;
        const endIndex = unknown.ctx.stop.charPositionInLine + unknown.ctx.stop.text.length;
        
        const nearestScenario = model.getNearestElementAbove<StoryScenario>(line, true, 'SCENARIO');
        const scenarioLine = nearestScenario.getLine() - 1;
        const scenarioStartIndex = nearestScenario.ctx.start.charPositionInLine;
        const scenarioEndIndex = nearestScenario.ctx.stop.charPositionInLine + nearestScenario.ctx.stop.text.length;

        diagnostics.push({
            code: '',
            message: 'Unknown lines are not allowed inside scenario rules',
            range: new Range(new Position(line, startIndex), new Position(line, endIndex)),
            severity: DiagnosticSeverity.Error,
            source: '',
            relatedInformation: [
                new DiagnosticRelatedInformation(
                    new Location(document.uri, new Range(
                        new Position(scenarioLine, scenarioStartIndex), new Position(scenarioLine, scenarioEndIndex))), 'Scenario rule')
            ]
        });
    }

    private checkRulesSequence(document: TextDocument, diagnostics: Diagnostic[], model: StoryModel) {
        model.getScenarios().forEach(scenario => this.checkSequenceOfRules(document, diagnostics, scenario));
    }
    
    private checkSequenceOfRules(document: TextDocument, diagnostics: Diagnostic[], scenario: StoryScenario): void {
        // const rules = scenario.getRules();

        // for (let rule of rules){
        //     if (this.ruleTypeInNotAllowed()){

        //     }
        // }

    }
    private ruleTypeInNotAllowed(ruleType: RuleType) {
        // switch(lastRuleType){
        //     case ''
        // }
    }



}