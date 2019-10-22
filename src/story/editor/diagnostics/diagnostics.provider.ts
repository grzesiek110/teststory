import * as vscode from 'vscode';
import * as path from 'path';
import { parseStoryModel } from '../../grammar/ast/builder';
import { ScenariosStructureRule } from './rules/scenarios-structure.rule';

export function createDiagnosticsProvider(context: vscode.ExtensionContext) {
	const collection = vscode.languages.createDiagnosticCollection('plaintext');
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
	console.log('update diagnostics ' + document.uri.fsPath);

	if (document && path.extname(document.uri.fsPath) === '.story') {

		const storyModel = parseStoryModel(document);
		const structureRule = new ScenariosStructureRule();
		const diagnostics = structureRule.getDiagnostics(document, storyModel);
		collection.set(document.uri, diagnostics);


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