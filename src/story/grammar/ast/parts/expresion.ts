import { StructureElement, StructureElementType } from '../model';
import { ExpressionContext } from '../../parser/StoryParser';

type ExpressionRefType = 'REFERENCE' | 'VALUE';

interface ExpressionRef {
    value: string;
    type: ExpressionRefType;
}

export class StoryExpression implements StructureElement {
    cucumberMask = "";
    proposalText = "";
    referenceNames: ExpressionRef[] = [];
    
    constructor(public ctx: Readonly<ExpressionContext>){}
    
    getType(): StructureElementType {
        return 'EXPRESSION';
    }

    getLine(){
        return this.ctx.start.line;
    }

    debugString(){
        return this.cucumberMask;
    }

    addNamePart(partName: string){
        this.cucumberMask += partName;
        this.proposalText += partName;
    }

    addVariableRef(variableName: string){
        const paramNumber = this.referenceNames.length + 1;
        const proposalMask = '${'+paramNumber+'}';

        this.cucumberMask += '<\s+>';
        this.proposalText += proposalMask;
        this.referenceNames.push({
            value: variableName,
            type: 'REFERENCE'
        });
    }

    addConstant(value: string){ 
        const paramNumber = this.referenceNames.length + 1;
        const proposalMask = '${'+paramNumber+'}';

        this.cucumberMask += '"\s+"';
        this.proposalText += proposalMask;        
        this.referenceNames.push({
            value: value,
            type: 'VALUE'
        });
    }

    isStoryElement(): boolean {
        return true;
    }

}

