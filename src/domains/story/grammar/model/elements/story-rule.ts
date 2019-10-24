import { TerminalNode } from 'antlr4ts/tree';

import { StructureElement, StructureElementType } from './story';
import { StoryExpression } from './story-expresion';
import { GivenContext, WhenContext, ThenContext, AndContext } from '../../parser/StoryParser';
import { StoryLexer } from '../../parser/StoryLexer';

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

export class StoryRule implements StructureElement{
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

    getKeywordToken(): TerminalNode {
        switch(this.kind){
            case 'GIVEN':
                return this.ctx.getToken(StoryLexer.GIVEN, 0);

            case 'WHEN':
                return this.ctx.getToken(StoryLexer.WHEN, 0);

            case 'THEN':
                return this.ctx.getToken(StoryLexer.THEN, 0);

            case 'AND':
                return this.ctx.getToken(StoryLexer.AND, 0);            
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