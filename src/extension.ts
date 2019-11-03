import * as vscode from 'vscode';

import { RulesLanguageSupport } from './domains/rules/editor/rules.language-support';
import { AvailableRulesService } from './domains/rules/editor/services/available-rules.service';
import { createCompletionItemProvider } from './domains/story/editor/completions/completions.provider';
import { createDiagnosticsProvider } from './domains/story/editor/diagnostics/diagnostics.provider';
import { StoryLanguageSupport } from './domains/story/editor/story.language-support';
import { AvailableVariablesService } from './domains/variables/variables.service';
import { ExpressionsView } from './domains/rules/editor/views/expressions.view';


const storyLanguageSupport = new StoryLanguageSupport();
const rulesLanguageSupport = new RulesLanguageSupport();
const availableRulesService = new AvailableRulesService(rulesLanguageSupport);
const availableVariablesService = new AvailableVariablesService();

const outputChanel = vscode.window.createOutputChannel('TestStory');

export function logToOutput(message: string){
	outputChanel.appendLine(message);
}


export function getStoryLanguageSupport() {
	return storyLanguageSupport;
}

export function getRulesLanguageSupport() {
	return rulesLanguageSupport;
}

export function getAvailableRulesService() {
	return availableRulesService;
}

export function getAvailableVariablesService() {
	return availableVariablesService;
}

export function activate(context: vscode.ExtensionContext) {

	vscode.window.withProgress({
		location: vscode.ProgressLocation.Window,
		title: "TestStory initialization",
		cancellable: true
	}, (progress, token) => {

		return new Promise(async (resolve, reject) => {
			logToOutput('Test story initialization...');

			await rulesLanguageSupport.initialize(context);
			showProgressWithCancel(30, progress, token, reject);

			await storyLanguageSupport.initialize(context);
			showProgressWithCancel(30, progress, token, reject);
	
			createDiagnosticsProvider(storyLanguageSupport);	
			context.subscriptions.push(createCompletionItemProvider(storyLanguageSupport));
			showProgressWithCancel(10, progress, token, reject);

			
			// tslint:disable-next-line: no-unused-expression
			new ExpressionsView(context);
			showProgressWithCancel(10, progress, token, reject);
			
			logToOutput('Test story ready!');
			resolve();
		});
	});	
}

function showProgressWithCancel(
	value: number,
	progress: vscode.Progress<{ message?: string; increment?: number; }>, 
	token: vscode.CancellationToken, 
	reject: (reason?: any) => void) {

	progress.report({ increment: value });
	token.onCancellationRequested(() => reject());
}

export function deactivate() {
	
}
