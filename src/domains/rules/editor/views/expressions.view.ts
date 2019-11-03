import * as vscode from 'vscode';
import { ExpressionsItemsProvider } from './expressions-items.provider';
import { getAvailableRulesService } from '../../../../extension';

export class ExpressionsView {

	constructor(context: vscode.ExtensionContext) {
		const treeItemProvider = new ExpressionsItemsProvider(context);		
		vscode.window.registerTreeDataProvider('expressionsView', treeItemProvider);		

		getAvailableRulesService().registerAvailableRulesChangeListener({
			availableRulesChanged: () => treeItemProvider.refresh()
		});
	}
}


