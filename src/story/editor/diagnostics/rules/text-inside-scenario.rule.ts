import { Diagnostic, DiagnosticRelatedInformation, DiagnosticSeverity, Location, Position, Range, TextDocument } from 'vscode';
import { StoryModel, StoryScenario, StoryUnknown } from '../../../grammar/ast';
import { DiagnosticsProviderRule } from '../diagnostics.provider';


export class TextInsideScenariosRule implements DiagnosticsProviderRule{

    createDiagnostics(document: TextDocument, diagnostics: Diagnostic[], model: StoryModel) {
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

}