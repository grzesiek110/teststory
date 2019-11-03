import * as path from 'path';
import { Event, EventEmitter, ExtensionContext, ProviderResult, TreeDataProvider, TreeItem, TreeItemCollapsibleState, Command } from "vscode";
import { getAvailableScenariosService } from "../../../../extension";
import { StoryScenarioDescriptor } from "../services/available-scenarios.service";


export class StoryScenariosItemsProvider implements TreeDataProvider<StoryScenarioDescriptor> {
	private _onDidChangeTreeData: EventEmitter<StoryScenarioDescriptor> = new EventEmitter<StoryScenarioDescriptor>();
    readonly onDidChangeTreeData: Event<StoryScenarioDescriptor> = this._onDidChangeTreeData.event;
    
    iconScenario: string;
    iconScenarioOutline: string;

    constructor(private context: ExtensionContext) {
        this.prepareIcons();
    }

	refresh() {
		this._onDidChangeTreeData.fire();
	}
    
    getTreeItem(element: StoryScenarioDescriptor): TreeItem | Thenable<TreeItem> {
        return {
            label: element.scenarioName,
            collapsibleState: TreeItemCollapsibleState.None,
            iconPath: element.type === 'SCENARIO' ? this.iconScenario : this.iconScenarioOutline,
            command: this.createGoToDefintionCommand(element)
        };
    }

    private createGoToDefintionCommand(element: StoryScenarioDescriptor): Command {
        return {
            title: 'Go to definiton',
            command: 'vscode.open',
            arguments: [
                element.location.uri,
                { selection: element.location.range }
            ]
        };
    }

    getChildren(element: StoryScenarioDescriptor): ProviderResult<StoryScenarioDescriptor[]> {
        if (!element){
            return getAvailableScenariosService().getAvailableScenarios();
        }
        return [];
    }

    private prepareIcons() {    
        this.iconScenario = this.context.asAbsolutePath(path.join('resources', 's.svg'));
        this.iconScenarioOutline = this.context.asAbsolutePath(path.join('resources', 'so.svg'));
    }
}



