import * as vscode from 'vscode';
import { ParseTree, TerminalNode, RuleNode, ErrorNode } from 'antlr4ts/tree';

import { storyVisitor } from '../../grammar/storyVisitor';
import { ModelContext, FeatureContext, ScenarioContext, SectionNameContext, GivenContext, WhenContext, ThenContext, AndContext, ExpressionContext, ExpressionTextContext, VariableRefContext, VariableNameContext, StaticValueSingleContext, StaticValueDoubleContext, StaticValueContext, EmptyLineContext } from '../../grammar/storyParser';


export class StoryContentProvider implements storyVisitor<vscode.CompletionItem[]>{

    constructor(
        private line: number,
        private position: number){}

    visit(tree: ParseTree): vscode.CompletionItem[] {
        return [];
    }

    visitChildren(node: RuleNode): vscode.CompletionItem[] {
        for (let i = 0; i < node.childCount; i++){
            return node.getChild(i).accept(this);
        }
        return [];
    }

    visitTerminal(node: TerminalNode): vscode.CompletionItem[] {
        return [];
    }

    visitErrorNode(node: ErrorNode): vscode.CompletionItem[] {
        return [];
    }

    // //visitModel?: (ctx: ModelContext) => vscode.CompletionItem[];    
    // visitFeature?: (ctx: FeatureContext) => vscode.CompletionItem[];
    // visitSectionName?: (ctx: SectionNameContext) => vscode.CompletionItem[];
    // visitGiven?: (ctx: GivenContext) => vscode.CompletionItem[];
    // visitWhen?: (ctx: WhenContext) => vscode.CompletionItem[];
    // visitThen?: (ctx: ThenContext) => vscode.CompletionItem[];
    // visitAnd?: (ctx: AndContext) => vscode.CompletionItem[];
    // visitExpression?: (ctx: ExpressionContext) => vscode.CompletionItem[];
    // visitExpressionText?: (ctx: ExpressionTextContext) => vscode.CompletionItem[];
    // visitVariableRef?: (ctx: VariableRefContext) => vscode.CompletionItem[];
    // visitVariableName?: (ctx: VariableNameContext) => vscode.CompletionItem[];
    // visitStaticValueSingle?: (ctx: StaticValueSingleContext) => vscode.CompletionItem[];
    // visitStaticValueDouble?: (ctx: StaticValueDoubleContext) => vscode.CompletionItem[];
    // visitStaticValue?: (ctx: StaticValueContext) => vscode.CompletionItem[];
    // visitEmptyLine?: (ctx: EmptyLineContext) => vscode.CompletionItem[];

    visitScenario(ctx: ScenarioContext): vscode.CompletionItem[]{
        console.log('Scenariusz: '+ctx.text);

        return [];
    }

 


}