import { Diagnostic, DiagnosticSeverity, Position, Range, TextDocument, Uri } from 'vscode';

import { StoryExpression, StoryModel, StoryRule, RuleType } from '../../../grammar/model';
import { expressionsService } from '../../../../../services';
import { DiagnosticsProviderRule } from '../diagnostics.model';

export class ExpressionDiagnostics implements DiagnosticsProviderRule {
    
    createDiagnostics(_uri: Uri, diagnostics: Diagnostic[], model: StoryModel) {
        const rules = model.getElements<StoryRule>(0, undefined, true, 'RULE');
        
        let lastMainExpressionKind: RuleType = 'GIVEN';
        for (let rule of rules){
            
            let expressionKind = rule.kind;
            if (expressionKind === 'AND'){
                expressionKind = lastMainExpressionKind;
            } else {
                lastMainExpressionKind = expressionKind;
            }

            this.checkExpression(diagnostics, expressionKind, rule.expression);
        }
    }

    private checkExpression(diagnostics: Diagnostic[], ruleKind: RuleType, expression: StoryExpression): void {
        if (!expressionsService.isValid(ruleKind, expression.mask)) {
            this.markWrongExpression(diagnostics, expression);
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