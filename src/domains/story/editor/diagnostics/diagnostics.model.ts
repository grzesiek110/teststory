import * as vscode from 'vscode';
import { StoryModel } from '../../grammar/model';

export interface DiagnosticsProviderRule {
	createDiagnostics(uri: vscode.Uri, diagnostics: vscode.Diagnostic[], model: StoryModel): void;
}
