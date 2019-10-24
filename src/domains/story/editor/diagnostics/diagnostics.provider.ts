import * as path from 'path';
import * as vscode from 'vscode';

import { parseStoryModel } from '../../grammar/model/builder';
import { DiagnosticsProviderRule } from './diagnostics.model';
import { ExpressionDiagnostics, ScenarioSequenceDiagnostics, UnknownLinesDiagnostics } from './adapters';


const diagnosticsRules: DiagnosticsProviderRule[] = [
	new ExpressionDiagnostics(),
	new ScenarioSequenceDiagnostics(),
	new UnknownLinesDiagnostics(),
]; 

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

		const diagnostics = [];
		const storyModel = parseStoryModel(document);

		diagnosticsRules.forEach(rule => rule.createDiagnostics(document, diagnostics, storyModel));
		collection.set(document.uri, diagnostics);

	} else {
		collection.clear();
	}
}