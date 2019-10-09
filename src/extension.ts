import * as vscode from 'vscode';
import { registerCompletionProviders } from './story/editor/completion-provider/register-providers';

export function activate(context: vscode.ExtensionContext) {

	const providers = registerCompletionProviders();
	context.subscriptions.push(...providers);
}

// this method is called when your extension is deactivated
export function deactivate() {

}
