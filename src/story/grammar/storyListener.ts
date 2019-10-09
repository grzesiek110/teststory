// Generated from ./src/story/grammar/story.g4 by ANTLR 4.7.3-SNAPSHOT


import { ParseTreeListener } from "antlr4ts/tree/ParseTreeListener";

import { ModelContext } from "./storyParser";
import { FeatureContext } from "./storyParser";
import { ScenarioContext } from "./storyParser";
import { SectionNameContext } from "./storyParser";
import { GivenContext } from "./storyParser";
import { WhenContext } from "./storyParser";
import { ThenContext } from "./storyParser";
import { AndContext } from "./storyParser";
import { ExpressionContext } from "./storyParser";
import { ExpressionTextContext } from "./storyParser";
import { VariableRefContext } from "./storyParser";
import { VariableNameContext } from "./storyParser";
import { StaticValueSingleContext } from "./storyParser";
import { StaticValueDoubleContext } from "./storyParser";
import { StaticValueContext } from "./storyParser";
import { EmptyLineContext } from "./storyParser";


/**
 * This interface defines a complete listener for a parse tree produced by
 * `storyParser`.
 */
export interface storyListener extends ParseTreeListener {
	/**
	 * Enter a parse tree produced by `storyParser.model`.
	 * @param ctx the parse tree
	 */
	enterModel?: (ctx: ModelContext) => void;
	/**
	 * Exit a parse tree produced by `storyParser.model`.
	 * @param ctx the parse tree
	 */
	exitModel?: (ctx: ModelContext) => void;

	/**
	 * Enter a parse tree produced by `storyParser.feature`.
	 * @param ctx the parse tree
	 */
	enterFeature?: (ctx: FeatureContext) => void;
	/**
	 * Exit a parse tree produced by `storyParser.feature`.
	 * @param ctx the parse tree
	 */
	exitFeature?: (ctx: FeatureContext) => void;

	/**
	 * Enter a parse tree produced by `storyParser.scenario`.
	 * @param ctx the parse tree
	 */
	enterScenario?: (ctx: ScenarioContext) => void;
	/**
	 * Exit a parse tree produced by `storyParser.scenario`.
	 * @param ctx the parse tree
	 */
	exitScenario?: (ctx: ScenarioContext) => void;

	/**
	 * Enter a parse tree produced by `storyParser.sectionName`.
	 * @param ctx the parse tree
	 */
	enterSectionName?: (ctx: SectionNameContext) => void;
	/**
	 * Exit a parse tree produced by `storyParser.sectionName`.
	 * @param ctx the parse tree
	 */
	exitSectionName?: (ctx: SectionNameContext) => void;

	/**
	 * Enter a parse tree produced by `storyParser.given`.
	 * @param ctx the parse tree
	 */
	enterGiven?: (ctx: GivenContext) => void;
	/**
	 * Exit a parse tree produced by `storyParser.given`.
	 * @param ctx the parse tree
	 */
	exitGiven?: (ctx: GivenContext) => void;

	/**
	 * Enter a parse tree produced by `storyParser.when`.
	 * @param ctx the parse tree
	 */
	enterWhen?: (ctx: WhenContext) => void;
	/**
	 * Exit a parse tree produced by `storyParser.when`.
	 * @param ctx the parse tree
	 */
	exitWhen?: (ctx: WhenContext) => void;

	/**
	 * Enter a parse tree produced by `storyParser.then`.
	 * @param ctx the parse tree
	 */
	enterThen?: (ctx: ThenContext) => void;
	/**
	 * Exit a parse tree produced by `storyParser.then`.
	 * @param ctx the parse tree
	 */
	exitThen?: (ctx: ThenContext) => void;

	/**
	 * Enter a parse tree produced by `storyParser.and`.
	 * @param ctx the parse tree
	 */
	enterAnd?: (ctx: AndContext) => void;
	/**
	 * Exit a parse tree produced by `storyParser.and`.
	 * @param ctx the parse tree
	 */
	exitAnd?: (ctx: AndContext) => void;

	/**
	 * Enter a parse tree produced by `storyParser.expression`.
	 * @param ctx the parse tree
	 */
	enterExpression?: (ctx: ExpressionContext) => void;
	/**
	 * Exit a parse tree produced by `storyParser.expression`.
	 * @param ctx the parse tree
	 */
	exitExpression?: (ctx: ExpressionContext) => void;

	/**
	 * Enter a parse tree produced by `storyParser.expressionText`.
	 * @param ctx the parse tree
	 */
	enterExpressionText?: (ctx: ExpressionTextContext) => void;
	/**
	 * Exit a parse tree produced by `storyParser.expressionText`.
	 * @param ctx the parse tree
	 */
	exitExpressionText?: (ctx: ExpressionTextContext) => void;

	/**
	 * Enter a parse tree produced by `storyParser.variableRef`.
	 * @param ctx the parse tree
	 */
	enterVariableRef?: (ctx: VariableRefContext) => void;
	/**
	 * Exit a parse tree produced by `storyParser.variableRef`.
	 * @param ctx the parse tree
	 */
	exitVariableRef?: (ctx: VariableRefContext) => void;

	/**
	 * Enter a parse tree produced by `storyParser.variableName`.
	 * @param ctx the parse tree
	 */
	enterVariableName?: (ctx: VariableNameContext) => void;
	/**
	 * Exit a parse tree produced by `storyParser.variableName`.
	 * @param ctx the parse tree
	 */
	exitVariableName?: (ctx: VariableNameContext) => void;

	/**
	 * Enter a parse tree produced by `storyParser.staticValueSingle`.
	 * @param ctx the parse tree
	 */
	enterStaticValueSingle?: (ctx: StaticValueSingleContext) => void;
	/**
	 * Exit a parse tree produced by `storyParser.staticValueSingle`.
	 * @param ctx the parse tree
	 */
	exitStaticValueSingle?: (ctx: StaticValueSingleContext) => void;

	/**
	 * Enter a parse tree produced by `storyParser.staticValueDouble`.
	 * @param ctx the parse tree
	 */
	enterStaticValueDouble?: (ctx: StaticValueDoubleContext) => void;
	/**
	 * Exit a parse tree produced by `storyParser.staticValueDouble`.
	 * @param ctx the parse tree
	 */
	exitStaticValueDouble?: (ctx: StaticValueDoubleContext) => void;

	/**
	 * Enter a parse tree produced by `storyParser.staticValue`.
	 * @param ctx the parse tree
	 */
	enterStaticValue?: (ctx: StaticValueContext) => void;
	/**
	 * Exit a parse tree produced by `storyParser.staticValue`.
	 * @param ctx the parse tree
	 */
	exitStaticValue?: (ctx: StaticValueContext) => void;

	/**
	 * Enter a parse tree produced by `storyParser.emptyLine`.
	 * @param ctx the parse tree
	 */
	enterEmptyLine?: (ctx: EmptyLineContext) => void;
	/**
	 * Exit a parse tree produced by `storyParser.emptyLine`.
	 * @param ctx the parse tree
	 */
	exitEmptyLine?: (ctx: EmptyLineContext) => void;
}

