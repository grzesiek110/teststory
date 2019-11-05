import { Location } from "vscode";
import { getAvailableRulesService } from "../../../../extension";
import { createLocation } from "../../../../shared/antlr-vsc.utils";
import { MainRuleType } from "../../../../shared/common.model";


export function getDeclarationOfRule(expression: string, type: MainRuleType): Location | undefined {

    const allRules = getAvailableRulesService().getAvailableRules(type);
    const declaration = allRules.find(declaration => declaration.expression === expression);
    if (declaration){
        return createLocation(declaration.uri, declaration.ctx);
    }
    
    return undefined;
}