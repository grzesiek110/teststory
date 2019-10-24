import { StoryExpression } from "../domains/story/grammar/model";

export type VariableType = 'VALUE' | 'ELEMENT' | 'TABLE'; 

export interface VariableDefinition {
    name: string;
    type: VariableType;
} 

export class VariablesService {

    getAvailableVariables(): VariableDefinition[]{
        return [
            { name: 'customerName', type: 'VALUE' },
            { name: 'cif', type: 'VALUE' },
            { name: 'customerNameInput', type: 'ELEMENT' },
            { name: 'customerIBANInput', type: 'ELEMENT' },
            { name: 'customerAccounts', type: 'TABLE' },
        ];
    }

    isValid(variableName: string, expression: StoryExpression, index: number){
        return this.getAvailableVariables()
            .map(variable => variable.name)
            .includes(variableName);
    }
}