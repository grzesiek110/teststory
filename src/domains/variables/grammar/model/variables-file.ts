import { Uri } from "vscode";
import { ModelContext } from "../parser/VariablesParser";
import { VariableDefinition } from "./variable-definition";

export class VariablesFile {
    definitions: VariableDefinition[] = [];
    
    constructor(
        public uri: Uri,
        public ctx: ModelContext){}

    addDefinition(definition: VariableDefinition){
        this.definitions.push(definition);
    }

    getDefinitions(){
        return this.definitions;
        //return this.definitions.filter(rule => rule.variableType === type);
    }
}

