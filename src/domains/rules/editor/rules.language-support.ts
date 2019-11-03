
import * as vs from 'vscode';

import { AbstractLangageSupport } from '../../../shared/abstract-language-support';
import { RULES_EXTENSION } from '../../../shared/common.model';
import { parseRulesModel } from '../grammar/model/builder';
import { RulesFile } from '../grammar/model/rules-file';



export class RulesLanguageSupport extends AbstractLangageSupport<RulesFile>{

    constructor(){
        super(RULES_EXTENSION);
    }

    parseContent(documentUri: vs.Uri, content: string) {
        return parseRulesModel(documentUri, content);
    }

}

