
import * as vs from 'vscode';

import { parseStoryModel } from '../grammar/model/builder';
import { StoryModel } from '../grammar/model';
import { getAvailableRulesService } from '../../../extension';
import { AbstractLangageSupport } from '../../../shared/abstract-language-support';
import { STORY_EXTENSION } from '../../../shared/common.model';
import { createCompletionItemProvider } from './completions/completions.provider';
import { createDiagnosticsProvider } from './diagnostics/diagnostics.provider';
import { StoryScenariosView } from './views/story-scenarios.view';
import { createReferencesProvider } from './navigation/references.provider';
import { createDeclarationProvider } from './navigation/declaration.provider';


export class StoryLanguageSupport extends AbstractLangageSupport<StoryModel> {

    
    constructor(){
        super(STORY_EXTENSION);
    }

    async initialize(context: vs.ExtensionContext){
        await super.initialize(context);

        getAvailableRulesService().registerAvailableRulesChangeListener({
            availableRulesChanged: () => this.updateAllModels()
        });
    }

    registerProviders(context: vs.ExtensionContext) {
        context.subscriptions.push(createCompletionItemProvider(this));
        createDiagnosticsProvider(this);
        createReferencesProvider();
        createDeclarationProvider();

        // tslint:disable-next-line: no-unused-expression
        new StoryScenariosView(context);
    }

    parseContent(documentUri: vs.Uri, content: string): StoryModel {
        return parseStoryModel(documentUri, content);
    }
}

