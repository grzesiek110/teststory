import * as vscode from 'vscode';
import { getAvailableScenariosService } from '../../../../extension';
import { StoryScenariosItemsProvider } from './story-scenarios-items.provider';

export class StoryScenariosView {

	constructor(context: vscode.ExtensionContext) {
		const treeItemProvider = new StoryScenariosItemsProvider(context);		
		vscode.window.registerTreeDataProvider('scenariosView', treeItemProvider);		

		getAvailableScenariosService().registerAvailableScenariosChangeListener({
			availableScenariosChanged: () => treeItemProvider.refresh()
		});
	}
}


