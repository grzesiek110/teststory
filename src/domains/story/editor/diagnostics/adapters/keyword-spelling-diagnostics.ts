import { ParserRuleContext } from 'antlr4ts';
import { AbstractParseTreeVisitor } from 'antlr4ts/tree';
import * as vs from 'vscode';
import { StoryModel } from '../../../grammar/model';
import { FeatureKeywordContext, StoryParser, ScenarioKeywordContext, ScenarioOutlineContext, ScenarioOutlineKeywordContext, GivenKeywordContext, WhenKeywordContext, ThenKeywordContext, AndKeywordContext, ExamplesKeywordContext } from '../../../grammar/parser/StoryParser';
import { StoryVisitor } from '../../../grammar/parser/StoryVisitor';
import { DiagnosticsProviderRule } from "../diagnostics.model";


export class KeywordSpellingDiagnostics implements DiagnosticsProviderRule{

    createDiagnostics(_uri: vs.Uri, diagnostics: vs.Diagnostic[], model: StoryModel): void {
        model.getContext().accept(new KeywordSpellingVisitior(diagnostics));
    }
}

class KeywordSpellingVisitior extends AbstractParseTreeVisitor<void> implements StoryVisitor<void> {

    constructor(private diagnostics: vs.Diagnostic[]){
        super();
    }

    protected defaultResult() {}

    visitFeatureKeyword(ctx: FeatureKeywordContext){
        const keyword = ctx.tryGetToken(StoryParser.FEATURE, 0);
        if (!keyword){
            this.markWrongKeyword(ctx, `Wrong spelling of 'Feature:' keyword`);
        }        
    }

    visitScenarioKeyword(ctx: ScenarioKeywordContext){
        const keyword = ctx.tryGetToken(StoryParser.SCENARIO, 0);
        if (!keyword){
            this.markWrongKeyword(ctx, `Wrong spelling of 'Scenario:' keyword`);
        }        
    }

    visitScenarioOutlineKeyword(ctx: ScenarioOutlineKeywordContext){
        const keyword = ctx.tryGetToken(StoryParser.SCENARIO_OUTLINE, 0);
        if (!keyword){
            this.markWrongKeyword(ctx, `Wrong spelling of 'Scenario Outline:' keyword`);
        }        
    }

    visitExamplesKeyword(ctx: ExamplesKeywordContext){
        const keyword = ctx.tryGetToken(StoryParser.EXAMPLES, 0);
        if (!keyword){
            this.markWrongKeyword(ctx, `Wrong spelling of 'Examples:' keyword`);
        }        
    }

    visitGivenKeyword(ctx: GivenKeywordContext){
        const keyword = ctx.tryGetToken(StoryParser.GIVEN, 0);
        if (!keyword){
            this.markWrongKeyword(ctx, `Wrong spelling of 'Given' keyword`);
        }        
    }

    visitWhenKeyword(ctx: WhenKeywordContext){
        const keyword = ctx.tryGetToken(StoryParser.WHEN, 0);
        if (!keyword){
            this.markWrongKeyword(ctx, `Wrong spelling of 'When' keyword`);
        }        
    }    

    visitThenKeyword(ctx: ThenKeywordContext){
        const keyword = ctx.tryGetToken(StoryParser.THEN, 0);
        if (!keyword){
            this.markWrongKeyword(ctx, `Wrong spelling of 'Then' keyword`);
        }        
    }

    visitAndKeyword(ctx: AndKeywordContext){
        const keyword = ctx.tryGetToken(StoryParser.AND, 0);
        if (!keyword){
            this.markWrongKeyword(ctx, `Wrong spelling of 'And' keyword`);
        }        
    }


    private markWrongKeyword(ruleContext: ParserRuleContext, message: string) {
        
        const line = ruleContext.start.line - 1;
        const startIndex = ruleContext.start.charPositionInLine;
        const endIndex = ruleContext.stop.charPositionInLine + ruleContext.stop.text.length;
        
        this.diagnostics.push({
            code: '',
            message: message,
            range: new vs.Range(new vs.Position(line, startIndex), new vs.Position(line, endIndex)),
            severity: vs.DiagnosticSeverity.Warning,
            source: '',
            relatedInformation: []
        });
    }

}