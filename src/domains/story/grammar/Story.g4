grammar Story;

// Parser rules

model: 
  line*;

line: 
  (emptyLine | commandLine | unknownLine);

emptyLine:
  WS? COMMENT? EOL;

commandLine:
  WS? commmand endOfLine;

endOfLine:
  EOL | EOF | COMMENT;

comment:
  WS? COMMENT;

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
  featureKeyword WS sectionName;

featureKeyword:
  FEATURE |
  WRONG_FEATURE WS? ':'?;

scenario:
  scenarioKeyword WS sectionName;

scenarioKeyword:
  SCENARIO |
  WRONG_SCENARIO WS? ':'?;

scenarioOutline:
  scenarioOutlineKeyword WS sectionName;

scenarioOutlineKeyword:
  SCENARIO_OUTLINE |
  WRONG_SCENARIO_OUTLINE WS? ':'?;

examples:
  examplesKeyword WS ;

examplesKeyword:
  EXAMPLES |
  WRONG_EXAMPLES WS? ':'?;

given: 
  givenKeyword WS expression;

givenKeyword:
  GIVEN | WRONG_GIVEN;

when: 
  whenKeyword WS expression;

whenKeyword:
  WHEN | WRONG_WHEN;

then:
  thenKeyword WS expression;  

thenKeyword:
  THEN | WRONG_THEN;

and:
  andKeyword WS expression;

andKeyword:
  AND | WRONG_AND;

sectionName:
  ~(EOL | COMMENT)*
;

expression:
  ( expressionText | variableRef | staticValueSingle | staticValueDouble )*
;

expressionText:
  ~(EOL | '<' | SINGLE_QUOTE | DOUBLE_QUOTE | COMMENT)+
;

variableRef:
  REF_OPEN WS? (variableName | wrongVariableName) WS? REF_CLOSE |
  REF_OPEN WS? (variableName | wrongVariableName) WS?;

variableName:
  VARIABLE_NAME;

wrongVariableName:
  ~(REF_CLOSE | EOL | COMMENT)*;

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

fragment SPECIAL_CHARACTER:
  [!?;:,._];

COMMENT:
  '#' ~[\r\n]+;

FEATURE: 'Feature:' ;
WRONG_FEATURE: 
  'Feature' | 
  'feature';

SCENARIO_OUTLINE: 'Scenario Outline:';
WRONG_SCENARIO_OUTLINE: 
  'Scenario Outline' |
  'scenario outline' ;

SCENARIO: 'Scenario:';
WRONG_SCENARIO: 
  'Scenario' |
  'scenario' ;

EXAMPLES: 'Examples:';
WRONG_EXAMPLES: 
  'Examples' |
  'examples';

GIVEN: 'Given';
WRONG_GIVEN: 'given';

WHEN: 'When';
WRONG_WHEN: 'when';

THEN: 'Then';
WRONG_THEN: 'then';

AND: 'And';
WRONG_AND: 'and';

COLON: ':';
REF_OPEN: '<';
REF_CLOSE: '>';
SINGLE_QUOTE: '\'';
DOUBLE_QUOTE: '"'; 

VARIABLE_NAME: ('_' | ENG_LETTER)*( '_' | ENG_LETTER | NUMBER )+;

WORD: ( ENG_LETTER | POLISH_LETTER | NUMBER | SPECIAL_CHARACTER )+;

NUMBER: [0-9]+;

WS: [ \t]+;

EOL: [\r\n]+;

UNKNOWN: .;