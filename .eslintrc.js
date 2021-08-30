module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: ['plugin:react/recommended', 'airbnb', 'prettier'],
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 12,
        sourceType: 'module',
    },
    plugins: ['react', 'prettier'],
    rules: {
        'prettier/prettier': ['error', { endOfLine: 'auto' }],
        'react/jsx-props-no-spreading': 'off',
        'react/forbid-prop-types': 'off',
        'react/prop-types': 'off',
        'global-require': 0,
    },
    settings: {
        'import/resolver': {
            node: {
                paths: ['src'],
            },
        },
    },
}
