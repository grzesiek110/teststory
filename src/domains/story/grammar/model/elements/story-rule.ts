import { ParserRuleContext } from 'antlr4ts';
import { AndContext, GivenContext, ThenContext, WhenContext } from '../../parser/StoryParser';
import { StoryLineElement, StructureElementType } from './story';
import { StoryExpression } from './story-expresion';
import { ExtendedRuleType } from '../../../../../shared/common.model';


export type RuleContext = 
    GivenContext | 
    WhenContext | 
    ThenContext | 
    AndContext;


export class StoryRule implements StoryLineElement{
    expression: StoryExpression;

    constructor(public kind: ExtendedRuleType, public ctx: Readonly<RuleContext>){}

    getContext(): RuleContext {
        return this.ctx;
    }

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