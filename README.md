# my-node-boilerplate

1. Install Yarn
```
$ brew install yarn
$ yarn init
```
2. Add Eslint

_Eslint:_

```
$ yarn add --dev eslint
```

_Presets:_

```
$ yarn add --dev eslint-config-airbnb 
```

_Peer dependency:_

```
$ yarn add --dev eslint-plugin-import &&
yarn add --dev eslint-plugin-jsx-a11y &&
yarn add --dev eslint-plugin-import &&
yarn add --dev eslint-plugin-react
```

_Plugins for Visual Studio Code:_

```
$ ext install prettier-vscode
$ ext install vscode-eslint
```

_Turns off all rules that are unnecessary or might conflict with Prettier:_

```
$ yarn add --dev eslint-config-prettier
```

_Config eslint to package.json:_

```javascript
"eslintConfig": {
    "root": true,
    "extends": [
      "airbnb-base",
      "prettier"
    ],
    "env": {
      "node": true
    }
  }
  ```

3. Add Babel

_Core:_

```
$ yarn add babel-core &&
yarn add babel-preset-env &&
yarn add --dev babel-register
```

_Config Babel to package.json:_

```javascript
"babel": {
    "presets": [
      [
        "env",
        {
          "targets": {
            "node": "current"
          }
        }
      ]
    ]
  }
```

4. Add babel-cli:

```
$ yarn add babel-cli &&
yarn add rimraf
```

5. Other:

```
$ yarn add --dev pre-commit
$ yarn add --dev lint-staged
```

Run:

```
$ npm run start 
```
_or_
```
$ yarn run start
```