grammar Variables;

// Parser rules

model:
  line*;

line: 
  (emptyLine | variableDefinition | commentLine | emptyLine );


emptyLine:
  WS? EOL;


variableDefinition: 
    commentLine*
    variableLine;        

commentLine:
  WS? commentText endOfLine;

commentText:
  ~(VARIABLE | WS | EOL)+ ~EOL*;

variableLine:
  WS? VARIABLE WS variableName variableTypeRef? variableWrongData? endOfLine;

variableName:
  validVariableName | wrongVariableName;

validVariableName:
  WORD;

wrongVariableName:
  ~(WS | EOF)*; 

variableTypeRef:
  WS? COLON WS? variableType;

variableType:
  WORD
;

variableWrongData:
   WS? ~COLON (EOL)*; 


endOfLine:
  EOL | EOF;



// Lexer rules

VARIABLE: 'Var:' | 'var:';

COLON: ':';

fragment POLISH_LETTER:
  [\u0104\u0105\u0106\u0107\u0118\u0119\u0141\u0142\u0143\u0144\u00D3\u00F3\u015A\u015B\u0179\u017A\u017B\u017C];
  
fragment ENG_LETTER:
  [a-zA-Z];

fragment SPECIAL_CHARACTER:
  [!?;:,._];

fragment NUMBER: 
  [0-9]+;

WORD: ( ENG_LETTER | POLISH_LETTER | NUMBER )+;


WS: [ \t]+;

EOL: [\r\n]+;


UNKNOWN: .;