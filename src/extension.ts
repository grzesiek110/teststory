import * as vscode from 'vscode';
import { registerProviders } from './story/editor/register-providers';

export function activate(context: vscode.ExtensionContext) {

	const providers = registerProviders(context);
	context.subscriptions.push(...providers);
}

// this method is called when your extension is deactivated
export function deactivate() {

}
