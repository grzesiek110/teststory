import { ParserRuleContext } from "antlr4ts";
import * as _ from 'lodash';
import { Location, Position, Range, Uri } from "vscode";
import { StoryModel, StoryScenario } from "../../grammar/model";
import { StoryScenarioOutline } from "../../grammar/model/elements/story-scenario-outline";
import { StoryLanguageSupport } from "../story.language-support";
import { StoryParser } from "../../grammar/parser/StoryParser";
import { createLocation } from "../../../../shared/antlr-vsc.utils";


export interface AvailableScenariosChangeListener{
    availableScenariosChanged(): void;
}

export type StoryScenarioDescriptorType = 'SCENARIO' | 'SCENARIO_OUTLINE';

export interface StoryScenarioDescriptor {
    scenarioName: string;
    location: Location;
    type: StoryScenarioDescriptorType;
}

export class AvailableStoryScenariosService {
    availableScenarios: StoryScenario[] = [];
    availableOutlineScenarios: StoryScenarioOutline[] = [];
    listeners: AvailableScenariosChangeListener[] = [];

    constructor(storyLanguageSupport: StoryLanguageSupport){
        this.registerForVariablesModelChange(storyLanguageSupport);
    }

    getAvailableScenarios(): StoryScenarioDescriptor[]{
        const scenarios = this.availableScenarios
            .map(scenario => this.createScenarioDescriptor(scenario));
        const scenariosOutlines = this.availableOutlineScenarios
            .map(scenario => this.createScenarioDescriptor(scenario));
        
        return [
            ...scenarios,
            ...scenariosOutlines
        ];
    }

    registerAvailableScenariosChangeListener(listener: AvailableScenariosChangeListener){
        this.listeners.push(listener);
    }

    private registerForVariablesModelChange(variablesLanguageSupport: StoryLanguageSupport) {
        variablesLanguageSupport.registerModelChangeListener({
            modelAdded: (_uri, model) => this.addAllVariablesFromModel(model, true),
            modelRemoved: (_uri, model) => this.removeAllVariablesFromModel(model, true),
            modelChanged: (_uri, previous, current) => this.changeVariablesInModel(previous, current)
        });
    }

    private addAllVariablesFromModel(rulesFile: StoryModel, event: boolean){
        rulesFile.getScenarios().forEach(scenario => this.availableScenarios.push(scenario));
        rulesFile.getScenariosOutline().forEach(scenario => this.availableOutlineScenarios.push(scenario));

        if (event){
            this.eventAvailableRulesChange();
        }
    }

    private removeAllVariablesFromModel(rulesFile: StoryModel, event: boolean){
        this.availableScenarios = _.difference(this.availableScenarios, rulesFile.getScenarios());
        this.availableOutlineScenarios = _.difference(this.availableOutlineScenarios, rulesFile.getScenariosOutline());

        if (event){
            this.eventAvailableRulesChange();
        }
    }

    private changeVariablesInModel(previous: StoryModel, current: StoryModel){
        this.removeAllVariablesFromModel(previous, false);
        this.addAllVariablesFromModel(current, false);

        this.eventAvailableRulesChange();
    }   

    private eventAvailableRulesChange(){
        this.listeners.forEach(listener => listener.availableScenariosChanged());
    }    

    private createScenarioDescriptor(scenario: StoryScenario | StoryScenarioOutline): StoryScenarioDescriptor {
        return {
            type: scenario.ctx.ruleIndex === StoryParser.RULE_scenario ? 'SCENARIO' : 'SCENARIO_OUTLINE',
            scenarioName: scenario.ctx.sectionName() && scenario.ctx.sectionName().text || 'unnamed scenario',
            location: createLocation(scenario.model.uri, scenario.ctx),
        };
    }

    
}