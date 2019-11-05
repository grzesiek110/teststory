import { getAvailableVariablesService } from "../../../../extension";
import { createLocation } from "../../../../shared/antlr-vsc.utils";
import { Location } from "vscode";


export function getDeclarationOfVariable(variableName: string): Location | undefined {

    const allVariables = getAvailableVariablesService().getAvailableVariables();
    const declaration = allVariables.find(declaration => declaration.variableName === variableName);
    if (declaration){
        return createLocation(declaration.uri, declaration.ctx);
    }
    
    return undefined;
}