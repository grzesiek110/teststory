import { RuleDefinition } from "../../grammar/model/rule-definition";
import { RulesFile } from '../../grammar/model/rules-file';
import { RulesLanguageSupport } from '../rules.language-support';
import { MainRuleType } from '../../../../shared/common.model';

import * as _ from 'lodash';


export interface AvailableRulesChangeListener{
    availableRulesChanged(): void;
}


export class AvailableRulesService {
    availableGivenRules: RuleDefinition[] = [];
    availableWhenRules: RuleDefinition[] = [];
    availableThenRules: RuleDefinition[] = [];

    listeners: AvailableRulesChangeListener[] = [];

    constructor(rulesLanguageSupport: RulesLanguageSupport){
        this.registerForRulesModelChange(rulesLanguageSupport);
    }

    getAvailableRules(type: MainRuleType): RuleDefinition[]{
        switch(type){
            case 'GIVEN':
                return this.availableGivenRules;
            case 'WHEN':
                return this.availableWhenRules;
            case 'THEN':
                return this.availableThenRules;
        }
    }

    isValid(type: MainRuleType, queryExpression: string){
        return this.getAvailableRules(type)
                   .map(rule => rule.expression)
                   .includes(queryExpression);
    }

    registerAvailableRulesChangeListener(listener: AvailableRulesChangeListener){
        this.listeners.push(listener);
    }

    private registerForRulesModelChange(rulesLanguageSupport: RulesLanguageSupport) {
        rulesLanguageSupport.registerModelChangeListener({
            modelAdded: (_uri, model) => this.addAllRulesFromModel(model, true),
            modelRemoved: (_uri, model) => this.removeAllRulesFromModel(model, true),
            modelChanged: (_uri, previous, current) => this.changeRulesInModel(previous, current)
        });
    }

    private addAllRulesFromModel(rulesFile: RulesFile, event: boolean){
        rulesFile.getDefinitions('GIVEN').forEach(rule => this.availableGivenRules.push(rule));
        rulesFile.getDefinitions('WHEN').forEach(rule => this.availableWhenRules.push(rule));
        rulesFile.getDefinitions('THEN').forEach(rule => this.availableThenRules.push(rule));

        if (event){
            this.eventAvailableRulesChange();
        }
    }

    private removeAllRulesFromModel(rulesFile: RulesFile, event: boolean){
        this.availableGivenRules = _.difference(this.availableGivenRules, rulesFile.getDefinitions('GIVEN'));
        this.availableWhenRules = _.difference(this.availableWhenRules, rulesFile.getDefinitions('WHEN'));
        this.availableThenRules = _.difference(this.availableThenRules, rulesFile.getDefinitions('THEN'));

        if (event){
            this.eventAvailableRulesChange();
        }
    }

    private changeRulesInModel(previous: RulesFile, current: RulesFile){
        this.removeAllRulesFromModel(previous, false);
        this.addAllRulesFromModel(current, false);

        this.eventAvailableRulesChange();
    }   

    private eventAvailableRulesChange(){
        this.listeners.forEach(listener => listener.availableRulesChanged());
    }
}