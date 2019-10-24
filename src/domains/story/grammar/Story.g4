grammar Story;

// Parser rules

model: 
  line*;

line: 
  emptyLine | commandLine | unknownLine;

emptyLine:
  WS? EOL;

commandLine:
  WS? commmand (EOL | EOF);

unknownLine:
  WS? ~(FEATURE | SCENARIO | SCENARIO_OUTLINE | EXAMPLES | GIVEN | WHEN | THEN | AND) ~EOL*;

commmand: 
  feature | 
  scenario |
  given |
  when |
  then |
  and;

feature:
  FEATURE WS sectionName;

scenario:
  SCENARIO WS sectionName;

scenarioOutline:
  SCENARIO_OUTLINE WS sectionName;

examples:
  EXAMPLES WS ;

given: 
  GIVEN WS expression;

when: 
  WHEN WS expression;

then:
  THEN WS expression;  

and:
  AND WS expression;

sectionName:
  ~EOL*
;

expression:
  ( expressionText | variableRef | staticValueSingle | staticValueDouble )*
;

expressionText:
  ~(EOL | '<' | SINGLE_QUOTE | DOUBLE_QUOTE )+
;

variableRef:
  REF_OPEN WS? variableName WS? REF_CLOSE;

variableName:
  VARIABLE_NAME;

staticValueSingle:
  SINGLE_QUOTE staticValue SINGLE_QUOTE;

staticValueDouble:
  DOUBLE_QUOTE staticValue DOUBLE_QUOTE;

staticValue:
  ~(SINGLE_QUOTE | DOUBLE_QUOTE)+
;


// Lexer rules

fragment POLISH_LETTER:
  [\u0104\u0105\u0106\u0107\u0118\u0119\u0141\u0142\u0143\u0144\u00D3\u00F3\u015A\u015B\u0179\u017A\u017B\u017C];
  
fragment ENG_LETTER:
  [a-zA-Z];

fragment SPECIAL_LETTER:
  [!?;,._];

FEATURE: 'Feature:' ;
SCENARIO_OUTLINE: 'Scenario Outline:';
SCENARIO: 'Scenario:';
EXAMPLES: 'Examples:';
GIVEN: 'Given';
WHEN: 'When';
THEN: 'Then';
AND: 'And';

REF_OPEN: '<';
REF_CLOSE: '>';
SINGLE_QUOTE: '\'';
DOUBLE_QUOTE: '"'; 

VARIABLE_NAME: '_'?( ENG_LETTER | '_')+;

WORD: ( ENG_LETTER | POLISH_LETTER | NUMBER | SPECIAL_LETTER )+;

NUMBER: [0-9]+;

WS: [ \t]+;

EOL: [\r\n]+;

