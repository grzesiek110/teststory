import * as vscode from 'vscode';
import * as path from 'path';

import { parseStoryModel } from '../grammar/ast/builder';
import { StoryCompletionItemsProvider } from './completions/completion-provider';
import { RulesService } from '../../rules/rules';


export function registerProviders(context: vscode.ExtensionContext){
    const completionProvider = createCompletionItemProvider();
	/* const diagnosticsProvider = */ createDiagnosticsProvider(context);
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

function createDiagnosticsProvider(context: vscode.ExtensionContext) {
	const collection = vscode.languages.createDiagnosticCollection('test');
	if (vscode.window.activeTextEditor) {
		updateDiagnostics(vscode.window.activeTextEditor.document, collection);
	}
	context.subscriptions.push(vscode.window.onDidChangeActiveTextEditor(editor => {
		if (editor) {
			updateDiagnostics(editor.document, collection);
		}
	}));
}

function updateDiagnostics(document: vscode.TextDocument, collection: vscode.DiagnosticCollection): void {
	if (document && path.extname(document.uri.fsPath) === '.story') {

		


		// collection.set(document.uri, [{
		// 	code: '',
		// 	message: 'cannot assign twice to immutable variable `x`',
		// 	range: new vscode.Range(new vscode.Position(3, 4), new vscode.Position(3, 10)),
		// 	severity: vscode.DiagnosticSeverity.Error,
		// 	source: '',
		// 	relatedInformation: [
		// 		new vscode.DiagnosticRelatedInformation(new vscode.Location(document.uri, new vscode.Range(new vscode.Position(1, 8), new vscode.Position(1, 9))), 'first assignment to `x`')
		// 	]
		// }])
	} else {
		collection.clear();
	}
}