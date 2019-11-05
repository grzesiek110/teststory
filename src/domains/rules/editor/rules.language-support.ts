
import * as vs from 'vscode';

import { AbstractLangageSupport } from '../../../shared/abstract-language-support';
import { RULES_EXTENSION } from '../../../shared/common.model';
import { parseRulesModel } from '../grammar/model/builder';
import { RulesFile } from '../grammar/model/rules-file';
import { createRulesReferencesProvider } from './navigation/rule-references.provider';
import { ExpressionsView } from './views/expressions.view';



export class RulesLanguageSupport extends AbstractLangageSupport<RulesFile>{

    constructor(){
        super(RULES_EXTENSION);
    }

    parseContent(documentUri: vs.Uri, content: string) {
        return parseRulesModel(documentUri, content);
    }

    registerProviders(context: vs.ExtensionContext) {
        context.subscriptions.push(createRulesReferencesProvider());

        // tslint:disable-next-line: no-unused-expression
        new ExpressionsView(context);
    }

}

