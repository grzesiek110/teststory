
type ExpressionType = 'GIVEN' | 'WHEN' | 'THEN'; 

export interface RuleExpression {
    kind: ExpressionType;
    mask: string;
} 

export class ExpressionsService {

    getAvailableRules(): RuleExpression[]{
        return [
            { kind: 'GIVEN', mask: 'Open webpage "value"' },
            { kind: 'GIVEN', mask: 'Wait for "value" seconds' },
            { kind: 'WHEN', mask: 'I want click on element <variable>' },
            { kind: 'WHEN', mask: 'I want click on table row <table>' },
            { kind: 'WHEN', mask: 'I want click on table cell <table>' },
            { kind: 'THEN', mask: '<variable> text should equal "value"'},
            { kind: 'THEN', mask: 'Browser should load page "value"'}
        ];
    }

    getRulesForText(partialName: string){
        return this.getAvailableRules().filter(rule => rule.mask.startsWith(partialName));
    }

    isValid(kind: string, mask: string){
        console.log('check '+kind+' '+mask);
        return this.getAvailableRules()
            .filter(rule => rule.kind === kind)
            .map(rule => rule.mask)
            .includes(mask);
    }
}