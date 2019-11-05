import { Uri, Location, Range, Position } from 'vscode';
import { ParserRuleContext } from 'antlr4ts';




export function createPosition(ctx: ParserRuleContext){
    const line = ctx.start.line - 1;
    const startIndex = ctx.start.charPositionInLine;
    return new Position(line, startIndex);
}

export function createRange(ctx: ParserRuleContext){
    const startPosition = createPosition(ctx);
    const endPosition = startPosition.translate(0, ctx.text.length);
    return new Range(startPosition, endPosition);
}

export function createLocation(uri: Uri, ctx: ParserRuleContext): Location {
    return new Location(uri, createRange(ctx));
}

export function containsPosition(ctx: ParserRuleContext, position: Position){
    const tokenLine = ctx.start.line - 1;
    if (position.line !== tokenLine){
        return false;
    }

    const tokenStartIndex = ctx.start.charPositionInLine;
    const tokenStopIndex = tokenStartIndex + ctx.text.length;

    return position.character >= tokenStartIndex &&
           position.character <= tokenStopIndex;
}