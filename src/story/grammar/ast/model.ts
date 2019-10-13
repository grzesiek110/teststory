
export type StructureElementType = 
    'FEATURE' | 
    'SCENARIO' |
    'SCENARIO_OUTLINE' |
    'RULE' |
    'EXPRESSION' |
    'EXAMPLES' |
    'EXAMPLES_LINE';

export interface StructureElement {
    getType(): StructureElementType;
    getLine(): number;
    debugString(): string;
}

export interface StoryModelStructure {
    [key: number]: StructureElement;
}

export interface StorySection {
    setSectionName(name: string): void;
}

export class StoryModel {
    structure: StoryModelStructure = {};
    
    addStructureElement(line: number, element: StructureElement){
        this.structure[line] = element;
    }

    isEmpty() {
        return Object.keys(this.structure).length === 0;
    }

    getUsedLines() {
        return Object.keys(this.structure)
                     .sort((a, b) => Number(a) - Number(b))
                     .map(key => Number(key));
    }

    getElement(line: number): StructureElement | undefined {
        return this.structure[line];
    }

    getNearestElementAbove(line: number): StructureElement | undefined {
        if (this.isEmpty()){
            return undefined;
        }

        const usedLines = this.getUsedLines();        
        let current = usedLines[0];
        for (let i = 1; i < usedLines.length; i++){
            if (usedLines[i] > line){
                break;
            }
            current = usedLines[i];
        }
        return this.structure[current];
    }

    debugString(){
        let debugTree = 'DebugTree:\r\n';
        const sortedKeys = this.getUsedLines();
        sortedKeys.forEach(line => {
            const item = this.structure[Number(line)];
            debugTree += ` - [${line}] ${item.debugString()}\r\n`;
        });
        return debugTree;
    }    

}




