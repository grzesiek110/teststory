# TestStory
## VSC Editor for scrum stories with acceptance tests

&nbsp;

## Declarative IntelliSense 
You can write tests using declarations of rules and variable before developers create real application code. 


![write-story](https://raw.githubusercontent.com/grzesiek110/teststory/master/manual/write-story.gif)

## Quick fix errors in E2E tests
Editor supports rich error diagnostics to help write bug free tests

![fix-errors](https://raw.githubusercontent.com/grzesiek110/teststory/master/manual/fix-error.gif)

## Navigation
Fast navigation between stories and declaration of rules and variables

![navigation](https://raw.githubusercontent.com/grzesiek110/teststory/master/manual/navigation.gif)

## Perspective
Own perspective with all stories, rules and variables

![perspective](https://raw.githubusercontent.com/grzesiek110/teststory/master/manual/perspective.gif)

## Story as documentation
Editor support markdown grammar 

![docs](https://raw.githubusercontent.com/grzesiek110/teststory/master/manual/documentation.jpg)


## Source code

GitHub: https://github.com/grzesiek110/teststory

- Run `npm install` in terminal to install dependencies
- Run `npm run grammar-variables` to generate ANTLR grammar for variables files
- Run `npm run grammar-rules` to generate ANTLR grammar for rules files
- Run `npm run grammar-story` to generate ANTLR grammar for story files
- Run the `Run Extension` target in the Debug View. This will:
	- Start a task `npm: watch` to compile the code
	- Run the extension in a new VS Code window