export type MainRuleType = 'GIVEN' | 'WHEN' | 'THEN';
export type ExtendedRuleType =  MainRuleType | 'AND';

export const STORY_EXTENSION = 'story';
export const RULES_EXTENSION = 'rules';
export const VARIABLES_EXTENSION = 'var';
