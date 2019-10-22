import * as antlr from 'antlr4ts';
import * as vscode from 'vscode';
import { ParseTreeListener, ParseTreeWalker } from 'antlr4ts/tree';

import { StoryLexer } from '../parser/StoryLexer';
import { StoryListener } from '../parser/StoryListener';
import { AndContext, ExpressionContext, ExpressionTextContext, FeatureContext, GivenContext, ModelContext, ScenarioContext, SectionNameContext, StaticValueContext, StoryParser, ThenContext, VariableNameContext, WhenContext, UnknownLineContext } from '../parser/StoryParser';
import { StorySection, StoryModel } from './model';
import { StoryExpression, StoryFeature, StoryRule, StoryScenario, StoryUnknown } from './parts';


export function parseStoryModel(document: vscode.TextDocument): StoryModel {
    const documentText = document.getText();
    const psrserModel = parseDocument(documentText);

    return buildStoryModel(psrserModel);
}

export function parseDocument(documentText: string) {

    const inputStream = new antlr.ANTLRInputStream(documentText);
    const lexer = new StoryLexer(inputStream);
    const tokenStream = new antlr.CommonTokenStream(lexer);
    const parser = new StoryParser(tokenStream);
    parser.buildParseTree = true;

    return parser.model();
}

function buildStoryModel(psrserModel: ModelContext) {
    const storyModelBuilder = new Builder();
    ParseTreeWalker.DEFAULT.walk(storyModelBuilder as ParseTreeListener, psrserModel);
    const storyModel = storyModelBuilder.model;
    return storyModel;
}


class Builder implements StoryListener {
    model: StoryModel;
    activeSection: StorySection;
    activeScenario: StoryScenario;
    activeRule: StoryRule;
    activeExpression: StoryExpression;

    enterModel(_ctx: ModelContext){
        this.model = new StoryModel();
    }

    enterUnknownLine(ctx: UnknownLineContext){
        const unknown = new StoryUnknown(ctx);
        this.model.addUnknown(unknown);
    }

    enterFeature(ctx: FeatureContext){
        const feature = new StoryFeature(ctx);
        this.model.setFeature(feature);
        this.activeSection = feature;
    }

    exitSectionName(ctx: SectionNameContext){
        if (!this.activeSection){
            throw new Error('No active section for sectionName');
        }
        this.activeSection.setSectionName(ctx.text);
        this.activeSection = undefined;
    }

    enterScenario(ctx: ScenarioContext){
        const scenario = new StoryScenario(ctx);
        this.model.addScenario(scenario);

        this.activeScenario = scenario;
        this.activeSection = scenario;
    }

    enterGiven(ctx: GivenContext){
        const given = new StoryRule('GIVEN', ctx);
        this.activeRule = given;
    }

    enterWhen(ctx: WhenContext){
        this.activeRule = new StoryRule('WHEN', ctx);
    }

    enterThen(ctx: ThenContext){
        this.activeRule = new StoryRule('THEN', ctx);
    }

    enterAnd(ctx: AndContext){
        this.activeRule = new StoryRule('AND', ctx);
    }

    enterExpression(ctx: ExpressionContext){
        this.activeExpression = new StoryExpression(ctx);
    }

    enterExpressionText(ctx: ExpressionTextContext){
        this.activeExpression.addNamePart(ctx.text);
    }

    enterVariableName(ctx: VariableNameContext){
        this.activeExpression.addVariableRef(ctx.text);
    }

    enterStaticValue(ctx: StaticValueContext){
        this.activeExpression.addConstant(ctx.text);
    }

    exitExpression(ctx: ExpressionContext){
        this.extendActiveScenarioToLine(ctx.start.line);

        this.activeRule.setExpression(this.activeExpression);
        this.activeExpression = undefined;

        this.model.addRule(this.activeRule);
        this.activeRule = undefined;
    }

    exitUnknownLine(ctx: UnknownLineContext){
        this.extendActiveScenarioToLine(ctx.start.line);
    }

    private extendActiveScenarioToLine(line: number) {
        if (this.activeScenario) {
            this.activeScenario.setEndLine(line);
        }
    }
}

