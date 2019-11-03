import { TreeDataProvider, Event, TreeItem, ProviderResult, TreeItemCollapsibleState, EventEmitter, ExtensionContext, Command } from "vscode";
import * as path from 'path';
import { VariableDefinition } from "../../grammar/model/variable-definition";
import { getAvailableVariablesService } from "../../../../extension";


export class VariablesItemsProvider implements TreeDataProvider<VariableDefinition> {
	private _onDidChangeTreeData: EventEmitter<VariableDefinition> = new EventEmitter<VariableDefinition>();
    readonly onDidChangeTreeData: Event<VariableDefinition> = this._onDidChangeTreeData.event;
    
    iconVariable: string;

    constructor(private context: ExtensionContext) {
        this.prepareIcons();
    }

	refresh() {
		this._onDidChangeTreeData.fire();
	}
    
    getTreeItem(element: VariableDefinition): TreeItem | Thenable<TreeItem> {
        return {
            label: element.variableName + (element.variableType ? ' : '+element.variableType : ''),
            tooltip: element.description,
            collapsibleState: TreeItemCollapsibleState.None,
            iconPath: this.iconVariable,
            command: this.createGoToDefintionCommand(element)
        };
    }

    private createGoToDefintionCommand(element: VariableDefinition): Command {
        return {
            title: 'Go to definiton',
            command: 'vscode.open',
            arguments: [
                element.location.uri,
                { selection: element.location.range }
            ]
        };
    }

    getChildren(element: VariableDefinition): ProviderResult<VariableDefinition[]> {
        if (!element){
            return getAvailableVariablesService().getAvailableVariables();
        }
        return [];
    }

    private prepareIcons() {    
        this.iconVariable = this.context.asAbsolutePath(path.join('resources', 'v.svg'));
    }
}



