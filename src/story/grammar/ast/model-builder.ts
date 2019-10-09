import * as vscode from 'vscode';

import { StoryListener } from '../parser/StoryListener';
import { FeatureContext, SectionNameContext, ScenarioContext, GivenContext, ExpressionContext, WhenContext, ThenContext, AndContext, ExpressionTextContext, VariableNameContext, StaticValueContext } from '../parser/StoryParser';

export class StoreModel implements StoreSection{
    featureName: string;
    structure: StoreModelStructure = {};

    setSectionName(name: string): void {
        this.featureName = name;
    }
    
    addStructureElement(line: number, element: StoreScenario | StoreRule ){
        this.structure[line] = element;
    }
}

interface CompletionItemsProvider {
    provideCompletionItems(position: number): vscode.CompletionItem[];
}

interface StoreModelStructure {
    [key: number]: StoreScenario | StoreRule;
}

class StoreScenario implements StoreSection, CompletionItemsProvider{
    name: string;

    setSectionName(name: string): void {
        this.name = name;
    }

    provideCompletionItems(position: number): vscode.CompletionItem[] {
        return [
            new vscode.CompletionItem('sekcja: '+this.name)
        ];
    }    
}

export interface StoreSection {
    setSectionName(name: string): void;
}

type StoreRuleType = 'Given' | 'When' | 'Then' | 'And';

class StoreRule implements CompletionItemsProvider{
    expression: StoreExpression;

    constructor(private type: StoreRuleType){}
    
    setExpression(expression: StoreExpression){
        this.expression = expression;
    }

    provideCompletionItems(position: number): vscode.CompletionItem[] {
        const snippetCompletion = new vscode.CompletionItem(this.expression.cucumberMask);
        snippetCompletion.insertText = new vscode.SnippetString(this.expression.proposalText);
        snippetCompletion.documentation = new vscode.MarkdownString("A to test z maska");


        console.log('popowiedz: '+this.expression.cucumberMask);
        return [
            new vscode.CompletionItem('Regula z expression'),
            snippetCompletion
        ];
    }  
}

class StoreExpression {
    cucumberMask = "";
    proposalText = "";
    referenceNames: string[] = [];

    addNamePart(partName: string){
        this.cucumberMask += partName;
        this.proposalText += partName;
    }

    addVariableRef(variableName: string){
        const paramNumber = this.referenceNames.length + 1;
        const proposalMask = '${'+paramNumber+'}';

        this.cucumberMask += '<\s+>';
        this.proposalText += proposalMask;
        this.referenceNames.push(variableName);
    }

    addConstant(value: string){ 
        //TODO Stale nie powinny sie mieszac ze zmiennymi - dodaj typ 
        const paramNumber = this.referenceNames.length + 1;
        const proposalMask = '${'+paramNumber+'}';

        this.cucumberMask += '"\s+"';
        this.proposalText += proposalMask;        
        this.referenceNames.push(value);
    }
}



export class StoreModelBuilder implements StoryListener {
    model: StoreModel;
    activeSection: StoreSection;
    activeScenario: StoreScenario;
    activeRule: StoreRule;
    activeExpression: StoreExpression;

    enterFeature(ctx: FeatureContext){
        this.model = new StoreModel();
        this.activeSection = this.model;
    }

    exitSectionName(ctx: SectionNameContext){
        if (!this.activeSection){
            throw new Error('No active section for sectionName');
        }
        this.activeSection.setSectionName(ctx.text);
        this.activeSection = undefined;
    }

    enterScenario(ctx: ScenarioContext){
        this.activeScenario = new StoreScenario();
        this.activeSection = this.activeScenario;
    }

    exitScenario(ctx: ScenarioContext){
        this.model.addStructureElement(ctx.start.line, this.activeScenario);
        this.activeScenario = undefined;
    }

    enterGiven(ctx: GivenContext){
        this.activeRule = new StoreRule('Given');
    }

    enterWhen(ctx: WhenContext){
        this.activeRule = new StoreRule('When');
    }

    enterThen(ctx: ThenContext){
        this.activeRule = new StoreRule('Then');
    }

    enterAnd(ctx: AndContext){
        this.activeRule = new StoreRule('And');
    }

    enterExpression(ctx: ExpressionContext){
        this.activeExpression = new StoreExpression();
    }

    enterExpressionText(ctx: ExpressionTextContext){
        this.activeExpression.addNamePart(ctx.text);
    }

    enterVariableName(ctx: VariableNameContext){
        this.activeExpression.addVariableRef(ctx.text);
    }

    enterStaticValue(ctx: StaticValueContext){
        this.activeExpression.addConstant(ctx.text);
    }

    exitExpression(ctx: ExpressionContext){
        this.activeRule.setExpression(this.activeExpression);
        this.activeExpression = undefined;

        this.model.addStructureElement(ctx.start.line, this.activeRule);
        this.activeRule = undefined;
    }
}