import * as vscode from 'vscode';

import { RulesLanguageSupport } from './domains/rules/editor/rules.language-support';
import { AvailableRulesService } from './domains/rules/editor/services/available-rules.service';
import { AvailableStoryScenariosService } from './domains/story/editor/services/available-scenarios.service';
import { StoryLanguageSupport } from './domains/story/editor/story.language-support';
import { AvailableVariablesService } from './domains/variables/editor/services/available-variables.service';
import { VariablesLanguageSupport } from './domains/variables/editor/variables.language-support';


const storyLanguageSupport = new StoryLanguageSupport();
const rulesLanguageSupport = new RulesLanguageSupport();
const variablesLanguageSupport = new VariablesLanguageSupport();

const availableRulesService = new AvailableRulesService(rulesLanguageSupport);
const availableVariablesService = new AvailableVariablesService(variablesLanguageSupport);
const availableScenariosService = new AvailableStoryScenariosService(storyLanguageSupport);

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

export function getVariablesLanguageSupport() {
	return variablesLanguageSupport;
}

export function getAvailableRulesService() {
	return availableRulesService;
}

export function getAvailableVariablesService() {
	return availableVariablesService;
}

export function getAvailableScenariosService() {
	return availableScenariosService;
}

export function activate(context: vscode.ExtensionContext) {

	vscode.window.withProgress({
		location: vscode.ProgressLocation.Window,
		title: "TestStory initialization",
		cancellable: true
	}, (progress, token) => {

		return new Promise(async (resolve, reject) => {
			logToOutput('TestStory initialization...');

			await variablesLanguageSupport.initialize(context);
			showProgressWithCancel(25, progress, token, reject);

			await rulesLanguageSupport.initialize(context);
			showProgressWithCancel(25, progress, token, reject);

			await storyLanguageSupport.initialize(context);
			showProgressWithCancel(25, progress, token, reject);
	
			variablesLanguageSupport.registerProviders(context);	
			rulesLanguageSupport.registerProviders(context);	
			storyLanguageSupport.registerProviders(context);	
			showProgressWithCancel(15, progress, token, reject);

			
			logToOutput('TestStory ready!');
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
