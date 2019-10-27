import { StoryLineElement, StructureElementType } from './story';
import { ExpressionContext } from '../../parser/StoryParser';
import { StoryRule } from './story-rule';

type ExpressionRefType = 'REFERENCE' | 'VALUE';

interface ExpressionRef {
    value: string;
    type: ExpressionRefType;
}

export class StoryExpression implements StoryLineElement {
    rule: StoryRule;
    mask = "";
    proposal = "";
    referenceNames: ExpressionRef[] = [];
    
    constructor(public ctx: Readonly<ExpressionContext>){}

    getContext(): ExpressionContext {
        return this.ctx;
    }

    getType(): StructureElementType {
        return 'EXPRESSION';
    }

    getLine(){
        return this.ctx.start.line;
    }

    debugString(){
        return this.mask;
    }

    setRule(rule: StoryRule) {
        this.rule = rule;   
    }

    getRule(): Readonly<StoryRule>{
        return this.rule;
    }

    addNamePart(partName: string){
        this.mask += partName;
        this.proposal += partName;
    }

    addVariableRef(variableName: string){
        const paramNumber = this.referenceNames.length + 1;
        const proposalMask = '${'+paramNumber+'|variable}';

        this.mask += '<variable>';
        this.proposal += proposalMask;
        this.referenceNames.push({
            value: variableName,
            type: 'REFERENCE'
        });
    }

    addConstant(value: string){ 
        const paramNumber = this.referenceNames.length + 1;
        const proposalMask = '${'+paramNumber+'|value}';

        this.mask += '"value"';
        this.proposal += proposalMask;        
        this.referenceNames.push({
            value: value,
            type: 'VALUE'
        });
    }

    isStoryElement(): boolean {
        return true;
    }

}

