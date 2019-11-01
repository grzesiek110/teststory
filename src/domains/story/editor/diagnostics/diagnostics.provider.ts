import * as vscode from 'vscode';

import { DiagnosticsProviderRule } from './diagnostics.model';
import { ExpressionDiagnostics, ScenarioSequenceDiagnostics, UnknownLinesDiagnostics } from './adapters';
import { KeywordSpellingDiagnostics } from './adapters/keyword-spelling-diagnostics';
import { StoryLanguageSupport } from '../story.language-support';
import { StoryModel } from '../../grammar/model';


const diagnosticsRules: DiagnosticsProviderRule[] = [
	new ExpressionDiagnostics(),
	new ScenarioSequenceDiagnostics(),
	new UnknownLinesDiagnostics(),
	new KeywordSpellingDiagnostics()
]; 

export function createDiagnosticsProvider(storyLanguageSupport: StoryLanguageSupport) {
	const diagnostics = vscode.languages.createDiagnosticCollection("teststory-story");

	storyLanguageSupport.registerModelChangeListener({
		modelAdded: (uri, model) => updateDiagnostics(uri, model, diagnostics),
		modelChanged: (uri, _previous, current) => updateDiagnostics(uri, current, diagnostics),
		modelRemoved: (uri, _previous) => removeDiagnostics(uri, diagnostics)
	});
}

function updateDiagnostics(uri: vscode.Uri, model: StoryModel, collection: vscode.DiagnosticCollection): void {
	collection.delete(uri);

	const diagnostics = [];
	diagnosticsRules.forEach(rule => rule.createDiagnostics(uri, diagnostics, model));
	collection.set(uri, diagnostics);	
}

function removeDiagnostics(uri: vscode.Uri, collection: vscode.DiagnosticCollection) {
	collection.delete(uri);
}