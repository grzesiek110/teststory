import * as antlr from 'antlr4ts';
import * as vscode from 'vscode';
import { ParseTreeListener, ParseTreeWalker } from 'antlr4ts/tree';

import { StoryLexer } from '../parser/StoryLexer';
import { StoryListener } from '../parser/StoryListener';
import { AndContext, ExpressionContext, ExpressionTextContext, FeatureContext, GivenContext, ModelContext, ScenarioContext, SectionNameContext, StaticValueContext, StoryParser, ThenContext, VariableNameContext, WhenContext } from '../parser/StoryParser';
import { StorySection, StoryModel } from './model';
import { StoryExpression, StoryFeature, StoryRule, StoryScenario } from './parts';


export function parseStoryModel(document: vscode.TextDocument): StoryModel {
    const documentText = document.getText();
    const psrserModel = parseDocument(documentText);

    return buildStoryModel(psrserModel);
}

function parseDocument(documentText: string) {

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

    enterFeature(ctx: FeatureContext){
        const feature = new StoryFeature(ctx);
        this.model.addStructureElement(ctx.start.line, feature);
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
        this.activeScenario = new StoryScenario(ctx);
        this.activeSection = this.activeScenario;
    }

    exitScenario(ctx: ScenarioContext){
        this.model.addStructureElement(ctx.start.line, this.activeScenario);
        this.activeScenario = undefined;
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
        this.activeRule.setExpression(this.activeExpression);
        this.activeExpression = undefined;

        this.model.addStructureElement(ctx.start.line, this.activeRule);
        this.activeRule = undefined;
    }
}

