// Generated from ./src/story/grammar/story.g4 by ANTLR 4.7.3-SNAPSHOT


import { ParseTreeVisitor } from "antlr4ts/tree/ParseTreeVisitor";

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
 * This interface defines a complete generic visitor for a parse tree produced
 * by `storyParser`.
 *
 * @param <Result> The return type of the visit operation. Use `void` for
 * operations with no return type.
 */
export interface storyVisitor<Result> extends ParseTreeVisitor<Result> {
	/**
	 * Visit a parse tree produced by `storyParser.model`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitModel?: (ctx: ModelContext) => Result;

	/**
	 * Visit a parse tree produced by `storyParser.feature`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitFeature?: (ctx: FeatureContext) => Result;

	/**
	 * Visit a parse tree produced by `storyParser.scenario`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitScenario?: (ctx: ScenarioContext) => Result;

	/**
	 * Visit a parse tree produced by `storyParser.sectionName`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSectionName?: (ctx: SectionNameContext) => Result;

	/**
	 * Visit a parse tree produced by `storyParser.given`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitGiven?: (ctx: GivenContext) => Result;

	/**
	 * Visit a parse tree produced by `storyParser.when`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitWhen?: (ctx: WhenContext) => Result;

	/**
	 * Visit a parse tree produced by `storyParser.then`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitThen?: (ctx: ThenContext) => Result;

	/**
	 * Visit a parse tree produced by `storyParser.and`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAnd?: (ctx: AndContext) => Result;

	/**
	 * Visit a parse tree produced by `storyParser.expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitExpression?: (ctx: ExpressionContext) => Result;

	/**
	 * Visit a parse tree produced by `storyParser.expressionText`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitExpressionText?: (ctx: ExpressionTextContext) => Result;

	/**
	 * Visit a parse tree produced by `storyParser.variableRef`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitVariableRef?: (ctx: VariableRefContext) => Result;

	/**
	 * Visit a parse tree produced by `storyParser.variableName`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitVariableName?: (ctx: VariableNameContext) => Result;

	/**
	 * Visit a parse tree produced by `storyParser.staticValueSingle`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitStaticValueSingle?: (ctx: StaticValueSingleContext) => Result;

	/**
	 * Visit a parse tree produced by `storyParser.staticValueDouble`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitStaticValueDouble?: (ctx: StaticValueDoubleContext) => Result;

	/**
	 * Visit a parse tree produced by `storyParser.staticValue`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitStaticValue?: (ctx: StaticValueContext) => Result;

	/**
	 * Visit a parse tree produced by `storyParser.emptyLine`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitEmptyLine?: (ctx: EmptyLineContext) => Result;
}

