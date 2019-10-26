
type ExpressionType = 'GIVEN' | 'WHEN' | 'THEN'; 

export interface RuleExpression {
    kind: ExpressionType;
    mask: string;
    description: string;
} 

export class RuleDefinition implements RuleExpression{
    kind: ExpressionType;
    mask: string;
    snippet: string;
    description: string;
    
    constructor(rule: RuleExpression){
        this.kind = rule.kind;
        this.mask = rule.mask;
        this.snippet = RuleDefinition.createSnippet(rule.mask);
        this.description = rule.description;
    }

    private static createSnippet(mask: string): string {
        let snippet = '';

        let index = 1;
        let position = 0;
        while (position >= 0){
            const refIndex = mask.indexOf('<', position);
            const constIndex = mask.indexOf('"', position);
            
            if (refIndex >= 0 && (refIndex < constIndex || constIndex === -1)){

                const part = mask.substring(position, refIndex);
                snippet += `${part}<$${index++}>`;

                position = mask.indexOf('>', refIndex + 1) + 1;
            } 

            if (constIndex >= 0 && (constIndex < refIndex || refIndex === -1)){

                const part = mask.substring(position, constIndex);
                snippet += `${part}"$${index++}"`;

                position = mask.indexOf('"', constIndex + 1) + 1 ;
            }   
            
            if (refIndex < 0 && constIndex < 0){
                position = -1;
            }
        }

        return snippet;
    }
} 


export class ExpressionsService {
    rules: RuleDefinition[] = [];

    constructor(){
        this.rules = this.readRulesFromFile().map(rule => new RuleDefinition(rule));
    }

    readRulesFromFile(): RuleExpression[] {
        return [
            { 
                kind: 'GIVEN', 
                mask: 'Open webpage "value"', 
                description: 'Open webpage in browser and wait for page refresh' 
            },
            { 
                kind: 'GIVEN', 
                mask: 'Wait for "value" seconds',
                description: 'Wait for number of seconds. Minimum is 1 second, maximum is 59 seconds'
            },
            { 
                kind: 'WHEN', 
                mask: 'I want click on element <variable>',
                description: 'Try to find elemement on page and click on it' 
            },
            { 
                kind: 'WHEN', 
                mask: 'I want click on table cell <table>',
                description: 'Try to find table cell and click on it. You need to select table row and column <table:column:row>' 
            },
            { 
                kind: 'THEN', 
                mask: '<variable> text should equal "value"',
                description: 'Text value in selected element should be equal to some value'
            }
        ];
    }

    getAvailableRules(): RuleDefinition[]{
        return this.rules;
    }

    getRulesForText(partialName: string){
        return this.getAvailableRules().filter(rule => rule.mask.startsWith(partialName));
    }

    isValid(kind: string, mask: string){
        return this.getAvailableRules()
            .filter(rule => rule.kind === kind)
            .map(rule => rule.mask)
            .includes(mask);
    }
}