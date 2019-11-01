import * as vscode from 'vscode';
import { ExpressionsItems } from './expressions.items';
import { getAvailableRulesService } from '../../../../extension';

export class ExpressionsView {

	constructor(context: vscode.ExtensionContext) {
		const treeItemProvider = new ExpressionsItems(context);		
		vscode.window.registerTreeDataProvider('expressionsView', treeItemProvider);		

		getAvailableRulesService().registerAvailableRulesChangeListener({
			availableRulesChanged: () => treeItemProvider.refresh()
		});
	}
}


