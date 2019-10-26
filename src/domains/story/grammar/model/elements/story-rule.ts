import { TerminalNode } from 'antlr4ts/tree';

import { StoryLineElement, StructureElementType } from './story';
import { StoryExpression } from './story-expresion';
import { GivenContext, WhenContext, ThenContext, AndContext, GivenKeywordContext, StoryParser } from '../../parser/StoryParser';
import { StoryLexer } from '../../parser/StoryLexer';
import { ParserRuleContext } from 'antlr4ts';

export type RuleContext = 
    GivenContext | 
    WhenContext | 
    ThenContext | 
    AndContext;

export type RuleType = 
    'GIVEN' | 
    'WHEN' | 
    'THEN' | 
    'AND';

export class StoryRule implements StoryLineElement{
    expression: StoryExpression;

    constructor(public kind: RuleType, public ctx: Readonly<RuleContext>){}

    getType(): StructureElementType {
        return 'RULE';
    }

    getLine(): number {
        return this.ctx.start.line;
    }

    debugString(): string {
        return `${this.kind} ${this.expression.debugString()}`;
    }                

    getKeywordToken(): ParserRuleContext {

        switch(this.kind){
            case 'GIVEN':
                return (<GivenContext>this.ctx).givenKeyword();

            case 'WHEN':
                return (<WhenContext>this.ctx).whenKeyword();

            case 'THEN':
                return (<ThenContext>this.ctx).thenKeyword();

            case 'AND':
                return (<AndContext>this.ctx).andKeyword();            
        }
    }

    setExpression(expression: StoryExpression){
        this.expression = expression;
        this.expression.setRule(this);
    }

    isStoryElement(): boolean {
        return true;
    }

}