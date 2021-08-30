// prettier.config.js or .prettierrc.js
module.exports = {
    trailingComma: 'es5',
    tabWidth: 4,
    semi: false,
    singleQuote: true,
    printWidth: 200,

    overrides: [
        {
            files: ['src/**/*.html', 'src/**/*.js'],
            options: {
                printWidth: 200,
            },
        },
    ],
}
