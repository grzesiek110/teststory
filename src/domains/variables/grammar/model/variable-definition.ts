import { Location, Position, Range, Uri } from "vscode";
import { VariableLineContext } from "../parser/VariablesParser";

 
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
        this.location = VariableDefinition.createLocation(uri, ctx);
    }

    static createDescription(description: string, name: string, type: string): string {
        if (description && description.trim()){
            return description;
        }
        return `## No description ##\r\n\r\n${name}`+( type ? type : '');
    }

    static createLocation(uri: Uri, ctx: VariableLineContext): Location{
        const line = ctx.start.line - 1;
        const startIndex = ctx.start.charPositionInLine;
        const endIndex = startIndex + ctx.text.length;

        return new Location(uri, new Range(new Position(line, startIndex), new Position(line, endIndex)));
    }
} 