import { Location, Position, Range, Uri } from "vscode";
import { ExpressionContext } from "../parser/RulesParser";
import { MainRuleType } from "../../../../shared/common.model";
import { createLocation } from "../../../../shared/antlr-vsc.utils";

 

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
        this.location = createLocation(uri, ctx);
    }

    static createExpresionMask(expression: string): string {
        return expression
            .replace(/<[^>]*>/g, '<variable>')
            .replace(/\"[^\"]*\"/g, '"value"');
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
            .replace(/<[^>]*>/g, '<|>')
            .replace(/\"[^\"]*\"/g, '"|"')
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


} 