import * as antlr from 'antlr4ts';
import * as vscode from 'vscode';
import { ParseTreeListener, ParseTreeWalker } from 'antlr4ts/tree';

import { StoryLexer } from '../parser/StoryLexer';
import { StoryListener } from '../parser/StoryListener';
import { AndContext, ExpressionContext, ExpressionTextContext, FeatureContext, GivenContext, ModelContext, ScenarioContext, SectionNameContext, StaticValueContext, StoryParser, ThenContext, VariableNameContext, WhenContext, UnknownLineContext, ScenarioOutlineContext } from '../parser/StoryParser';
import { StorySection, StoryModel } from './elements/story';
import { StoryExpression, StoryFeature, StoryRule, StoryScenario, StoryUnknown } from './elements';
import { StoryScenarioOutline } from './elements/story-scenario-outline';


export function parseStoryModel(uri: vscode.Uri, text: string): StoryModel {
    const parserModel = parseDocument(text);
    return buildStoryModel(uri, parserModel);
}

export function parseDocument(documentText: string) {

    const inputStream = new antlr.ANTLRInputStream(documentText);
    const lexer = new StoryLexer(inputStream);
    const tokenStream = new antlr.CommonTokenStream(lexer);
    const parser = new StoryParser(tokenStream);
    parser.buildParseTree = true;

    return parser.model();
}

function buildStoryModel(uri: vscode.Uri, ctx: ModelContext) {
    const model = new StoryModel(uri);
    const storyModelBuilder = new Builder(model);
    ParseTreeWalker.DEFAULT.walk(storyModelBuilder as ParseTreeListener, ctx);
    const storyModel = storyModelBuilder.model;
    storyModel.setContext(ctx);
    return storyModel;
}


class Builder implements StoryListener {
    activeSection: StorySection;
    activeScenario: StoryScenario;
    activeScenarioOuline: StoryScenarioOutline;
    activeRule: StoryRule;
    activeExpression: StoryExpression;

    constructor(public model: StoryModel){}

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
        const scenario = new StoryScenario(this.model, ctx);
        this.model.addScenario(scenario);

        this.activeScenario = scenario;
        this.activeScenarioOuline = undefined;

        this.activeSection = scenario;
    }

    enterScenarioOutline(ctx: ScenarioOutlineContext){
        const scenario = new StoryScenarioOutline(this.model, ctx);
        this.model.addScenarioOutline(scenario);

        this.activeScenario = undefined;
        this.activeScenarioOuline = scenario;

        this.activeSection = scenario;
    }


    enterGiven(ctx: GivenContext){
        const rule = new StoryRule('GIVEN', ctx);
        this.setActiveRule(rule);
    }

    enterWhen(ctx: WhenContext){
        const rule = new StoryRule('WHEN', ctx);
        this.setActiveRule(rule);
    }

    enterThen(ctx: ThenContext){
        const rule = new StoryRule('THEN', ctx);
        this.setActiveRule(rule);
    }

    enterAnd(ctx: AndContext){
        const rule = new StoryRule('AND', ctx);
        this.setActiveRule(rule);
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
        this.activeRule = undefined;
    }

    exitUnknownLine(ctx: UnknownLineContext){
        this.extendActiveScenarioToLine(ctx.start.line);
    }

    private setActiveRule(rule: StoryRule) {
        this.model.addRule(rule);
        this.addRuleToActiveScenario(rule);
        this.activeRule = rule;
    }
    
    private extendActiveScenarioToLine(line: number) {
        if (this.activeScenario) {
            this.activeScenario.setEndLine(line);
        }
        if (this.activeScenarioOuline) {
            this.activeScenarioOuline.setEndLine(line);
        }
    }

    private addRuleToActiveScenario(rule: StoryRule) {
        if (this.activeScenario) {
            this.activeScenario.addRule(rule);
        }
        if (this.activeScenarioOuline) {
            this.activeScenarioOuline.addRule(rule);
        }
    }
}

