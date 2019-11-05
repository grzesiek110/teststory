import { Uri } from "vscode";
import { ModelContext } from "../parser/RulesParser";
import { RuleDefinition } from "./rule-definition";
import { MainRuleType } from "../../../../shared/common.model";

export class RulesFile {
    definitions: RuleDefinition[] = [];
    
    constructor(
        public uri: Uri,
        public ctx: ModelContext){}

    addDefinition(definition: RuleDefinition){
        this.definitions.push(definition);
    }

    getDefinitions(type?: MainRuleType){
        if (type){
            return this.definitions.filter(rule => rule.kind === type);
        } else {
            return this.definitions;
        }
    }   
}

