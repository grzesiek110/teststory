import { CancellationToken, Location } from "vscode";
import { getStoryLanguageSupport } from "../../../../extension";
import { createLocation } from "../../../../shared/antlr-vsc.utils";
import { StoryRule } from "../../../story/grammar/model";
import { MainRuleType, ExtendedRuleType } from "../../../../shared/common.model";


export function getReferencesToRule(expression: string, type: MainRuleType, token: CancellationToken){
    const references: Location[] = [];

    getStoryLanguageSupport().getModels().forEach(model => {
        const rules = model.getElements<StoryRule>(0, undefined, true, 'RULE');

        let lastMainExpressionKind: ExtendedRuleType = 'GIVEN';
        for (let rule of rules){
            
            if (token.isCancellationRequested){
                return [];
            }

            let expressionKind = rule.kind;
            if (expressionKind === 'AND'){
                expressionKind = lastMainExpressionKind;
            } else {
                lastMainExpressionKind = expressionKind;
            }

            if (rule.expression.mask === expression && expressionKind === type){
                references.push(createLocation(model.uri, rule.expression.ctx));
            }
        }

    });
    return references;
}

