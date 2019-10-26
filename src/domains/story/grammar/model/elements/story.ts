import { StoryFeature } from "./story-feature";
import { StoryScenario } from "./story-scenario";
import { StoryUnknown } from "./story-unknown";
import { StoryRule } from "./story-rule";
import { ModelContext } from "../../parser/StoryParser";


export type StructureElementType = 
    'FEATURE' | 
    'SCENARIO' |
    'RULE' |
    'EXPRESSION' |
    'EXAMPLES' |
    'EXAMPLES_LINE' | 
    'UNKNOWN';

export interface StructureElement {
    getType(): StructureElementType;
    getLine(): number;
    debugString(): string;
    isStoryElement(): boolean;
}

export type Direction =
   'ABOVE' | 'BELOW';

export interface StoryModelStructure {
    [key: number]: StructureElement;
}

export interface StorySection {
    setSectionName(name: string): void;
}

export class StoryModel {
    private ctx: ModelContext;
    private feature: StoryFeature;
    private scenarios: StoryScenario[] = [];
    private unknowns: StoryUnknown[] = [];
    private structure: StoryModelStructure = {};

    setContext(ctx: ModelContext) {
        this.ctx = ctx;
    }

    getContext(): Readonly<ModelContext> {
        return this.ctx;
    }

    setFeature(feature: StoryFeature){
        this.feature = feature;
        this.addStructureElement(feature.getLine(), feature);
    }

    getFeature(): Readonly<StoryFeature>{
        return this.feature;
    }

    addScenario(scenario: StoryScenario){
        this.scenarios.push(scenario);
        this.addStructureElement(scenario.getLine(), scenario);
    }

    getScenarios(): Readonly<StoryScenario[]>{
        return this.scenarios;
    }

    addRule(rule: StoryRule){
        this.addStructureElement(rule.getLine(), rule);

        const currentScenario = this.scenarios[this.scenarios.length - 1];
        if (currentScenario){
            currentScenario.addRule(rule);
        }
    }

    addUnknown(unknown: StoryUnknown){
        this.unknowns.push(unknown);
        this.addStructureElement(unknown.getLine(), unknown);
    }

    getUnknows(): Readonly<StoryUnknown[]>{
        return this.unknowns;
    }

    isEmpty(onlyStoryElements = true) {
        return Object.keys(this.structure)
                     .filter(key => onlyStoryElements ? this.isStoryElement(Number(key)) : true)
                     .length === 0;
    }

    getUsedLines(onlyStoryElements = true) {
        return Object.keys(this.structure)
                     .filter(key => onlyStoryElements ? this.isStoryElement(Number(key)) : true)
                     .sort((a, b) => Number(a) - Number(b))
                     .map(key => Number(key));
    }

    getElement(line: number): StructureElement | undefined {
        return this.structure[line];
    }

    getElements<T extends StructureElement>(startLine: number, endLine?: number, onlyStoryElements = true, type?: StructureElementType): T[] {
        const elements = this.getUsedLines(onlyStoryElements)
                 .filter(line => line >= startLine)
                 .filter(line => endLine ? line <= endLine : true)
                 .filter(line => type? this.isElementCorrectType(line, type) : true)
                 .map(line => this.getElement(line));
        return elements as T[];
    }

    getNearestElementAbove<T extends StructureElement>(queryLine: number, onlyStoryElements = true, type?: StructureElementType): T | undefined {
        return this.findElementByTypeAndDirection('ABOVE', onlyStoryElements, queryLine, type);
    }

    getNearestElementBelow<T extends StructureElement>(queryLine: number, onlyStoryElements = true, type?: StructureElementType): T | undefined {
        return this.findElementByTypeAndDirection('BELOW', onlyStoryElements, queryLine, type);
    }

    isStoryElement(line: number) {
        return this.structure[line].isStoryElement();
    }    

    isElementCorrectType(line: number, type: StructureElementType): unknown {
        return this.structure[line].getType() === type;
    }

    debugString(){
        let debugTree = 'DebugTree:\r\n';
        const sortedKeys = this.getUsedLines(false);
        sortedKeys.forEach(line => {
            const item = this.structure[Number(line)];
            debugTree += ` - [${line}] ${item.debugString()}\r\n`;
        });
        return debugTree;
    }    

    private addStructureElement(line: number, element: StructureElement){
        this.structure[line] = element;
    }

    private findElementByTypeAndDirection<T extends StructureElement>(direction: Direction, onlyStoryElements: boolean, queryLine: number, type?: StructureElementType){
        if (this.isEmpty()){
            return undefined;
        }

        let usedLines = this.getUsedLines(onlyStoryElements);
        if (direction === "ABOVE"){
            usedLines = usedLines.reverse();
        }

        const index = usedLines.findIndex(line => line === queryLine);

        for(let i = index + 1; i < usedLines.length; i++){
            const foundElement = this.getElement(usedLines[i]);
            if (type === undefined || foundElement.getType() === type){
                return foundElement as T;
            }
        }

        return undefined;
    }
}



