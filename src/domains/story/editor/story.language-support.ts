
import * as vs from 'vscode';

import { parseStoryModel } from '../grammar/model/builder';
import { StoryModel } from '../grammar/model';
import { getAvailableRulesService } from '../../../extension';
import { AbstractLangageSupport } from '../../../shared/abstract-language-support';
import { STORY_EXTENSION } from '../../../shared/common.model';


export class StoryLanguageSupport extends AbstractLangageSupport<StoryModel> {
    
    constructor(){
        super(STORY_EXTENSION);
    }

    async initialize(context: vs.ExtensionContext){
        super.initialize(context);

        getAvailableRulesService().registerAvailableRulesChangeListener({
            availableRulesChanged: () => this.updateAllModels()
        });
    }

    parseContent(documentUri: vs.Uri, content: string): StoryModel {
        return parseStoryModel(documentUri, content);
    }
}

