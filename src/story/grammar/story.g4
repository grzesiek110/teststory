grammar Story;

// Parser rules

model:
    emptyLine*
    feature
    emptyLine*
;

feature:
  WS? FEATURE WS sectionName
  emptyLine*
  scenario*
;

scenario:
  WS? SCENARIO WS sectionName
  emptyLine*

  given*
  when*
  then*
;

sectionName:
  ~EOL*
;


given: 
  WS? GIVEN WS expression
  emptyLine*
  and*
;

when: 
  WS? WHEN WS expression
  emptyLine*
  and*
;

then:
  WS? THEN WS expression
  emptyLine*
  and*
;  

and:
  WS? AND WS expression
  emptyLine*
;

expression:
  ( expressionText | variableRef | staticValueSingle | staticValueDouble )*
;

expressionText:
  ~(EOL | '<' | SINGLE_QUOTE | DOUBLE_QUOTE )+
;

variableRef:
  '<' WS? variableName WS? '>';

variableName:
  VARIABLE_NAME;

staticValueSingle:
  '\'' staticValue '\'';

staticValueDouble:
  '"' staticValue '"';

staticValue:
  ~(SINGLE_QUOTE | DOUBLE_QUOTE)+
;

emptyLine:
  WS? EOL
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

SINGLE_QUOTE: '\'';
DOUBLE_QUOTE: '"'; 

VARIABLE_NAME: '_'?( ENG_LETTER | '_')+;

WORD: ( ENG_LETTER | POLISH_LETTER | NUMBER | SPECIAL_LETTER )+;

NUMBER: [0-9]+;

WS: [ \t]+;

EOL: [\r\n]+;

