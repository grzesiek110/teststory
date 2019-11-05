import { Location, Position, Range, Uri } from "vscode";
import { VariableLineContext } from "../parser/VariablesParser";
import { createLocation } from "../../../../shared/antlr-vsc.utils";

 
export class VariableDefinition {
    description: string;
    snippet: string;
    location: Location;
    
    constructor(
        public uri: Uri,
        public ctx: VariableLineContext,
        public variableName: string,
        public variableType: string,
        description: string
    ){

        this.description = VariableDefinition.createDescription(description, variableName, variableType);
        this.location = createLocation(uri, ctx);
    }

    static createDescription(description: string, name: string, type: string): string {
        if (description && description.trim()){
            return description;
        }
        return `## No description ##\r\n\r\n${name}`+( type ? type : '');
    }

 
} 