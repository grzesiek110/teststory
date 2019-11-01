import { StoryExpression } from "../story/grammar/model";

export type VariableType = 'VALUE' | 'ELEMENT' | 'TABLE'; 

export interface VariableDefinition {
    name: string;
    description: string;
    type: VariableType;
} 

export class AvailableVariablesService {

    getAvailableVariables(): VariableDefinition[]{
        return [
            { 
                name: 'customerName', 
                description: 'Sample customer name',
                type: 'VALUE' 
            },
            { 
                name: 'customerNumber',
                description: 'Sample customer number', 
                type: 'VALUE' 
            },
            { 
                name: 'customerNameInput', 
                description: 'Page input element when we can set customer name',
                type: 'ELEMENT' 
            },
            { 
                name: 'customerIBANInput', 
                description: 'Page input element when we can set IBAN number',
                type: 'ELEMENT' 
            },
            { 
                name: 'customerAccounts', 
                description: 'Page table with customer acounts. Table containst columns: \'name\' and \'number\'',
                type: 'TABLE' 
            },
            { 
                name: 'accounts', 
                description: 'Page table with counts',
                type: 'TABLE' 
            },
        ];
    }

    isValid(variableName: string, expression: StoryExpression, index: number){
        return this.getAvailableVariables()
            .map(variable => variable.name)
            .includes(variableName);
    }
}