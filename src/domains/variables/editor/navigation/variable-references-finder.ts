import { Location, CancellationToken, Uri } from "vscode";
import { getStoryLanguageSupport } from "../../../../extension";
import { AbstractParseTreeVisitor } from "antlr4ts/tree";
import { StoryVisitor } from "../../../story/grammar/parser/StoryVisitor";
import { VariableNameContext } from "../../../story/grammar/parser/StoryParser";
import { createLocation } from "../../../../shared/antlr-vsc.utils";


export function getReferencesToVariable(variableName: string, token: CancellationToken){
    const references: Location[] = [];

    getStoryLanguageSupport().getModels().forEach(model => {
        if (token.isCancellationRequested){
            return [];
        }

        model.getContext().accept(new VariableReferenceVisitior(variableName, model.uri, references));
    });

    return references;
}

class VariableReferenceVisitior extends AbstractParseTreeVisitor<void> implements StoryVisitor<void> {

    constructor(
        private searchVariableName: string,
        private fileUri: Uri,
        private references: Location[]){

        super();
    }

    protected defaultResult() {}

    visitVariableName(ctx: VariableNameContext){
        if (ctx.text === this.searchVariableName){
            this.references.push(createLocation(this.fileUri, ctx));
        }
    }
}