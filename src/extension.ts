import * as vscode from 'vscode';

import { createDiagnosticsProvider } from './domains/story/editor/diagnostics/diagnostics.provider';
import { createCompletionItemProvider } from './domains/story/editor/completions/completions.provider';

export function activate(context: vscode.ExtensionContext) {

	createDiagnosticsProvider(context);	
	context.subscriptions.push(createCompletionItemProvider());
}

// this method is called when your extension is deactivated
export function deactivate() {

}
