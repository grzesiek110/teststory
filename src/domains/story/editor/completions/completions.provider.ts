import * as vscode from 'vscode';
import { STORY_LANGUAGE_ID } from '../../story.model';
import { StoryLanguageSupport } from '../story.language-support';
import { ModelRootItemsProvider } from './adapters/model-root.items-provider';



let storyLanguageSupport: StoryLanguageSupport;

export function createCompletionItemProvider(languageSupport: StoryLanguageSupport) {
    storyLanguageSupport = languageSupport;
	return vscode.languages.registerCompletionItemProvider(STORY_LANGUAGE_ID, new StoryCompletionItemProvider());
}

class StoryCompletionItemProvider implements vscode.CompletionItemProvider{
    provideCompletionItems(document: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken, context: vscode.CompletionContext): vscode.ProviderResult<vscode.CompletionItem[] | vscode.CompletionList> {

        const storyModel = storyLanguageSupport.getModel(document.uri);
        const completionProvider = new ModelRootItemsProvider(storyModel);
        const result = completionProvider.provideCompletionItems(document, position);
        return result;
    }    
}

