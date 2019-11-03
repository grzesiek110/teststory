import { StoryExpression } from "../../../story/grammar/model";
import { VariablesLanguageSupport } from "../variables.language-support";
import { VariableDefinition } from "../../grammar/model/variable-definition";
import { VariablesFile } from "../../grammar/model/variables-file";

import * as _ from 'lodash';

export interface AvailableVariablesChangeListener{
    availableVariablesChanged(): void;
}


export class AvailableVariablesService {
    availableVariables: VariableDefinition[] = [];
    listeners: AvailableVariablesChangeListener[] = [];

    constructor(variablesLanguageSupport: VariablesLanguageSupport){
        this.registerForVariablesModelChange(variablesLanguageSupport);
    }


    getAvailableVariables(): VariableDefinition[]{
        return this.availableVariables;
    }

    isValid(variableName: string){
        return this.getAvailableVariables()
            .map(variable => variable.variableName)
            .includes(variableName);
    }

    registerAvailableVariablesChangeListener(listener: AvailableVariablesChangeListener){
        this.listeners.push(listener);
    }

    private registerForVariablesModelChange(variablesLanguageSupport: VariablesLanguageSupport) {
        variablesLanguageSupport.registerModelChangeListener({
            modelAdded: (_uri, model) => this.addAllVariablesFromModel(model, true),
            modelRemoved: (_uri, model) => this.removeAllVariablesFromModel(model, true),
            modelChanged: (_uri, previous, current) => this.changeVariablesInModel(previous, current)
        });
    }

    private addAllVariablesFromModel(rulesFile: VariablesFile, event: boolean){
        rulesFile.getDefinitions().forEach(rule => this.availableVariables.push(rule));

        if (event){
            this.eventAvailableRulesChange();
        }
    }

    private removeAllVariablesFromModel(rulesFile: VariablesFile, event: boolean){
        this.availableVariables = _.difference(this.availableVariables, rulesFile.getDefinitions());

        if (event){
            this.eventAvailableRulesChange();
        }
    }

    private changeVariablesInModel(previous: VariablesFile, current: VariablesFile){
        this.removeAllVariablesFromModel(previous, false);
        this.addAllVariablesFromModel(current, false);

        this.eventAvailableRulesChange();
    }   

    private eventAvailableRulesChange(){
        this.listeners.forEach(listener => listener.availableVariablesChanged());
    }    
}