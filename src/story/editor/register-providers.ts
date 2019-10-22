import * as vscode from 'vscode';
import { RulesService } from '../../rules/rules';
import { parseStoryModel } from '../grammar/ast/builder';
import { StoryCompletionItemsProvider } from './completions/completion-provider';
import { createDiagnosticsProvider } from './diagnostics/diagnostics.provider';



export function registerProviders(context: vscode.ExtensionContext){
    const completionProvider = createCompletionItemProvider();
	createDiagnosticsProvider(context);
    return [
		completionProvider
	];
}

function createCompletionItemProvider() {
	return vscode.languages.registerCompletionItemProvider('plaintext', {
		provideCompletionItems(document: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken, context: vscode.CompletionContext) {
			console.log(`proposals - ${position.line}:${position.character}`);
			const storyModel = parseStoryModel(document);
			console.log(storyModel.debugString());
			const completionProvider = new StoryCompletionItemsProvider(storyModel, new RulesService());
			return completionProvider.provideCompletionItems(document, position);
		}
	});
}

