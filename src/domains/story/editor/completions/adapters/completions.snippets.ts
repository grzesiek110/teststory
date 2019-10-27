export const default_feature_for_empty_file = 
`Feature: \${1:Name of this cucumber feature} 

#
### Story: You can describe your story here using markdown syntax ###


As a | I want to | So that      
------- | ---------------- |  :--------
user  | select some elements and click on buttons | I will be happy :)     

#
### Acceptance tests: ###


\${2|Scenario,Scenario Outline|}: \${3:Name of your scenario}

  \${4|Given,When|} \$0`;


export const new_scenario = 
  `\${1|Scenario,Scenario Outline|}: \${2:Name of your scenario}
      
      Given \$0 `;

