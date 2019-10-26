
import { StorySection, StoryLineElement, StructureElementType } from './story';
import { ScenarioContext } from '../../parser/StoryParser';
import { StoryRule } from './story-rule';


export class StoryScenario implements StorySection, StoryLineElement {
    private name: string;
    private endLine: number;
    private rules: StoryRule[] = [];

    constructor(public ctx: ScenarioContext){}

    getType(): StructureElementType {
        return 'SCENARIO';
    }

    getLine(): number {
        return this.ctx.start.line;
    }

    debugString(): string {
        return `Scenario: ${this.name} lines [${this.getLine()}-${this.getEndLine()}]`;
    }

    setSectionName(name: string): void {
        this.name = name;
    }

    isStoryElement(): boolean {
        return true;
    }
    
    setEndLine(endLine: number){
        this.endLine = endLine;
    }

    getEndLine(){
        return this.endLine;
    }

    addRule(rule: StoryRule){
        this.rules.push(rule);
    }

    getRules(): Readonly<StoryRule[]> {
        return this.rules;
    }
}