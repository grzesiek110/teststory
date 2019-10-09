// import * as vscode from 'vscode';
// import { AstElement } from './element';
// import { ExpressionContext, ExpressionTextContext, GivenContext, VariableRefContext, VariableNameContext } from '../parser/StoryParser';
// import { StoryVisitor } from '../parser/StoryVisitor';

// import { ParseTree, AbstractParseTreeVisitor } from 'antlr4ts/tree';

// export type AstExpressionType = 'GIVEN' | 'WHEN' | 'THEN' | 'AND';


// export class AstExpression {
//     expressionMask: string;
//     expressionProposal: string;
//     expressionRefs: string[];

//     constructor(public type: AstExpressionType){
//         this.buildInternalStructure();
//     }

//     provideCompletionItems(): vscode.CompletionItem[] {
//         return [];
//     }

//     getErrors(){}

//     private buildInternalStructure() {
//         this.expressionToken.children.forEach(node => this.addExpressionPart(node));
//     }

//     private addExpressionPart(node: ParseTree): void {
//         node.accept();
//     }


// }

// export function buildExpression(){

// }

// class ExpressionBuilder extends AbstractParseTreeVisitor<void> implements StoryVisitor<void>{
//     private expression: AstExpression;
    
//     visitGiven(ctx: GivenContext) {
//         this.expression = new AstExpression('GIVEN');
//     }

//     visitWhen(ctx: GivenContext) {
//         this.expression.type = 'WHEN';
//     }

//     visitThen(ctx: GivenContext) {
//         this.expression.type = 'THEN';
//     }

//     visitAnd(ctx: GivenContext) {
//         this.expression.type = 'AND';
//     }

//     visitExpressionText(ctx: ExpressionTextContext) {
//         this.expression.expressionMask += ctx.text; 
//     }

//     visitVariableRef(ctx: VariableRefContext) {
//         const paramNumber = this.expression.expressionRefs.length + 1;
//         this.expression.expressionProposal += ('${'+paramNumber+'}');
//         this.expression.expressionMask += '<.s>';
//     }

//     visitVariableName(ctx: VariableNameContext) {
//         this.expression.expressionRefs.push(ctx.text);
//     }

//     protected defaultResult(): void {
//     }

// }
