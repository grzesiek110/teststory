import { Diagnostic, DiagnosticSeverity, Position, Range, Uri } from 'vscode';
import { getAvailableRulesService } from '../../../../../extension';
import { StoryExpression, StoryModel, StoryRule } from '../../../grammar/model';
import { DiagnosticsProviderRule } from '../diagnostics.model';
import { ExtendedRuleType } from '../../../../../shared/common.model';



export class ExpressionDiagnostics implements DiagnosticsProviderRule {
    
    createDiagnostics(_uri: Uri, diagnostics: Diagnostic[], model: StoryModel) {
        const rules = model.getElements<StoryRule>(0, undefined, true, 'RULE');
        
        let lastMainExpressionKind: ExtendedRuleType = 'GIVEN';
        for (let rule of rules){
            
            let expressionKind = rule.kind;
            if (expressionKind === 'AND'){
                expressionKind = lastMainExpressionKind;
            } else {
                lastMainExpressionKind = expressionKind;
            }

            if (!getAvailableRulesService().isValid(expressionKind, rule.expression.mask)) {
                this.markWrongExpression(diagnostics, rule.expression);
            }
        }
    }

    private markWrongExpression(diagnostics: Diagnostic[], expression: StoryExpression) {
        
        const line = expression.ctx.start.line -1;
        const startIndex = expression.ctx.start.charPositionInLine;
        const endIndex = expression.ctx.stop.charPositionInLine + expression.ctx.stop.text.length;
        
        const message = `Illegal expression '${expression.mask}'`;

        diagnostics.push({
            code: '',
            message: message,
            range: new Range(new Position(line, startIndex), new Position(line, endIndex)),
            severity: DiagnosticSeverity.Warning,
            source: '',
            relatedInformation: []
        });
    }
}