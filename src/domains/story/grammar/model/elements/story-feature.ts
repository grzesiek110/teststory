import { StorySection, StoryLineElement, StructureElementType } from './story';
import { FeatureContext } from '../../parser/StoryParser';

export class StoryFeature implements StorySection, StoryLineElement {
    name: string;
    
    constructor(public ctx: Readonly<FeatureContext>){}
    
    getType(): StructureElementType {
        return 'FEATURE';
    }

    getLine(){
        return this.ctx.start.line;
    }

    debugString(){
        return `Feature: ${this.name}`;
    }

    setSectionName(name: string): void {
        this.name = name;
    }

    isStoryElement(): boolean {
        return true;
    }


}