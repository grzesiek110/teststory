
export interface Rule {
    mask: string;
} 

export class RulesService {

    getAvailableRules(): Rule[]{
        return [
            { mask: 'I want click on element {element}' },
            { mask: 'I want click on table row {tableRow}' },
            { mask: 'I want click on table cell {tableCell}' },
            { mask: 'I want wait {number} seconds' },
            { mask: 'Go to page {url}' },
            { mask: 'I want wait for popup {element}' },
        ];
    }

    getRulesForText(partialName: string){
        return this.getAvailableRules().filter(rule => rule.mask.startsWith(partialName));
    }
}