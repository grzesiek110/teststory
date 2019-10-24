import * as vscode from 'vscode';
import { StoryModel } from '../../grammar/model';

export interface DiagnosticsProviderRule {
	createDiagnostics(document: vscode.TextDocument, diagnostics: vscode.Diagnostic[], model: StoryModel): void;
}
