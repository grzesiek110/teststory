import * as vscode from 'vscode';
import { getAvailableVariablesService } from '../../../../extension';
import { VariablesItemsProvider } from './variables-items.provider';

export class VariablesView {

	constructor(context: vscode.ExtensionContext) {
		const treeItemProvider = new VariablesItemsProvider(context);		
		vscode.window.registerTreeDataProvider('variablesView', treeItemProvider);		

		getAvailableVariablesService().registerAvailableVariablesChangeListener({
			availableVariablesChanged: () => treeItemProvider.refresh()
		});
	}
}


