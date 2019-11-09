# TestStory (beta) - VSC editor for scrum stories with tests #
Write scrum stories with tests before engineers write first line of application code. Your stories (**\*.story**) are valid cucumber tests built from set of declared rules (**\*.rules**) and variables (**\*.var**). You can create any number of stories, rules and varibles to describe your application. Later e2e enginners will implement those declarations as cucumber steps and pages to use your stories as valid selenium tests


### You can install beta version from [Visual Studio Code Marketplace](https://marketplace.visualstudio.com/items?itemName=grzesiek110.teststory) ###

## Declarative stories ##
You can write stories before engineers start to develop code 

![teststory](https://raw.githubusercontent.com/grzesiek110/teststory/master/manual/description.png)

![files](https://raw.githubusercontent.com/grzesiek110/teststory/master/manual/files.png)

## IntelliSense 
Full Intelisense based on declarations of rules and variables

![intellisense](https://raw.githubusercontent.com/grzesiek110/teststory/master/manual/intellisense.gif)

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