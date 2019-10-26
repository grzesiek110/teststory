
import * as vs from 'vscode';
import * as path from 'path';

import { parseStoryModel } from '../grammar/model/builder';
import { StoryModel } from '../grammar/model';


interface ModelDatabase {
    [key: string]: StoryModel;
}

interface StoryModelListener {
    modelChanged(uri: vs.Uri, model: StoryModel): void;
}

export class StoryLanguageSupport {
    readonly STORY_EXTENSION = '.story';

    models: ModelDatabase = {};
    listeners: StoryModelListener[] = [];

    async initialize(context: vs.ExtensionContext){
    
        vs.window.withProgress({
            location: vs.ProgressLocation.Window,
            title: "TestStory initialization",
            cancellable: true
        }, (progress, token) => {

            return new Promise((resolve, reject) => {
                progress.report({ increment: 0 });
                token.onCancellationRequested(() => {
                    reject();
                });
    
                this.registerListeners(context);
                progress.report({ increment: 10 });

                //const files = await vs.workspace.findFiles('**​/*.story');

                vs.workspace.textDocuments.forEach(document => this.activateEditor(document));
                progress.report({ increment: 100 });

                resolve();
            });
        });
    }

    private registerListeners(context: vs.ExtensionContext) {
        vs.workspace.onDidChangeTextDocument(changeEvent => this.textDocumentChange(changeEvent));
        vs.workspace.onDidOpenTextDocument(document => this.textDocumentOpen(document));
        context.subscriptions.push(vs.window.onDidChangeActiveTextEditor(editor => {
            if (editor) {
                this.activateEditor(editor.document);
            }
        }));
    }

    getModel(uri: vs.Uri): StoryModel {
        return this.models[uri.path];
    }

    registerOnModelChange(listener: StoryModelListener){
        this.listeners.push(listener);
    }

    private activateEditor(document: vs.TextDocument) {
        if (this.isThisStoryDocument(document)){
            this.updateModel(document);
        }
    }

    private textDocumentChange(event: vs.TextDocumentChangeEvent): any {
        const document = event.document;
        if (this.isThisStoryDocument(document)){
            this.updateModel(document);
        }        
    }

    private textDocumentOpen(document: vs.TextDocument): any {
        if (this.isThisStoryDocument(document)){
            console.log('opnme');
            this.updateModel(document);
        }        
    }
    
    private updateModel(document: vs.TextDocument) {
        const documentUri = document.uri;

        const storyModel = parseStoryModel(document);
        this.models[documentUri.path] = storyModel;

        this.listeners.forEach(listener => listener.modelChanged(documentUri, storyModel));
    }

    private isThisStoryDocument(document: vs.TextDocument) {
        return document && path.extname(document.uri.fsPath) === this.STORY_EXTENSION;
    }
}

