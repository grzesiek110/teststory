import { ParserRuleContext } from 'antlr4ts';
import { AbstractParseTreeVisitor } from 'antlr4ts/tree';
import { Diagnostic, DiagnosticSeverity, Position, Range, Uri } from 'vscode';
import { StoryModel } from '../../../grammar/model';
import { VariableNameContext, WrongVariableNameContext } from '../../../grammar/parser/StoryParser';
import { StoryVisitor } from '../../../grammar/parser/StoryVisitor';
import { DiagnosticsProviderRule } from '../diagnostics.model';
import { getAvailableVariablesService } from '../../../../../extension';




export class VariableReferenceDiagnostics implements DiagnosticsProviderRule {
    
    createDiagnostics(_uri: Uri, diagnostics: Diagnostic[], model: StoryModel) {
        model.getContext().accept(new VariableReferenceVisitior(diagnostics));
    }

}

class VariableReferenceVisitior extends AbstractParseTreeVisitor<void> implements StoryVisitor<void> {

    constructor(private diagnostics: Diagnostic[]){
        super();
    }

    protected defaultResult() {}

    visitVariableName(ctx: VariableNameContext){
        if (!getAvailableVariablesService().isValid(ctx.text)){
            this.markWrongExpression(this.diagnostics, ctx);
        }
    }

    visitWrongVariableName(ctx: WrongVariableNameContext){
        if (!getAvailableVariablesService().isValid(ctx.text)){
            this.markWrongExpression(this.diagnostics, ctx);
        }
    }

    private markWrongExpression(diagnostics: Diagnostic[], ctx: ParserRuleContext) {
        
        const line = ctx.start.line -1;
        const startIndex = ctx.start.charPositionInLine;
        const endIndex = ctx.stop.charPositionInLine + ctx.stop.text.length;
        
        const message = `Unknown variable: '${ctx.text}'`;

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