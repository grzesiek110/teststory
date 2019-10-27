export const default_feature_for_empty_file = 
  `Feature: \${1:Name of this cucumber feature} 

    \${2|Scenario,Scenario Outline|}: \${3:Name of your scenario}

      \${4|Given,Then,When|} \${0}`;


export const new_scenario = 
  `\${1|Scenario,Scenario Outline|}: \${2:Name of your scenario}
      
      Given \${0}`;



