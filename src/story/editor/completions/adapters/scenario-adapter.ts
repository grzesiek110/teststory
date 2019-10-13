import { CompletionItem, Position, TextDocument } from "vscode";
import { StoryScenario } from "../../../grammar/ast/parts";
import { CompletionItemsProvider } from "../completion-provider";


export class ScenarioCompletionProviderAdapter implements CompletionItemsProvider {
    
    constructor(private element: StoryScenario){}
    
    provideCompletionItems(_document: TextDocument, _position: Position): CompletionItem[] {        
        return [];
    }
}