
import * as vs from 'vscode';
import { AbstractLangageSupport } from '../../../shared/abstract-language-support';
import { VARIABLES_EXTENSION } from '../../../shared/common.model';
import { VariablesFile } from '../grammar/model/variables-file';
import { parseVariablesModel } from '../grammar/model/builder';
import { createVariableReferencesProvider } from './navigation/variable-references.provider';
import { VariablesView } from './views/variables.view';



export class VariablesLanguageSupport extends AbstractLangageSupport<VariablesFile>{

    constructor(){
        super(VARIABLES_EXTENSION);
    }

    parseContent(documentUri: vs.Uri, content: string) {
        return parseVariablesModel(documentUri, content);
    }

    registerProviders(context: vs.ExtensionContext) {
        context.subscriptions.push(createVariableReferencesProvider());

        // tslint:disable-next-line: no-unused-expression
        new VariablesView(context);
    }

}

