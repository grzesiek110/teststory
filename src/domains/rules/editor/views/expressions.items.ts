import { TreeDataProvider, Event, TreeItem, ProviderResult, TreeItemCollapsibleState, EventEmitter, ExtensionContext } from "vscode";
import * as path from 'path';

import { RuleDefinition } from "../../grammar/model/rule-definition";
import { getAvailableRulesService, logToOutput } from "../../../../extension";
import { MainRuleType } from "../../../../shared/common.model";

type ExpressionTreeItem = RootTreeItem | DefinitionTreeItem;

interface RootTreeItem {
    type: 'ROOT';
    label: MainRuleType;
}

interface DefinitionTreeItem {
    type: 'EXPRESSION';
    expression: RuleDefinition;
}

type TreeRoots = {
    [key in MainRuleType]: RootTreeItem;
};

export class ExpressionsItems implements TreeDataProvider<ExpressionTreeItem> {
	private _onDidChangeTreeData: EventEmitter<ExpressionTreeItem> = new EventEmitter<ExpressionTreeItem>();
    readonly onDidChangeTreeData: Event<ExpressionTreeItem> = this._onDidChangeTreeData.event;
    
    roots: TreeRoots = {
        GIVEN: { type: "ROOT", label: 'GIVEN' },
        WHEN:  { type: 'ROOT', label: 'WHEN' },
        THEN:  { type: 'ROOT', label: 'THEN' }
    };

    iconGiven: string;
    iconWhen: string;
    iconThen: string;

    constructor(private context: ExtensionContext) {
        this.prepareIcons();
    }

	refresh() {
		this._onDidChangeTreeData.fire();
	}
    
    getTreeItem(element: ExpressionTreeItem): TreeItem | Thenable<TreeItem> {
        if (element.type === 'ROOT'){
            return {
                label: element.label,
                collapsibleState: TreeItemCollapsibleState.Expanded,
            };
        }
        if (element.type === 'EXPRESSION'){
            return {
                label: element.expression.expression,
                tooltip: element.expression.description,
                collapsibleState: TreeItemCollapsibleState.None,
                iconPath: this.getIconPath(element),
            };
        }
    }

    getIconPath(element: DefinitionTreeItem)  {
        switch(element.expression.kind){
            case 'GIVEN':
                return this.iconGiven;
            case 'WHEN':
                return this.iconWhen;
            case 'THEN':
                return this.iconThen;
        }
        
    }

    getChildren(element: ExpressionTreeItem): ProviderResult<ExpressionTreeItem[]> {
        if (!element){
            return [
                this.roots.GIVEN,
                this.roots.WHEN,
                this.roots.THEN
            ];
        }
        if (element.type === 'ROOT'){
            return getAvailableRulesService()
                .getAvailableRules(element.label)
                .map(definition => (
                    { type: 'EXPRESSION', expression: definition }
                ));
        }
        return [];
    }

    getParent(element: ExpressionTreeItem): ProviderResult<ExpressionTreeItem> {
        if (element.type === 'EXPRESSION'){
            return this.roots[element.type];
        }
    }

    private prepareIcons() {    
        this.iconGiven = this.context.asAbsolutePath(path.join('resources', 'g.svg'));
        this.iconWhen = this.context.asAbsolutePath(path.join('resources', 'w.svg'));
        this.iconThen = this.context.asAbsolutePath(path.join('resources', 't.svg'));
    }
}



