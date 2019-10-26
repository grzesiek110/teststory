import * as vscode from 'vscode';

import { createDiagnosticsProvider } from './domains/story/editor/diagnostics/diagnostics.provider';
import { createCompletionItemProvider } from './domains/story/editor/completions/completions.provider';
import { StoryLanguageSupport } from './domains/story/editor/story.language-support';

const storyLanguageSupport = new StoryLanguageSupport();

export function activate(context: vscode.ExtensionContext) {
	createDiagnosticsProvider(storyLanguageSupport);	
	context.subscriptions.push(createCompletionItemProvider(storyLanguageSupport));

	storyLanguageSupport.initialize(context);
}

// this method is called when your extension is deactivated
export function deactivate() {
	
}
