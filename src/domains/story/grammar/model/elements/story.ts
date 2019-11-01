import { Uri } from "vscode";

import { StoryFeature } from "./story-feature";
import { StoryScenario } from "./story-scenario";
import { StoryUnknown } from "./story-unknown";
import { StoryRule } from "./story-rule";
import { ModelContext, LineContext } from "../../parser/StoryParser";
import { ParserRuleContext } from "antlr4ts";
import { StoryScenarioOutline } from "./story-scenario-outline";
import { MainRuleType } from "../../../../../shared/common.model";



export type StructureElementType = 
    'FEATURE' | 
    'SCENARIO' |
    'SCENARIO OUTLINE' |
    'RULE' |
    'EXPRESSION' |
    'EXAMPLES' |
    'EXAMPLES_LINE' | 
    'UNKNOWN';

export interface StoryLineElement {
    getContext(): ParserRuleContext;
    getType(): StructureElementType;
    getLine(): number;
    debugString(): string;
    isStoryElement(): boolean;
}

export type Direction =
   'ABOVE' | 'BELOW';

export interface StoryModelStructure {
    [key: number]: StoryLineElement;
}

export interface StorySection {
    setSectionName(name: string): void;
}

export class StoryModel {
    private ctx: ModelContext;
    private feature: StoryFeature;
    private scenarios: StoryScenario[] = [];
    private scenariosOutline: StoryScenarioOutline[] = [];
    private unknowns: StoryUnknown[] = [];
    private structure: StoryModelStructure = {};

    constructor(public uri: Uri){}

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

    addScenarioOutline(scenario: StoryScenarioOutline){
        this.scenariosOutline.push(scenario);
        this.addStructureElement(scenario.getLine(), scenario);        
    }

    getScenarios(): Readonly<StoryScenario[]>{
        return this.scenarios;
    }

    addRule(rule: StoryRule){
        this.addStructureElement(rule.getLine(), rule);
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

    getElement(line: number): StoryLineElement | undefined {
        return this.structure[line];
    }

    getElements<T extends StoryLineElement>(startLine: number, endLine?: number, onlyStoryElements = true, type?: StructureElementType): T[] {
        const elements = this.getUsedLines(onlyStoryElements)
                 .filter(line => line >= startLine)
                 .filter(line => endLine ? line <= endLine : true)
                 .filter(line => type? this.isElementCorrectType(line, type) : true)
                 .map(line => this.getElement(line));
        return elements as T[];
    }

    getNearestElementAbove<T extends StoryLineElement>(queryLine: number, onlyStoryElements = true, type?: StructureElementType): T | undefined {
        return this.findElementByTypeAndDirection('ABOVE', onlyStoryElements, queryLine, type);
    }

    getNearestElementBelow<T extends StoryLineElement>(queryLine: number, onlyStoryElements = true, type?: StructureElementType): T | undefined {
        return this.findElementByTypeAndDirection('BELOW', onlyStoryElements, queryLine, type);
    }

    isStoryElement(line: number) {
        return this.structure[line].isStoryElement();
    }    

    isElementCorrectType(line: number, type: StructureElementType): unknown {
        return this.structure[line].getType() === type;
    }

    getNearestScopeElementAbove(line: number){
        const lines = this.getElements(0, line, true);
        while(lines.length){
            const line = lines.pop();
            if (this.isThisScopeLine(line)){
                return line;
            }
        }
        return undefined;        
    }

    isThisScopeLine(line: StoryLineElement) {
        const type = line.getType();

        return type === 'FEATURE' || 
               type === 'SCENARIO' ||
               type === 'SCENARIO OUTLINE' ||
               type === 'EXAMPLES' || 
               (type === 'RULE' && ((<StoryRule>line).kind === 'GIVEN' || (<StoryRule>line).kind === 'WHEN' || (<StoryRule>line).kind === 'THEN'));    
    }

    // getRuleKindScopeForLine(line: number): MainRuleType | undefined {
    //     const ruleLines = this.getElements<StoryRule>(0, line, true, 'RULE');
    //     while(ruleLines.length){
    //         const ruleLine = ruleLines.pop();
    //         if (ruleLine.kind === 'GIVEN' || ruleLine.kind === 'WHEN' || ruleLine.kind === 'THEN'){
    //             return ruleLine.kind;
    //         }
    //     }
    //     return undefined;
    // }

    debugString(){
        let debugTree = 'DebugTree:\r\n';
        const sortedKeys = this.getUsedLines(false);
        sortedKeys.forEach(line => {
            const item = this.structure[Number(line)];
            debugTree += ` - [${line}] ${item.debugString()}\r\n`;
        });
        return debugTree;
    }    

    private addStructureElement(line: number, element: StoryLineElement){
        this.structure[line] = element;
    }

    private findElementByTypeAndDirection<T extends StoryLineElement>(direction: Direction, onlyStoryElements: boolean, queryLine: number, type?: StructureElementType){
        if (this.isEmpty()){
            return undefined;
        }

        let usedLines = this.getUsedLines(onlyStoryElements);
        if (direction === "ABOVE"){
            usedLines = usedLines.reverse();
        }

        let nearestElementBelowIndex = this.getNearestExistingElementBelowOrEqual(usedLines, queryLine);

        for(let i = nearestElementBelowIndex + 1; i < usedLines.length; i++){
            const foundElement = this.getElement(usedLines[i]);
            if (type === undefined || foundElement.getType() === type){
                return foundElement as T;
            }
        }

        return undefined;
    }

    private getNearestExistingElementBelowOrEqual(usedLines: number[], queryLine: number){
        const index = usedLines.findIndex(line => line === queryLine);
        if (index !== -1){
            return index;
        }

        let nearestElementBelowIndex = 0;
        for(let i = 0; i < usedLines.length; i++){
            const foundElement = this.getElement(usedLines[i]);
            if (foundElement !== undefined && foundElement.getLine() > queryLine){
                nearestElementBelowIndex = i;
            }
        }
        return nearestElementBelowIndex;
    }
}



