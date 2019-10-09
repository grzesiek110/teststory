// Generated from ./src/story/grammar/story.g4 by ANTLR 4.7.3-SNAPSHOT


import { ATN } from "antlr4ts/atn/ATN";
import { ATNDeserializer } from "antlr4ts/atn/ATNDeserializer";
import { FailedPredicateException } from "antlr4ts/FailedPredicateException";
import { NotNull } from "antlr4ts/Decorators";
import { NoViableAltException } from "antlr4ts/NoViableAltException";
import { Override } from "antlr4ts/Decorators";
import { Parser } from "antlr4ts/Parser";
import { ParserRuleContext } from "antlr4ts/ParserRuleContext";
import { ParserATNSimulator } from "antlr4ts/atn/ParserATNSimulator";
import { ParseTreeListener } from "antlr4ts/tree/ParseTreeListener";
import { ParseTreeVisitor } from "antlr4ts/tree/ParseTreeVisitor";
import { RecognitionException } from "antlr4ts/RecognitionException";
import { RuleContext } from "antlr4ts/RuleContext";
//import { RuleVersion } from "antlr4ts/RuleVersion";
import { TerminalNode } from "antlr4ts/tree/TerminalNode";
import { Token } from "antlr4ts/Token";
import { TokenStream } from "antlr4ts/TokenStream";
import { Vocabulary } from "antlr4ts/Vocabulary";
import { VocabularyImpl } from "antlr4ts/VocabularyImpl";

import * as Utils from "antlr4ts/misc/Utils";

import { storyListener } from "./storyListener";
import { storyVisitor } from "./storyVisitor";


export class storyParser extends Parser {
	public static readonly T__0 = 1;
	public static readonly T__1 = 2;
	public static readonly T__2 = 3;
	public static readonly T__3 = 4;
	public static readonly T__4 = 5;
	public static readonly T__5 = 6;
	public static readonly T__6 = 7;
	public static readonly T__7 = 8;
	public static readonly SINGLE_QUOTE = 9;
	public static readonly DOUBLE_QUOTE = 10;
	public static readonly VARIABLE_NAME = 11;
	public static readonly WORD = 12;
	public static readonly NUMBER = 13;
	public static readonly WS = 14;
	public static readonly EOL = 15;
	public static readonly RULE_model = 0;
	public static readonly RULE_feature = 1;
	public static readonly RULE_scenario = 2;
	public static readonly RULE_sectionName = 3;
	public static readonly RULE_given = 4;
	public static readonly RULE_when = 5;
	public static readonly RULE_then = 6;
	public static readonly RULE_and = 7;
	public static readonly RULE_expression = 8;
	public static readonly RULE_expressionText = 9;
	public static readonly RULE_variableRef = 10;
	public static readonly RULE_variableName = 11;
	public static readonly RULE_staticValueSingle = 12;
	public static readonly RULE_staticValueDouble = 13;
	public static readonly RULE_staticValue = 14;
	public static readonly RULE_emptyLine = 15;
	// tslint:disable:no-trailing-whitespace
	public static readonly ruleNames: string[] = [
		"model", "feature", "scenario", "sectionName", "given", "when", "then", 
		"and", "expression", "expressionText", "variableRef", "variableName", 
		"staticValueSingle", "staticValueDouble", "staticValue", "emptyLine",
	];

	private static readonly _LITERAL_NAMES: Array<string | undefined> = [
		undefined, "'Feature'", "'Scenario'", "'Given'", "'When'", "'Then'", "'And'", 
		"'<'", "'>'", "'''", "'\"'",
	];
	private static readonly _SYMBOLIC_NAMES: Array<string | undefined> = [
		undefined, undefined, undefined, undefined, undefined, undefined, undefined, 
		undefined, undefined, "SINGLE_QUOTE", "DOUBLE_QUOTE", "VARIABLE_NAME", 
		"WORD", "NUMBER", "WS", "EOL",
	];
	public static readonly VOCABULARY: Vocabulary = new VocabularyImpl(storyParser._LITERAL_NAMES, storyParser._SYMBOLIC_NAMES, []);

	// @Override
	// @NotNull
	public get vocabulary(): Vocabulary {
		return storyParser.VOCABULARY;
	}
	// tslint:enable:no-trailing-whitespace

	// @Override
	public get grammarFileName(): string { return "story.g4"; }

	// @Override
	public get ruleNames(): string[] { return storyParser.ruleNames; }

	// @Override
	public get serializedATN(): string { return storyParser._serializedATN; }

	constructor(input: TokenStream) {
		super(input);
		this._interp = new ParserATNSimulator(storyParser._ATN, this);
	}
	// @RuleVersion(0)
	public model(): ModelContext {
		let _localctx: ModelContext = new ModelContext(this._ctx, this.state);
		this.enterRule(_localctx, 0, storyParser.RULE_model);
		let _la: number;
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 35;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input, 0, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					{
					{
					this.state = 32;
					this.emptyLine();
					}
					}
				}
				this.state = 37;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 0, this._ctx);
			}
			this.state = 38;
			this.feature();
			this.state = 42;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === storyParser.WS || _la === storyParser.EOL) {
				{
				{
				this.state = 39;
				this.emptyLine();
				}
				}
				this.state = 44;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public feature(): FeatureContext {
		let _localctx: FeatureContext = new FeatureContext(this._ctx, this.state);
		this.enterRule(_localctx, 2, storyParser.RULE_feature);
		let _la: number;
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 46;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === storyParser.WS) {
				{
				this.state = 45;
				this.match(storyParser.WS);
				}
			}

			this.state = 48;
			this.match(storyParser.T__0);
			this.state = 49;
			this.match(storyParser.WS);
			this.state = 50;
			this.sectionName();
			this.state = 54;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input, 3, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					{
					{
					this.state = 51;
					this.emptyLine();
					}
					}
				}
				this.state = 56;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 3, this._ctx);
			}
			this.state = 60;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input, 4, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					{
					{
					this.state = 57;
					this.scenario();
					}
					}
				}
				this.state = 62;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 4, this._ctx);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public scenario(): ScenarioContext {
		let _localctx: ScenarioContext = new ScenarioContext(this._ctx, this.state);
		this.enterRule(_localctx, 4, storyParser.RULE_scenario);
		let _la: number;
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 64;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === storyParser.WS) {
				{
				this.state = 63;
				this.match(storyParser.WS);
				}
			}

			this.state = 66;
			this.match(storyParser.T__1);
			this.state = 67;
			this.match(storyParser.WS);
			this.state = 68;
			this.sectionName();
			this.state = 72;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input, 6, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					{
					{
					this.state = 69;
					this.emptyLine();
					}
					}
				}
				this.state = 74;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 6, this._ctx);
			}
			this.state = 78;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input, 7, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					{
					{
					this.state = 75;
					this.given();
					}
					}
				}
				this.state = 80;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 7, this._ctx);
			}
			this.state = 84;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input, 8, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					{
					{
					this.state = 81;
					this.when();
					}
					}
				}
				this.state = 86;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 8, this._ctx);
			}
			this.state = 90;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input, 9, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					{
					{
					this.state = 87;
					this.then();
					}
					}
				}
				this.state = 92;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 9, this._ctx);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public sectionName(): SectionNameContext {
		let _localctx: SectionNameContext = new SectionNameContext(this._ctx, this.state);
		this.enterRule(_localctx, 6, storyParser.RULE_sectionName);
		let _la: number;
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 96;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input, 10, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					{
					{
					this.state = 93;
					_la = this._input.LA(1);
					if (_la <= 0 || (_la === storyParser.EOL)) {
					this._errHandler.recoverInline(this);
					} else {
						if (this._input.LA(1) === Token.EOF) {
							this.matchedEOF = true;
						}

						this._errHandler.reportMatch(this);
						this.consume();
					}
					}
					}
				}
				this.state = 98;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 10, this._ctx);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public given(): GivenContext {
		let _localctx: GivenContext = new GivenContext(this._ctx, this.state);
		this.enterRule(_localctx, 8, storyParser.RULE_given);
		let _la: number;
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 100;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === storyParser.WS) {
				{
				this.state = 99;
				this.match(storyParser.WS);
				}
			}

			this.state = 102;
			this.match(storyParser.T__2);
			this.state = 103;
			this.match(storyParser.WS);
			this.state = 104;
			this.expression();
			this.state = 108;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input, 12, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					{
					{
					this.state = 105;
					this.emptyLine();
					}
					}
				}
				this.state = 110;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 12, this._ctx);
			}
			this.state = 114;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input, 13, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					{
					{
					this.state = 111;
					this.and();
					}
					}
				}
				this.state = 116;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 13, this._ctx);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public when(): WhenContext {
		let _localctx: WhenContext = new WhenContext(this._ctx, this.state);
		this.enterRule(_localctx, 10, storyParser.RULE_when);
		let _la: number;
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 118;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === storyParser.WS) {
				{
				this.state = 117;
				this.match(storyParser.WS);
				}
			}

			this.state = 120;
			this.match(storyParser.T__3);
			this.state = 121;
			this.match(storyParser.WS);
			this.state = 122;
			this.expression();
			this.state = 126;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input, 15, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					{
					{
					this.state = 123;
					this.emptyLine();
					}
					}
				}
				this.state = 128;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 15, this._ctx);
			}
			this.state = 132;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input, 16, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					{
					{
					this.state = 129;
					this.and();
					}
					}
				}
				this.state = 134;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 16, this._ctx);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public then(): ThenContext {
		let _localctx: ThenContext = new ThenContext(this._ctx, this.state);
		this.enterRule(_localctx, 12, storyParser.RULE_then);
		let _la: number;
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 136;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === storyParser.WS) {
				{
				this.state = 135;
				this.match(storyParser.WS);
				}
			}

			this.state = 138;
			this.match(storyParser.T__4);
			this.state = 139;
			this.match(storyParser.WS);
			this.state = 140;
			this.expression();
			this.state = 144;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input, 18, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					{
					{
					this.state = 141;
					this.emptyLine();
					}
					}
				}
				this.state = 146;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 18, this._ctx);
			}
			this.state = 150;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input, 19, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					{
					{
					this.state = 147;
					this.and();
					}
					}
				}
				this.state = 152;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 19, this._ctx);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public and(): AndContext {
		let _localctx: AndContext = new AndContext(this._ctx, this.state);
		this.enterRule(_localctx, 14, storyParser.RULE_and);
		let _la: number;
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 154;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === storyParser.WS) {
				{
				this.state = 153;
				this.match(storyParser.WS);
				}
			}

			this.state = 156;
			this.match(storyParser.T__5);
			this.state = 157;
			this.match(storyParser.WS);
			this.state = 158;
			this.expression();
			this.state = 162;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input, 21, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					{
					{
					this.state = 159;
					this.emptyLine();
					}
					}
				}
				this.state = 164;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 21, this._ctx);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public expression(): ExpressionContext {
		let _localctx: ExpressionContext = new ExpressionContext(this._ctx, this.state);
		this.enterRule(_localctx, 16, storyParser.RULE_expression);
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 171;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input, 23, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					{
					this.state = 169;
					this._errHandler.sync(this);
					switch (this._input.LA(1)) {
					case storyParser.T__0:
					case storyParser.T__1:
					case storyParser.T__2:
					case storyParser.T__3:
					case storyParser.T__4:
					case storyParser.T__5:
					case storyParser.T__7:
					case storyParser.VARIABLE_NAME:
					case storyParser.WORD:
					case storyParser.NUMBER:
					case storyParser.WS:
						{
						this.state = 165;
						this.expressionText();
						}
						break;
					case storyParser.T__6:
						{
						this.state = 166;
						this.variableRef();
						}
						break;
					case storyParser.SINGLE_QUOTE:
						{
						this.state = 167;
						this.staticValueSingle();
						}
						break;
					case storyParser.DOUBLE_QUOTE:
						{
						this.state = 168;
						this.staticValueDouble();
						}
						break;
					default:
						throw new NoViableAltException(this);
					}
					}
				}
				this.state = 173;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 23, this._ctx);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public expressionText(): ExpressionTextContext {
		let _localctx: ExpressionTextContext = new ExpressionTextContext(this._ctx, this.state);
		this.enterRule(_localctx, 18, storyParser.RULE_expressionText);
		let _la: number;
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 175;
			this._errHandler.sync(this);
			_alt = 1;
			do {
				switch (_alt) {
				case 1:
					{
					{
					this.state = 174;
					_la = this._input.LA(1);
					if (_la <= 0 || ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << storyParser.T__6) | (1 << storyParser.SINGLE_QUOTE) | (1 << storyParser.DOUBLE_QUOTE) | (1 << storyParser.EOL))) !== 0))) {
					this._errHandler.recoverInline(this);
					} else {
						if (this._input.LA(1) === Token.EOF) {
							this.matchedEOF = true;
						}

						this._errHandler.reportMatch(this);
						this.consume();
					}
					}
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				this.state = 177;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 24, this._ctx);
			} while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public variableRef(): VariableRefContext {
		let _localctx: VariableRefContext = new VariableRefContext(this._ctx, this.state);
		this.enterRule(_localctx, 20, storyParser.RULE_variableRef);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 179;
			this.match(storyParser.T__6);
			this.state = 181;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === storyParser.WS) {
				{
				this.state = 180;
				this.match(storyParser.WS);
				}
			}

			this.state = 183;
			this.variableName();
			this.state = 185;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === storyParser.WS) {
				{
				this.state = 184;
				this.match(storyParser.WS);
				}
			}

			this.state = 187;
			this.match(storyParser.T__7);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public variableName(): VariableNameContext {
		let _localctx: VariableNameContext = new VariableNameContext(this._ctx, this.state);
		this.enterRule(_localctx, 22, storyParser.RULE_variableName);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 189;
			this.match(storyParser.VARIABLE_NAME);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public staticValueSingle(): StaticValueSingleContext {
		let _localctx: StaticValueSingleContext = new StaticValueSingleContext(this._ctx, this.state);
		this.enterRule(_localctx, 24, storyParser.RULE_staticValueSingle);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 191;
			this.match(storyParser.SINGLE_QUOTE);
			this.state = 192;
			this.staticValue();
			this.state = 193;
			this.match(storyParser.SINGLE_QUOTE);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public staticValueDouble(): StaticValueDoubleContext {
		let _localctx: StaticValueDoubleContext = new StaticValueDoubleContext(this._ctx, this.state);
		this.enterRule(_localctx, 26, storyParser.RULE_staticValueDouble);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 195;
			this.match(storyParser.DOUBLE_QUOTE);
			this.state = 196;
			this.staticValue();
			this.state = 197;
			this.match(storyParser.DOUBLE_QUOTE);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public staticValue(): StaticValueContext {
		let _localctx: StaticValueContext = new StaticValueContext(this._ctx, this.state);
		this.enterRule(_localctx, 28, storyParser.RULE_staticValue);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 200;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			do {
				{
				{
				this.state = 199;
				_la = this._input.LA(1);
				if (_la <= 0 || (_la === storyParser.SINGLE_QUOTE || _la === storyParser.DOUBLE_QUOTE)) {
				this._errHandler.recoverInline(this);
				} else {
					if (this._input.LA(1) === Token.EOF) {
						this.matchedEOF = true;
					}

					this._errHandler.reportMatch(this);
					this.consume();
				}
				}
				}
				this.state = 202;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			} while ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << storyParser.T__0) | (1 << storyParser.T__1) | (1 << storyParser.T__2) | (1 << storyParser.T__3) | (1 << storyParser.T__4) | (1 << storyParser.T__5) | (1 << storyParser.T__6) | (1 << storyParser.T__7) | (1 << storyParser.VARIABLE_NAME) | (1 << storyParser.WORD) | (1 << storyParser.NUMBER) | (1 << storyParser.WS) | (1 << storyParser.EOL))) !== 0));
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public emptyLine(): EmptyLineContext {
		let _localctx: EmptyLineContext = new EmptyLineContext(this._ctx, this.state);
		this.enterRule(_localctx, 30, storyParser.RULE_emptyLine);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 205;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === storyParser.WS) {
				{
				this.state = 204;
				this.match(storyParser.WS);
				}
			}

			this.state = 207;
			this.match(storyParser.EOL);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}

	public static readonly _serializedATN: string =
		"\x03\uC91D\uCABA\u058D\uAFBA\u4F53\u0607\uEA8B\uC241\x03\x11\xD4\x04\x02" +
		"\t\x02\x04\x03\t\x03\x04\x04\t\x04\x04\x05\t\x05\x04\x06\t\x06\x04\x07" +
		"\t\x07\x04\b\t\b\x04\t\t\t\x04\n\t\n\x04\v\t\v\x04\f\t\f\x04\r\t\r\x04" +
		"\x0E\t\x0E\x04\x0F\t\x0F\x04\x10\t\x10\x04\x11\t\x11\x03\x02\x07\x02$" +
		"\n\x02\f\x02\x0E\x02\'\v\x02\x03\x02\x03\x02\x07\x02+\n\x02\f\x02\x0E" +
		"\x02.\v\x02\x03\x03\x05\x031\n\x03\x03\x03\x03\x03\x03\x03\x03\x03\x07" +
		"\x037\n\x03\f\x03\x0E\x03:\v\x03\x03\x03\x07\x03=\n\x03\f\x03\x0E\x03" +
		"@\v\x03\x03\x04\x05\x04C\n\x04\x03\x04\x03\x04\x03\x04\x03\x04\x07\x04" +
		"I\n\x04\f\x04\x0E\x04L\v\x04\x03\x04\x07\x04O\n\x04\f\x04\x0E\x04R\v\x04" +
		"\x03\x04\x07\x04U\n\x04\f\x04\x0E\x04X\v\x04\x03\x04\x07\x04[\n\x04\f" +
		"\x04\x0E\x04^\v\x04\x03\x05\x07\x05a\n\x05\f\x05\x0E\x05d\v\x05\x03\x06" +
		"\x05\x06g\n\x06\x03\x06\x03\x06\x03\x06\x03\x06\x07\x06m\n\x06\f\x06\x0E" +
		"\x06p\v\x06\x03\x06\x07\x06s\n\x06\f\x06\x0E\x06v\v\x06\x03\x07\x05\x07" +
		"y\n\x07\x03\x07\x03\x07\x03\x07\x03\x07\x07\x07\x7F\n\x07\f\x07\x0E\x07" +
		"\x82\v\x07\x03\x07\x07\x07\x85\n\x07\f\x07\x0E\x07\x88\v\x07\x03\b\x05" +
		"\b\x8B\n\b\x03\b\x03\b\x03\b\x03\b\x07\b\x91\n\b\f\b\x0E\b\x94\v\b\x03" +
		"\b\x07\b\x97\n\b\f\b\x0E\b\x9A\v\b\x03\t\x05\t\x9D\n\t\x03\t\x03\t\x03" +
		"\t\x03\t\x07\t\xA3\n\t\f\t\x0E\t\xA6\v\t\x03\n\x03\n\x03\n\x03\n\x07\n" +
		"\xAC\n\n\f\n\x0E\n\xAF\v\n\x03\v\x06\v\xB2\n\v\r\v\x0E\v\xB3\x03\f\x03" +
		"\f\x05\f\xB8\n\f\x03\f\x03\f\x05\f\xBC\n\f\x03\f\x03\f\x03\r\x03\r\x03" +
		"\x0E\x03\x0E\x03\x0E\x03\x0E\x03\x0F\x03\x0F\x03\x0F\x03\x0F\x03\x10\x06" +
		"\x10\xCB\n\x10\r\x10\x0E\x10\xCC\x03\x11\x05\x11\xD0\n\x11\x03\x11\x03" +
		"\x11\x03\x11\x02\x02\x02\x12\x02\x02\x04\x02\x06\x02\b\x02\n\x02\f\x02" +
		"\x0E\x02\x10\x02\x12\x02\x14\x02\x16\x02\x18\x02\x1A\x02\x1C\x02\x1E\x02" +
		" \x02\x02\x05\x03\x02\x11\x11\x05\x02\t\t\v\f\x11\x11\x03\x02\v\f\x02" +
		"\xE2\x02%\x03\x02\x02\x02\x040\x03\x02\x02\x02\x06B\x03\x02\x02\x02\b" +
		"b\x03\x02\x02\x02\nf\x03\x02\x02\x02\fx\x03\x02\x02\x02\x0E\x8A\x03\x02" +
		"\x02\x02\x10\x9C\x03\x02\x02\x02\x12\xAD\x03\x02\x02\x02\x14\xB1\x03\x02" +
		"\x02\x02\x16\xB5\x03\x02\x02\x02\x18\xBF\x03\x02\x02\x02\x1A\xC1\x03\x02" +
		"\x02\x02\x1C\xC5\x03\x02\x02\x02\x1E\xCA\x03\x02\x02\x02 \xCF\x03\x02" +
		"\x02\x02\"$\x05 \x11\x02#\"\x03\x02\x02\x02$\'\x03\x02\x02\x02%#\x03\x02" +
		"\x02\x02%&\x03\x02\x02\x02&(\x03\x02\x02\x02\'%\x03\x02\x02\x02(,\x05" +
		"\x04\x03\x02)+\x05 \x11\x02*)\x03\x02\x02\x02+.\x03\x02\x02\x02,*\x03" +
		"\x02\x02\x02,-\x03\x02\x02\x02-\x03\x03\x02\x02\x02.,\x03\x02\x02\x02" +
		"/1\x07\x10\x02\x020/\x03\x02\x02\x0201\x03\x02\x02\x0212\x03\x02\x02\x02" +
		"23\x07\x03\x02\x0234\x07\x10\x02\x0248\x05\b\x05\x0257\x05 \x11\x0265" +
		"\x03\x02\x02\x027:\x03\x02\x02\x0286\x03\x02\x02\x0289\x03\x02\x02\x02" +
		"9>\x03\x02\x02\x02:8\x03\x02\x02\x02;=\x05\x06\x04\x02<;\x03\x02\x02\x02" +
		"=@\x03\x02\x02\x02><\x03\x02\x02\x02>?\x03\x02\x02\x02?\x05\x03\x02\x02" +
		"\x02@>\x03\x02\x02\x02AC\x07\x10\x02\x02BA\x03\x02\x02\x02BC\x03\x02\x02" +
		"\x02CD\x03\x02\x02\x02DE\x07\x04\x02\x02EF\x07\x10\x02\x02FJ\x05\b\x05" +
		"\x02GI\x05 \x11\x02HG\x03\x02\x02\x02IL\x03\x02\x02\x02JH\x03\x02\x02" +
		"\x02JK\x03\x02\x02\x02KP\x03\x02\x02\x02LJ\x03\x02\x02\x02MO\x05\n\x06" +
		"\x02NM\x03\x02\x02\x02OR\x03\x02\x02\x02PN\x03\x02\x02\x02PQ\x03\x02\x02" +
		"\x02QV\x03\x02\x02\x02RP\x03\x02\x02\x02SU\x05\f\x07\x02TS\x03\x02\x02" +
		"\x02UX\x03\x02\x02\x02VT\x03\x02\x02\x02VW\x03\x02\x02\x02W\\\x03\x02" +
		"\x02\x02XV\x03\x02\x02\x02Y[\x05\x0E\b\x02ZY\x03\x02\x02\x02[^\x03\x02" +
		"\x02\x02\\Z\x03\x02\x02\x02\\]\x03\x02\x02\x02]\x07\x03\x02\x02\x02^\\" +
		"\x03\x02\x02\x02_a\n\x02\x02\x02`_\x03\x02\x02\x02ad\x03\x02\x02\x02b" +
		"`\x03\x02\x02\x02bc\x03\x02\x02\x02c\t\x03\x02\x02\x02db\x03\x02\x02\x02" +
		"eg\x07\x10\x02\x02fe\x03\x02\x02\x02fg\x03\x02\x02\x02gh\x03\x02\x02\x02" +
		"hi\x07\x05\x02\x02ij\x07\x10\x02\x02jn\x05\x12\n\x02km\x05 \x11\x02lk" +
		"\x03\x02\x02\x02mp\x03\x02\x02\x02nl\x03\x02\x02\x02no\x03\x02\x02\x02" +
		"ot\x03\x02\x02\x02pn\x03\x02\x02\x02qs\x05\x10\t\x02rq\x03\x02\x02\x02" +
		"sv\x03\x02\x02\x02tr\x03\x02\x02\x02tu\x03\x02\x02\x02u\v\x03\x02\x02" +
		"\x02vt\x03\x02\x02\x02wy\x07\x10\x02\x02xw\x03\x02\x02\x02xy\x03\x02\x02" +
		"\x02yz\x03\x02\x02\x02z{\x07\x06\x02\x02{|\x07\x10\x02\x02|\x80\x05\x12" +
		"\n\x02}\x7F\x05 \x11\x02~}\x03\x02\x02\x02\x7F\x82\x03\x02\x02\x02\x80" +
		"~\x03\x02\x02\x02\x80\x81\x03\x02\x02\x02\x81\x86\x03\x02\x02\x02\x82" +
		"\x80\x03\x02\x02\x02\x83\x85\x05\x10\t\x02\x84\x83\x03\x02\x02\x02\x85" +
		"\x88\x03\x02\x02\x02\x86\x84\x03\x02\x02\x02\x86\x87\x03\x02\x02\x02\x87" +
		"\r\x03\x02\x02\x02\x88\x86\x03\x02\x02\x02\x89\x8B\x07\x10\x02\x02\x8A" +
		"\x89\x03\x02\x02\x02\x8A\x8B\x03\x02\x02\x02\x8B\x8C\x03\x02\x02\x02\x8C" +
		"\x8D\x07\x07\x02\x02\x8D\x8E\x07\x10\x02\x02\x8E\x92\x05\x12\n\x02\x8F" +
		"\x91\x05 \x11\x02\x90\x8F\x03\x02\x02\x02\x91\x94\x03\x02\x02\x02\x92" +
		"\x90\x03\x02\x02\x02\x92\x93\x03\x02\x02\x02\x93\x98\x03\x02\x02\x02\x94" +
		"\x92\x03\x02\x02\x02\x95\x97\x05\x10\t\x02\x96\x95\x03\x02\x02\x02\x97" +
		"\x9A\x03\x02\x02\x02\x98\x96\x03\x02\x02\x02\x98\x99\x03\x02\x02\x02\x99" +
		"\x0F\x03\x02\x02\x02\x9A\x98\x03\x02\x02\x02\x9B\x9D\x07\x10\x02\x02\x9C" +
		"\x9B\x03\x02\x02\x02\x9C\x9D\x03\x02\x02\x02\x9D\x9E\x03\x02\x02\x02\x9E" +
		"\x9F\x07\b\x02\x02\x9F\xA0\x07\x10\x02\x02\xA0\xA4\x05\x12\n\x02\xA1\xA3" +
		"\x05 \x11\x02\xA2\xA1\x03\x02\x02\x02\xA3\xA6\x03\x02\x02\x02\xA4\xA2" +
		"\x03\x02\x02\x02\xA4\xA5\x03\x02\x02\x02\xA5\x11\x03\x02\x02\x02\xA6\xA4" +
		"\x03\x02\x02\x02\xA7\xAC\x05\x14\v\x02\xA8\xAC\x05\x16\f\x02\xA9\xAC\x05" +
		"\x1A\x0E\x02\xAA\xAC\x05\x1C\x0F\x02\xAB\xA7\x03\x02\x02\x02\xAB\xA8\x03" +
		"\x02\x02\x02\xAB\xA9\x03\x02\x02\x02\xAB\xAA\x03\x02\x02\x02\xAC\xAF\x03" +
		"\x02\x02\x02\xAD\xAB\x03\x02\x02\x02\xAD\xAE\x03\x02\x02\x02\xAE\x13\x03" +
		"\x02\x02\x02\xAF\xAD\x03\x02\x02\x02\xB0\xB2\n\x03\x02\x02\xB1\xB0\x03" +
		"\x02\x02\x02\xB2\xB3\x03\x02\x02\x02\xB3\xB1\x03\x02\x02\x02\xB3\xB4\x03" +
		"\x02\x02\x02\xB4\x15\x03\x02\x02\x02\xB5\xB7\x07\t\x02\x02\xB6\xB8\x07" +
		"\x10\x02\x02\xB7\xB6\x03\x02\x02\x02\xB7\xB8\x03\x02\x02\x02\xB8\xB9\x03" +
		"\x02\x02\x02\xB9\xBB\x05\x18\r\x02\xBA\xBC\x07\x10\x02\x02\xBB\xBA\x03" +
		"\x02\x02\x02\xBB\xBC\x03\x02\x02\x02\xBC\xBD\x03\x02\x02\x02\xBD\xBE\x07" +
		"\n\x02\x02\xBE\x17\x03\x02\x02\x02\xBF\xC0\x07\r\x02\x02\xC0\x19\x03\x02" +
		"\x02\x02\xC1\xC2\x07\v\x02\x02\xC2\xC3\x05\x1E\x10\x02\xC3\xC4\x07\v\x02" +
		"\x02\xC4\x1B\x03\x02\x02\x02\xC5\xC6\x07\f\x02\x02\xC6\xC7\x05\x1E\x10" +
		"\x02\xC7\xC8\x07\f\x02\x02\xC8\x1D\x03\x02\x02\x02\xC9\xCB\n\x04\x02\x02" +
		"\xCA\xC9\x03\x02\x02\x02\xCB\xCC\x03\x02\x02\x02\xCC\xCA\x03\x02\x02\x02" +
		"\xCC\xCD\x03\x02\x02\x02\xCD\x1F\x03\x02\x02\x02\xCE\xD0\x07\x10\x02\x02" +
		"\xCF\xCE\x03\x02\x02\x02\xCF\xD0\x03\x02\x02\x02\xD0\xD1\x03\x02\x02\x02" +
		"\xD1\xD2\x07\x11\x02\x02\xD2!\x03\x02\x02\x02\x1F%,08>BJPV\\bfntx\x80" +
		"\x86\x8A\x92\x98\x9C\xA4\xAB\xAD\xB3\xB7\xBB\xCC\xCF";
	public static __ATN: ATN;
	public static get _ATN(): ATN {
		if (!storyParser.__ATN) {
			storyParser.__ATN = new ATNDeserializer().deserialize(Utils.toCharArray(storyParser._serializedATN));
		}

		return storyParser.__ATN;
	}

}

export class ModelContext extends ParserRuleContext {
	public feature(): FeatureContext {
		return this.getRuleContext(0, FeatureContext);
	}
	public emptyLine(): EmptyLineContext[];
	public emptyLine(i: number): EmptyLineContext;
	public emptyLine(i?: number): EmptyLineContext | EmptyLineContext[] {
		if (i === undefined) {
			return this.getRuleContexts(EmptyLineContext);
		} else {
			return this.getRuleContext(i, EmptyLineContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return storyParser.RULE_model; }
	// @Override
	public enterRule(listener: storyListener): void {
		if (listener.enterModel) {
			listener.enterModel(this);
		}
	}
	// @Override
	public exitRule(listener: storyListener): void {
		if (listener.exitModel) {
			listener.exitModel(this);
		}
	}
	// @Override
	public accept<Result>(visitor: storyVisitor<Result>): Result {
		if (visitor.visitModel) {
			return visitor.visitModel(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class FeatureContext extends ParserRuleContext {
	public WS(): TerminalNode[];
	public WS(i: number): TerminalNode;
	public WS(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(storyParser.WS);
		} else {
			return this.getToken(storyParser.WS, i);
		}
	}
	public sectionName(): SectionNameContext {
		return this.getRuleContext(0, SectionNameContext);
	}
	public emptyLine(): EmptyLineContext[];
	public emptyLine(i: number): EmptyLineContext;
	public emptyLine(i?: number): EmptyLineContext | EmptyLineContext[] {
		if (i === undefined) {
			return this.getRuleContexts(EmptyLineContext);
		} else {
			return this.getRuleContext(i, EmptyLineContext);
		}
	}
	public scenario(): ScenarioContext[];
	public scenario(i: number): ScenarioContext;
	public scenario(i?: number): ScenarioContext | ScenarioContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ScenarioContext);
		} else {
			return this.getRuleContext(i, ScenarioContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return storyParser.RULE_feature; }
	// @Override
	public enterRule(listener: storyListener): void {
		if (listener.enterFeature) {
			listener.enterFeature(this);
		}
	}
	// @Override
	public exitRule(listener: storyListener): void {
		if (listener.exitFeature) {
			listener.exitFeature(this);
		}
	}
	// @Override
	public accept<Result>(visitor: storyVisitor<Result>): Result {
		if (visitor.visitFeature) {
			return visitor.visitFeature(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ScenarioContext extends ParserRuleContext {
	public WS(): TerminalNode[];
	public WS(i: number): TerminalNode;
	public WS(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(storyParser.WS);
		} else {
			return this.getToken(storyParser.WS, i);
		}
	}
	public sectionName(): SectionNameContext {
		return this.getRuleContext(0, SectionNameContext);
	}
	public emptyLine(): EmptyLineContext[];
	public emptyLine(i: number): EmptyLineContext;
	public emptyLine(i?: number): EmptyLineContext | EmptyLineContext[] {
		if (i === undefined) {
			return this.getRuleContexts(EmptyLineContext);
		} else {
			return this.getRuleContext(i, EmptyLineContext);
		}
	}
	public given(): GivenContext[];
	public given(i: number): GivenContext;
	public given(i?: number): GivenContext | GivenContext[] {
		if (i === undefined) {
			return this.getRuleContexts(GivenContext);
		} else {
			return this.getRuleContext(i, GivenContext);
		}
	}
	public when(): WhenContext[];
	public when(i: number): WhenContext;
	public when(i?: number): WhenContext | WhenContext[] {
		if (i === undefined) {
			return this.getRuleContexts(WhenContext);
		} else {
			return this.getRuleContext(i, WhenContext);
		}
	}
	public then(): ThenContext[];
	public then(i: number): ThenContext;
	public then(i?: number): ThenContext | ThenContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ThenContext);
		} else {
			return this.getRuleContext(i, ThenContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return storyParser.RULE_scenario; }
	// @Override
	public enterRule(listener: storyListener): void {
		if (listener.enterScenario) {
			listener.enterScenario(this);
		}
	}
	// @Override
	public exitRule(listener: storyListener): void {
		if (listener.exitScenario) {
			listener.exitScenario(this);
		}
	}
	// @Override
	public accept<Result>(visitor: storyVisitor<Result>): Result {
		if (visitor.visitScenario) {
			return visitor.visitScenario(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class SectionNameContext extends ParserRuleContext {
	public EOL(): TerminalNode[];
	public EOL(i: number): TerminalNode;
	public EOL(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(storyParser.EOL);
		} else {
			return this.getToken(storyParser.EOL, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return storyParser.RULE_sectionName; }
	// @Override
	public enterRule(listener: storyListener): void {
		if (listener.enterSectionName) {
			listener.enterSectionName(this);
		}
	}
	// @Override
	public exitRule(listener: storyListener): void {
		if (listener.exitSectionName) {
			listener.exitSectionName(this);
		}
	}
	// @Override
	public accept<Result>(visitor: storyVisitor<Result>): Result {
		if (visitor.visitSectionName) {
			return visitor.visitSectionName(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class GivenContext extends ParserRuleContext {
	public WS(): TerminalNode[];
	public WS(i: number): TerminalNode;
	public WS(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(storyParser.WS);
		} else {
			return this.getToken(storyParser.WS, i);
		}
	}
	public expression(): ExpressionContext {
		return this.getRuleContext(0, ExpressionContext);
	}
	public emptyLine(): EmptyLineContext[];
	public emptyLine(i: number): EmptyLineContext;
	public emptyLine(i?: number): EmptyLineContext | EmptyLineContext[] {
		if (i === undefined) {
			return this.getRuleContexts(EmptyLineContext);
		} else {
			return this.getRuleContext(i, EmptyLineContext);
		}
	}
	public and(): AndContext[];
	public and(i: number): AndContext;
	public and(i?: number): AndContext | AndContext[] {
		if (i === undefined) {
			return this.getRuleContexts(AndContext);
		} else {
			return this.getRuleContext(i, AndContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return storyParser.RULE_given; }
	// @Override
	public enterRule(listener: storyListener): void {
		if (listener.enterGiven) {
			listener.enterGiven(this);
		}
	}
	// @Override
	public exitRule(listener: storyListener): void {
		if (listener.exitGiven) {
			listener.exitGiven(this);
		}
	}
	// @Override
	public accept<Result>(visitor: storyVisitor<Result>): Result {
		if (visitor.visitGiven) {
			return visitor.visitGiven(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class WhenContext extends ParserRuleContext {
	public WS(): TerminalNode[];
	public WS(i: number): TerminalNode;
	public WS(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(storyParser.WS);
		} else {
			return this.getToken(storyParser.WS, i);
		}
	}
	public expression(): ExpressionContext {
		return this.getRuleContext(0, ExpressionContext);
	}
	public emptyLine(): EmptyLineContext[];
	public emptyLine(i: number): EmptyLineContext;
	public emptyLine(i?: number): EmptyLineContext | EmptyLineContext[] {
		if (i === undefined) {
			return this.getRuleContexts(EmptyLineContext);
		} else {
			return this.getRuleContext(i, EmptyLineContext);
		}
	}
	public and(): AndContext[];
	public and(i: number): AndContext;
	public and(i?: number): AndContext | AndContext[] {
		if (i === undefined) {
			return this.getRuleContexts(AndContext);
		} else {
			return this.getRuleContext(i, AndContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return storyParser.RULE_when; }
	// @Override
	public enterRule(listener: storyListener): void {
		if (listener.enterWhen) {
			listener.enterWhen(this);
		}
	}
	// @Override
	public exitRule(listener: storyListener): void {
		if (listener.exitWhen) {
			listener.exitWhen(this);
		}
	}
	// @Override
	public accept<Result>(visitor: storyVisitor<Result>): Result {
		if (visitor.visitWhen) {
			return visitor.visitWhen(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ThenContext extends ParserRuleContext {
	public WS(): TerminalNode[];
	public WS(i: number): TerminalNode;
	public WS(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(storyParser.WS);
		} else {
			return this.getToken(storyParser.WS, i);
		}
	}
	public expression(): ExpressionContext {
		return this.getRuleContext(0, ExpressionContext);
	}
	public emptyLine(): EmptyLineContext[];
	public emptyLine(i: number): EmptyLineContext;
	public emptyLine(i?: number): EmptyLineContext | EmptyLineContext[] {
		if (i === undefined) {
			return this.getRuleContexts(EmptyLineContext);
		} else {
			return this.getRuleContext(i, EmptyLineContext);
		}
	}
	public and(): AndContext[];
	public and(i: number): AndContext;
	public and(i?: number): AndContext | AndContext[] {
		if (i === undefined) {
			return this.getRuleContexts(AndContext);
		} else {
			return this.getRuleContext(i, AndContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return storyParser.RULE_then; }
	// @Override
	public enterRule(listener: storyListener): void {
		if (listener.enterThen) {
			listener.enterThen(this);
		}
	}
	// @Override
	public exitRule(listener: storyListener): void {
		if (listener.exitThen) {
			listener.exitThen(this);
		}
	}
	// @Override
	public accept<Result>(visitor: storyVisitor<Result>): Result {
		if (visitor.visitThen) {
			return visitor.visitThen(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class AndContext extends ParserRuleContext {
	public WS(): TerminalNode[];
	public WS(i: number): TerminalNode;
	public WS(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(storyParser.WS);
		} else {
			return this.getToken(storyParser.WS, i);
		}
	}
	public expression(): ExpressionContext {
		return this.getRuleContext(0, ExpressionContext);
	}
	public emptyLine(): EmptyLineContext[];
	public emptyLine(i: number): EmptyLineContext;
	public emptyLine(i?: number): EmptyLineContext | EmptyLineContext[] {
		if (i === undefined) {
			return this.getRuleContexts(EmptyLineContext);
		} else {
			return this.getRuleContext(i, EmptyLineContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return storyParser.RULE_and; }
	// @Override
	public enterRule(listener: storyListener): void {
		if (listener.enterAnd) {
			listener.enterAnd(this);
		}
	}
	// @Override
	public exitRule(listener: storyListener): void {
		if (listener.exitAnd) {
			listener.exitAnd(this);
		}
	}
	// @Override
	public accept<Result>(visitor: storyVisitor<Result>): Result {
		if (visitor.visitAnd) {
			return visitor.visitAnd(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ExpressionContext extends ParserRuleContext {
	public expressionText(): ExpressionTextContext[];
	public expressionText(i: number): ExpressionTextContext;
	public expressionText(i?: number): ExpressionTextContext | ExpressionTextContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ExpressionTextContext);
		} else {
			return this.getRuleContext(i, ExpressionTextContext);
		}
	}
	public variableRef(): VariableRefContext[];
	public variableRef(i: number): VariableRefContext;
	public variableRef(i?: number): VariableRefContext | VariableRefContext[] {
		if (i === undefined) {
			return this.getRuleContexts(VariableRefContext);
		} else {
			return this.getRuleContext(i, VariableRefContext);
		}
	}
	public staticValueSingle(): StaticValueSingleContext[];
	public staticValueSingle(i: number): StaticValueSingleContext;
	public staticValueSingle(i?: number): StaticValueSingleContext | StaticValueSingleContext[] {
		if (i === undefined) {
			return this.getRuleContexts(StaticValueSingleContext);
		} else {
			return this.getRuleContext(i, StaticValueSingleContext);
		}
	}
	public staticValueDouble(): StaticValueDoubleContext[];
	public staticValueDouble(i: number): StaticValueDoubleContext;
	public staticValueDouble(i?: number): StaticValueDoubleContext | StaticValueDoubleContext[] {
		if (i === undefined) {
			return this.getRuleContexts(StaticValueDoubleContext);
		} else {
			return this.getRuleContext(i, StaticValueDoubleContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return storyParser.RULE_expression; }
	// @Override
	public enterRule(listener: storyListener): void {
		if (listener.enterExpression) {
			listener.enterExpression(this);
		}
	}
	// @Override
	public exitRule(listener: storyListener): void {
		if (listener.exitExpression) {
			listener.exitExpression(this);
		}
	}
	// @Override
	public accept<Result>(visitor: storyVisitor<Result>): Result {
		if (visitor.visitExpression) {
			return visitor.visitExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ExpressionTextContext extends ParserRuleContext {
	public EOL(): TerminalNode[];
	public EOL(i: number): TerminalNode;
	public EOL(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(storyParser.EOL);
		} else {
			return this.getToken(storyParser.EOL, i);
		}
	}
	public SINGLE_QUOTE(): TerminalNode[];
	public SINGLE_QUOTE(i: number): TerminalNode;
	public SINGLE_QUOTE(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(storyParser.SINGLE_QUOTE);
		} else {
			return this.getToken(storyParser.SINGLE_QUOTE, i);
		}
	}
	public DOUBLE_QUOTE(): TerminalNode[];
	public DOUBLE_QUOTE(i: number): TerminalNode;
	public DOUBLE_QUOTE(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(storyParser.DOUBLE_QUOTE);
		} else {
			return this.getToken(storyParser.DOUBLE_QUOTE, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return storyParser.RULE_expressionText; }
	// @Override
	public enterRule(listener: storyListener): void {
		if (listener.enterExpressionText) {
			listener.enterExpressionText(this);
		}
	}
	// @Override
	public exitRule(listener: storyListener): void {
		if (listener.exitExpressionText) {
			listener.exitExpressionText(this);
		}
	}
	// @Override
	public accept<Result>(visitor: storyVisitor<Result>): Result {
		if (visitor.visitExpressionText) {
			return visitor.visitExpressionText(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class VariableRefContext extends ParserRuleContext {
	public variableName(): VariableNameContext {
		return this.getRuleContext(0, VariableNameContext);
	}
	public WS(): TerminalNode[];
	public WS(i: number): TerminalNode;
	public WS(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(storyParser.WS);
		} else {
			return this.getToken(storyParser.WS, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return storyParser.RULE_variableRef; }
	// @Override
	public enterRule(listener: storyListener): void {
		if (listener.enterVariableRef) {
			listener.enterVariableRef(this);
		}
	}
	// @Override
	public exitRule(listener: storyListener): void {
		if (listener.exitVariableRef) {
			listener.exitVariableRef(this);
		}
	}
	// @Override
	public accept<Result>(visitor: storyVisitor<Result>): Result {
		if (visitor.visitVariableRef) {
			return visitor.visitVariableRef(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class VariableNameContext extends ParserRuleContext {
	public VARIABLE_NAME(): TerminalNode { return this.getToken(storyParser.VARIABLE_NAME, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return storyParser.RULE_variableName; }
	// @Override
	public enterRule(listener: storyListener): void {
		if (listener.enterVariableName) {
			listener.enterVariableName(this);
		}
	}
	// @Override
	public exitRule(listener: storyListener): void {
		if (listener.exitVariableName) {
			listener.exitVariableName(this);
		}
	}
	// @Override
	public accept<Result>(visitor: storyVisitor<Result>): Result {
		if (visitor.visitVariableName) {
			return visitor.visitVariableName(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class StaticValueSingleContext extends ParserRuleContext {
	public SINGLE_QUOTE(): TerminalNode[];
	public SINGLE_QUOTE(i: number): TerminalNode;
	public SINGLE_QUOTE(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(storyParser.SINGLE_QUOTE);
		} else {
			return this.getToken(storyParser.SINGLE_QUOTE, i);
		}
	}
	public staticValue(): StaticValueContext {
		return this.getRuleContext(0, StaticValueContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return storyParser.RULE_staticValueSingle; }
	// @Override
	public enterRule(listener: storyListener): void {
		if (listener.enterStaticValueSingle) {
			listener.enterStaticValueSingle(this);
		}
	}
	// @Override
	public exitRule(listener: storyListener): void {
		if (listener.exitStaticValueSingle) {
			listener.exitStaticValueSingle(this);
		}
	}
	// @Override
	public accept<Result>(visitor: storyVisitor<Result>): Result {
		if (visitor.visitStaticValueSingle) {
			return visitor.visitStaticValueSingle(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class StaticValueDoubleContext extends ParserRuleContext {
	public DOUBLE_QUOTE(): TerminalNode[];
	public DOUBLE_QUOTE(i: number): TerminalNode;
	public DOUBLE_QUOTE(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(storyParser.DOUBLE_QUOTE);
		} else {
			return this.getToken(storyParser.DOUBLE_QUOTE, i);
		}
	}
	public staticValue(): StaticValueContext {
		return this.getRuleContext(0, StaticValueContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return storyParser.RULE_staticValueDouble; }
	// @Override
	public enterRule(listener: storyListener): void {
		if (listener.enterStaticValueDouble) {
			listener.enterStaticValueDouble(this);
		}
	}
	// @Override
	public exitRule(listener: storyListener): void {
		if (listener.exitStaticValueDouble) {
			listener.exitStaticValueDouble(this);
		}
	}
	// @Override
	public accept<Result>(visitor: storyVisitor<Result>): Result {
		if (visitor.visitStaticValueDouble) {
			return visitor.visitStaticValueDouble(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class StaticValueContext extends ParserRuleContext {
	public SINGLE_QUOTE(): TerminalNode[];
	public SINGLE_QUOTE(i: number): TerminalNode;
	public SINGLE_QUOTE(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(storyParser.SINGLE_QUOTE);
		} else {
			return this.getToken(storyParser.SINGLE_QUOTE, i);
		}
	}
	public DOUBLE_QUOTE(): TerminalNode[];
	public DOUBLE_QUOTE(i: number): TerminalNode;
	public DOUBLE_QUOTE(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(storyParser.DOUBLE_QUOTE);
		} else {
			return this.getToken(storyParser.DOUBLE_QUOTE, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return storyParser.RULE_staticValue; }
	// @Override
	public enterRule(listener: storyListener): void {
		if (listener.enterStaticValue) {
			listener.enterStaticValue(this);
		}
	}
	// @Override
	public exitRule(listener: storyListener): void {
		if (listener.exitStaticValue) {
			listener.exitStaticValue(this);
		}
	}
	// @Override
	public accept<Result>(visitor: storyVisitor<Result>): Result {
		if (visitor.visitStaticValue) {
			return visitor.visitStaticValue(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class EmptyLineContext extends ParserRuleContext {
	public EOL(): TerminalNode { return this.getToken(storyParser.EOL, 0); }
	public WS(): TerminalNode | undefined { return this.tryGetToken(storyParser.WS, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return storyParser.RULE_emptyLine; }
	// @Override
	public enterRule(listener: storyListener): void {
		if (listener.enterEmptyLine) {
			listener.enterEmptyLine(this);
		}
	}
	// @Override
	public exitRule(listener: storyListener): void {
		if (listener.exitEmptyLine) {
			listener.exitEmptyLine(this);
		}
	}
	// @Override
	public accept<Result>(visitor: storyVisitor<Result>): Result {
		if (visitor.visitEmptyLine) {
			return visitor.visitEmptyLine(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


