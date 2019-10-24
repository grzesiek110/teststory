import { CompletionItem, Position, TextDocument } from "vscode";

import { StoryScenario } from "../../../grammar/model/elements";
import { CompletionItemsProvider } from "../completions.model";



export class ScenarioCompletionItems implements CompletionItemsProvider {
    
    constructor(private element: StoryScenario){}
    
    provideCompletionItems(_document: TextDocument, _position: Position): CompletionItem[] {        
        return [];
    }
}