import { UnknownLineContext } from '../../parser/StoryParser';
import { StructureElement, StructureElementType } from '../model';

export class StoryUnknown implements StructureElement {
    constructor(public ctx: Readonly<UnknownLineContext>){}
    
    getType(): StructureElementType {
        return 'UNKNOWN';
    }

    getLine(){
        return this.ctx.start.line;
    }

    debugString(){
        return `Unknown`;
    }

    isStoryElement(): boolean {
        return false;
    }

}