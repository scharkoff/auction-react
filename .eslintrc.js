module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: ['plugin:react/recommended', 'airbnb', 'prettier'],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    plugins: ['react', '@typescript-eslint', 'prettier'],
    rules: {
        indent: ['error', 4],
        'no-unused-vars': 'warn',
        'import/no-unresolved': 'off',
        'import/extensions': 'off',
        'import/order': 'off',
        'import/prefer-default-export': 'off',
        'react/jsx-filename-extension': 'off',
        'react/prop-types': 'off',
        'react/jsx-indent': ['error', 4],
        'react/jsx-indent-props': ['error', 4],
        'react/self-closing-comp': [
            'error',
            {
                component: false,
                html: false,
            },
        ],
    },
};
