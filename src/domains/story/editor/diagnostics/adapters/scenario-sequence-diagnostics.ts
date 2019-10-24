import { TextDocument, Diagnostic, Range, Position, DiagnosticSeverity } from 'vscode';
import { StoryModel, StoryScenario, RuleType, StoryRule } from '../../../grammar/model';
import { DiagnosticsProviderRule } from '../diagnostics.model';

export class ScenarioSequenceDiagnostics implements DiagnosticsProviderRule{
    
    createDiagnostics(document: TextDocument, diagnostics: Diagnostic[], model: StoryModel) {
        model.getScenarios().forEach(scenario => this.checkSequenceOfRules(document, diagnostics, scenario));
    }

    private checkSequenceOfRules(document: TextDocument, diagnostics: Diagnostic[], scenario: StoryScenario): void {
        const rules = scenario.getRules();

        let lastRuleType: RuleType;
        for (let rule of rules){
            if (this.ruleTypeInNotAllowed(lastRuleType, rule.kind)){
                this.errorRulesSequence(diagnostics, rule, lastRuleType);
            }
            if (rule.kind !== 'AND'){
                lastRuleType = rule.kind;
            }
        }

    }
    private ruleTypeInNotAllowed(lastType: RuleType, type: RuleType) {
        switch(type){
            case 'GIVEN':
                return lastType !== undefined && lastType !== 'GIVEN';
            case 'WHEN':
                return lastType !== undefined && lastType !== 'GIVEN' && lastType !== 'WHEN';
            case 'THEN':
                return lastType !== 'GIVEN' && lastType !== 'WHEN' && lastType !== 'THEN';
            case 'AND':
                return lastType === undefined;
        }
    }

    private errorRulesSequence(diagnostics: Diagnostic[], rule: StoryRule, lastRuleType: RuleType) {
        
        const line = rule.ctx.start.line -1;
        const startIndex = rule.ctx.start.charPositionInLine;
        const endIndex = startIndex + rule.ctx.stop.text.length;
        
        const message = lastRuleType ? 
            `${rule.kind} is not allowed after ${lastRuleType}` :
            `${rule.kind} can't be first element inside scenario`;

        diagnostics.push({
            code: '',
            message: message,
            range: new Range(new Position(line, startIndex), new Position(line, endIndex)),
            severity: DiagnosticSeverity.Error,
            source: '',
            relatedInformation: []
        });
    }
}