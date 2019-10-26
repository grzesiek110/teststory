
import { Range, Position } from "vscode";
import { ParserRuleContext } from "antlr4ts";


export function findRangeToReplace(ctx: ParserRuleContext) {
        
    const line = ctx.start.line - 1;
    const startIndex = ctx.start.charPositionInLine;
    const endIndex = startIndex + ctx.text.length;

    return new Range(new Position(line, startIndex), new Position(line, endIndex));
}
