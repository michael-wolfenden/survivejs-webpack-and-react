module.exports = {
    "parser": "babel-eslint",
    "extends": "airbnb",
    "rules": {
        // http://eslint.org/docs/rules/indent
        // indent 4 spaces (rather than airbnb's default of 2)
        "indent": [
            2,
            4,
            { "SwitchCase": 1 }
        ],
        // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-indent-props.md
        // indent 4 spaces (rather than airbnb's default of 2)
        "react/jsx-indent-props": [
            2,
            4
        ],
        "react/prefer-stateless-function": 0
    },
    "env": {
        "mocha": true
    }
}