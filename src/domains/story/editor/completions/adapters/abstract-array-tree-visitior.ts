import { AbstractParseTreeVisitor } from "antlr4ts/tree";
import { StoryVisitor } from "../../../grammar/parser/StoryVisitor";

export class AbstractArrayTreeVisitor<T> extends AbstractParseTreeVisitor<T[]> implements StoryVisitor<T[]> {

    defaultResult(): T[] {
        return [];
    }

    aggregateResult(aggregate: T[], nextResult: T[]): T[]{
        if (aggregate.length && nextResult && nextResult.length){
            aggregate = [
                ...aggregate,
                ...nextResult
            ];
        }
        if (nextResult && nextResult.length){
            aggregate = nextResult;
        }
        return aggregate;
    }
}