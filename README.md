# Memo App

Mobile App built for [Proyecto Final, Grupo QUACK](https://www.intec.edu.do) in React Native 0.60

## Table of Contents

- [Requirements](#requirements)
- [Technologies](#technologies)
- [Project folder structure](#project-folder-structure)
- [Installation](#installation)
- [Usage](#usage)

## Requirements

- All packages **must** be installed using Yarn.
- All branches need to pass eslint test
- All theme style need to be provided by the Core/Theme file

- !Important! All branches need to have the format: `yourinitials/(feature-bugfix-hotfix)/name-branch`. Ex: jrtv/feature/setup-redux

## Technologies

**Built with**

- [Javascript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
- [React Native](https://facebook.github.io/react-native/)
- [ESlint](https://eslint.org/)
- [Prettier](https://prettier.io/)
- [Yarn Package Manager](https://yarnpkg.com/en/)
- [Node version Manager](https://github.com/creationix/nvm)

## Project folder structure

```
/App
  /Components
    /NonReusableComponent1
    /NonReusableComponent2
    /NonReusableComponent3
    /Common
      /ReusableComponent1
      /ReusableComponent2
      /ReusableComponent3
  /Screens
    /Screen1
    /Screen12
    /Screen13
  /Core
    /Theme
  /Redux
    /Common
```

## Installation

1. Clone the project to your preferred local directory.

```sh
$ git clone
```

2. Run **yarn install** inside the root folder to install all the project dependencies.

```sh
$ yarn install
```

## **Run Redux Devtools**

1. Need to have install [React Native Debugger](https://github.com/jhen0409/react-native-debugger) app in your machine.

2. Then run your app and enable Remote Debug JS.

3. Open React Native Debugger and edit the config file with your port number where is your debugger running in the web browser and save these changes.

   - Look something like this in the config file:
  ```sh
    // RNDebugger will open debugger window with the ports when app launched
    defaultRNPackagerPorts: [YOUR_PORT_NUMBER],
  ```

4. Close the tab where is your debugger-cli running.

5. Restart the app (React Native Debugger).

6. Then refresh your app in your device.