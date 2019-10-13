import * as vscode from 'vscode';
import * as snippets from './feature.snippets';
import { StoryFeature, StoryModel, StructureElement, StoryExpression, StoryScenario, StoryRule } from '../../grammar/ast';
import { FeatureCompletionProviderAdapter, ExpressionCompletionProviderAdapter, ScenarioCompletionProviderAdapter, RuleCompletionProviderAdapter } from './adapters';
import { RulesService } from '../../../rules/rules';


export interface CompletionItemsProvider {
    provideCompletionItems(document: vscode.TextDocument, position: vscode.Position): vscode.CompletionItem[];
}

export class StoryCompletionItemsProvider implements CompletionItemsProvider {

    constructor(private model: StoryModel, private rulesService: RulesService){}

    provideCompletionItems(document: vscode.TextDocument, position: vscode.Position): vscode.CompletionItem[] {
        const lineIndex = position.line + 1;

        if (this.model.isEmpty()){
            return this.defaultFeatureKeyword(document, position);
        }

        if (this.positionIsBeforeFeature(lineIndex)){
            return [];
        }

        const lineElement = this.model.getElement[lineIndex];
        if (lineElement){
            const adapter = this.getCompletionProviderAdapter(lineElement);
            return adapter.provideCompletionItems(document, position);
        }

        const nearestElement = this.model.getNearestElementAbove(lineIndex);
        if (nearestElement){
            const adapter = this.getCompletionProviderAdapter(nearestElement);
            return adapter.provideCompletionItems(document, position);
        }
        
        return [];
    }

    private getCompletionProviderAdapter(element: StructureElement): CompletionItemsProvider {
        switch(element.getType()){
            case 'FEATURE':
                return new FeatureCompletionProviderAdapter(element as StoryFeature);

            case 'SCENARIO':
                return new ScenarioCompletionProviderAdapter(element as StoryScenario);
        
            case 'RULE':
                return new RuleCompletionProviderAdapter(element as StoryRule, this.rulesService);
            
            default:
                throw new Error(`No completion provider for type: ${element.getType()}`);
        }
    }

    private defaultFeatureKeyword(document: vscode.TextDocument, position: vscode.Position): vscode.CompletionItem[] {
        
        const item = new vscode.CompletionItem('Feature');
        item.detail = 'Add Feature: keyword';
        item.insertText = new vscode.SnippetString(snippets.default_feature_for_empty_file);
        item.kind = vscode.CompletionItemKind.Keyword;
        item.range = this.findRangeToInsertFeatureKeyword(document, position);

        return [ item ];
    }

    private findRangeToInsertFeatureKeyword(document: vscode.TextDocument, position: vscode.Position) {
        let range: vscode.Range;
        const textLine = document.lineAt(position.line);
        if (textLine.isEmptyOrWhitespace) {
            range = new vscode.Range(new vscode.Position(textLine.lineNumber, 0), new vscode.Position(textLine.lineNumber, 'Feature:'.length));
        }
        return range;
    }

    private positionIsBeforeFeature(line: number) {
        const lines = this.model.getUsedLines();
        return line < lines[0];
    }


}