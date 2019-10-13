import * as vscode from 'vscode';
import { parseStoryModel } from '../grammar/ast/builder';
import { StoryCompletionItemsProvider } from './completions/completion-provider';
import { RulesService } from '../../rules/rules';


export function registerCompletionProviders(){
    const provider = vscode.languages.registerCompletionItemProvider('plaintext', {

		provideCompletionItems(document: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken, context: vscode.CompletionContext) {
			
			console.log(`proposals - ${position.line}:${position.character}`);
			const storyModel = parseStoryModel(document);
			console.log(storyModel.debugString());

			const completionProvider = new StoryCompletionItemsProvider(storyModel, new RulesService());
			return completionProvider.provideCompletionItems(document, position);
		}
	});

    return [provider];
}