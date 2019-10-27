
import { StorySection, StoryLineElement, StructureElementType } from './story';
import { ScenarioOutlineContext } from '../../parser/StoryParser';
import { StoryRule } from './story-rule';


export class StoryScenarioOutline implements StorySection, StoryLineElement {
    private name: string;
    private endLine: number;
    private rules: StoryRule[] = [];

    constructor(public ctx: ScenarioOutlineContext){}

    getContext(): ScenarioOutlineContext {
        return this.ctx;
    }

    getType(): StructureElementType {
        return 'SCENARIO OUTLINE';
    }

    getLine(): number {
        return this.ctx.start.line;
    }

    debugString(): string {
        return `Scenario Outline: ${this.name} lines [${this.getLine()}-${this.getEndLine()}]`;
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