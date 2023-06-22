module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: ['plugin:react/recommended', 'airbnb'],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    plugins: ['react', '@typescript-eslint'],
    rules: {
        indent: ['error', 4],
        'react/jsx-filename-extension': ['off', { extensions: ['.tsx'] }],
        'import/no-unresolved': 'off',
        'import/extensions': 'off',
        'react/jsx-indent': ['error', 4],
        'react/jsx-indent-props': ['error', 4],
        'react/self-closing-comp': [
            'error',
            {
                component: true,
                html: false,
            },
        ],
    },
};
