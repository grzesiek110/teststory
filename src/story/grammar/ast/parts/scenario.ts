
import { StorySection, StructureElement, StructureElementType } from '../model';
import { ScenarioContext } from '../../parser/StoryParser';


export class StoryScenario implements StorySection, StructureElement {
    name: string;

    constructor(private ctx: ScenarioContext){}

    getType(): StructureElementType {
        return 'SCENARIO';
    }

    getLine(): number {
        return this.ctx.start.line;
    }

    debugString(): string {
        return `Scenario: ${this.name}`;
    }

    setSectionName(name: string): void {
        this.name = name;
    }
  
}