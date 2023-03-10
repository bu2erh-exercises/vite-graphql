module.exports = {
    env: {
        browser: true,
        es2021: true,
        node: true
    },
    extends: [
        'eslint:recommended',
        'plugin:vue/vue3-essential',
        'plugin:@typescript-eslint/recommended',
        'plugin:prettier/recommended'
    ],
    overrides: [],
    parser: 'vue-eslint-parser',
    parserOptions: {
        parser: '@typescript-eslint/parser',
        ecmaVersion: 'latest',
        sourceType: 'module'
    },
    plugins: ['vue', '@typescript-eslint'],
    rules: {
        // 'prettier/prettier': 'off',
        'vue/multi-word-component-names': 'off',
        'vue/no-mutating-props': 'off',
        // 禁用 console
        'no-console': 'off',
        // 禁用 debugger
        'no-debugger': 'off',
        // 禁止出现未使用过的变量
        // 'no-unused-vars': 2,
        'no-unused-vars': ['error', { vars: 'all', args: 'all' /**"after-used" */ }],
        // 强制使用一致的单引号
        quotes: ['error', 'single'],
        // 控制行尾部分号
        semi: ['error', 'never']
    }
}
