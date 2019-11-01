import { Location, Position, Range, Uri } from "vscode";
import { ExpressionContext } from "../parser/RulesParser";
import { MainRuleType } from "../../../../shared/common.model";

 

export class RuleDefinition {
    expression: string;
    description: string;
    snippet: string;
    autoExpandVariable: boolean;
    location: Location;
    
    constructor(
        public uri: Uri,
        public ctx: ExpressionContext,
        public kind: MainRuleType,
        expression: string,
        description: string
    ){
        this.expression = RuleDefinition.createExpresionMask(expression);
        this.description = RuleDefinition.createDescription(description, expression);
        this.snippet = RuleDefinition.createSnippet(expression);
        this.autoExpandVariable = RuleDefinition.firstParamIsVariableRef(this.snippet);
        this.location = RuleDefinition.createLocation(uri, ctx);
    }

    static createExpresionMask(expression: string): string {
        return expression
            .replace(/<.*>/g, '<variable>')
            .replace(/\".*\"/g, '"value"');
    }

    static createDescription(description: string, expression: string): string {
        if (description && description.trim()){
            return description;
        }
        return `## No description ##\r\n\r\n ${expression}`;
    }

    static createSnippet(expression: string): string {
        
        let snippedParamNumber = 1;
        const parts = expression
            .replace(/<.*>/g, '<|>')
            .replace(/\".*\"/g, '"|"')
            .split(/\|/g);
        
        let snippet = '';
        while(parts.length){
            snippet += parts.shift();
            if (parts.length){
                snippet += `$${snippedParamNumber++}`;
            }
        }
        return snippet;
    }

    static firstParamIsVariableRef(snippetText: string) {
        return snippetText.indexOf('<$1') !== -1;
    }

    static createLocation(uri: Uri, ctx: ExpressionContext): Location{
        const line = ctx.start.line - 1;
        const startIndex = ctx.start.charPositionInLine;
        const endIndex = startIndex + ctx.text.length;

        return new Location(uri, new Range(new Position(line, startIndex), new Position(line, endIndex)));
    }
} 