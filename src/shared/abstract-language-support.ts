import * as vs from 'vscode';
import * as path from 'path';
import { TextDecoder } from 'util';
import { logToOutput } from '../extension';

export interface ModelWithUri {
    uri: vs.Uri;
}

export interface ModelChangeListener<T> {
    modelAdded(uri: vs.Uri, model: T): void;
    modelRemoved(uri: vs.Uri, model: T): void;
    modelChanged(uri: vs.Uri, previous: T, current: T): void;
}

interface ModelsForUri<T> {
    [key: string]: T;
}


export abstract class AbstractLangageSupport<T extends ModelWithUri> {
    listeners: ModelChangeListener<T>[] = [];
    models: ModelsForUri<T> = {};

    constructor(public fileExtension: string){}

    abstract parseContent(documentUri: vs.Uri, content: string): T;

    async initialize(_context: vs.ExtensionContext){
        await this.createModelsForAllModelFiles();
        this.registerListeners();
    }

    registerModelChangeListener(listener: ModelChangeListener<T>){
        this.listeners.push(listener);
    }

    getModel(uri: vs.Uri): T {
        return this.models[uri.path];
    }

    protected updateAllModels(){
        Object.values(this.models).forEach(model => {
            this.updateModel(model.uri);
        });
    }

    protected updateModel(uri: vs.Uri) {
        const editorDocument = vs.workspace.textDocuments.find(document => document.uri.path === uri.path);
        if (editorDocument) {
            this.readModelFromOpenEditor(editorDocument);
        } else {
            this.readModelFromFile(uri);
        }
    }

    private async createModelsForAllModelFiles() {
        const modelUris = await this.findAllFilesWithModels();
        modelUris.forEach(uri => this.updateModel(uri));
    }

    private registerListeners() {
        vs.workspace.onDidChangeTextDocument(changeEvent => this.textDocumentChange(changeEvent));
        vs.workspace.onDidOpenTextDocument(document => this.textDocumentOpen(document));        
        
        for (let workspace of vs.workspace.workspaceFolders){
            const filesPattern = new vs.RelativePattern(workspace, `**/*.${this.fileExtension}`);
            const fileSystemWatcher = vs.workspace.createFileSystemWatcher(filesPattern);
            fileSystemWatcher.onDidCreate(uri => this.createNewRulesFile(uri));
            fileSystemWatcher.onDidDelete(uri => this.deleteRulesFile(uri));
            fileSystemWatcher.onDidChange(uri => this.modifyRulesFile(uri));    
        }
    }
    
    private createNewRulesFile(uri: vs.Uri): any {
        this.updateModel(uri);
    }

    private deleteRulesFile(uri: vs.Uri): any {
        this.removeModelStructure(uri);
    }

    private modifyRulesFile(uri: vs.Uri): any {
        this.updateModel(uri);
    }

    private textDocumentChange(event: vs.TextDocumentChangeEvent): any {
        const document = event.document;
        if (this.isModelFile(document.uri)){
            this.readModelFromOpenEditor(document);
        }        
    }

    private textDocumentOpen(document: vs.TextDocument): any {
        if (this.isModelFile(document.uri)){
            this.readModelFromOpenEditor(document);
        }        
    }

    private isModelFile(uri: vs.Uri) {
        return path.extname(uri.fsPath) === `.${this.fileExtension}`;
    }

    private async findAllFilesWithModels() {
        const sortedUris: vs.Uri[] = [];
        const uniqueUriSet: Set<string> = new Set();
        
        // all files in opened editors
        vs.workspace.textDocuments.forEach(document => {
            if (document.uri.scheme === 'file' && this.isModelFile(document.uri) && !uniqueUriSet.has(document.uri.path)){
                uniqueUriSet.add(document.uri.path);
                sortedUris.push(document.uri);
            }
        });
        
        // all other files        
        for (let workspace of vs.workspace.workspaceFolders){
            const filesPattern = new vs.RelativePattern(workspace, `**/*.${this.fileExtension}`);
            const files = await vs.workspace.findFiles(filesPattern);
            files.forEach(uri => {
                if (uri.scheme === 'file' && !uniqueUriSet.has(uri.path)){
                    uniqueUriSet.add(uri.path);        
                    sortedUris.push(uri);
                }
            });
        }
        
        return sortedUris;
    }

    private readModelFromOpenEditor(editorDocument: vs.TextDocument){
        this.parseContentAndUpdateModel(editorDocument.uri, editorDocument.getText());
    }

    private async readModelFromFile(uri: vs.Uri) {
        const fileContent = await vs.workspace.fs.readFile(uri);
        var content = new TextDecoder("utf-8").decode(fileContent);
        this.parseContentAndUpdateModel(uri, content);
    }

    private parseContentAndUpdateModel(documentUri: vs.Uri, content: string) {
        const current = this.parseContent(documentUri, content);
        this.updateModelStructure(current);
    }

    private updateModelStructure(newModel: T){
        const previous = this.models[newModel.uri.path];
        
        this.models[newModel.uri.path] = newModel;
        this.fireModelChangedEvent(newModel.uri, previous, newModel);
    }

    private removeModelStructure(uri: vs.Uri){
        const removedModel = this.models[uri.path];
        if (removedModel){
            this.fireModelRemovedEvent(uri, removedModel);
        }
    }

    private fireModelChangedEvent(documentUri: vs.Uri, previous: T, current: T) {
        if (previous){
            setTimeout(() => this.listeners.forEach(listener => listener.modelChanged(documentUri, previous, current)), 0);
        } else {
            setTimeout(() => this.listeners.forEach(listener => listener.modelAdded(documentUri, current)), 0);
        }
    }

    private fireModelRemovedEvent(documentUri: vs.Uri, removedModel: T) {
        setTimeout(() => this.listeners.forEach(listener => listener.modelRemoved(documentUri, removedModel)), 0);
    }
}