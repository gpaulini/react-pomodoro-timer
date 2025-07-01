import config from '@rocketseat/eslint-config/react.mjs'
import erasableSyntaxOnly from 'eslint-plugin-erasable-syntax-only'

const altConfig = {
  ...config,
  rules: {
    '@typescript-eslint/no-explicit-any': 'off',
  },
}

export default [
  ...altConfig,
  erasableSyntaxOnly.configs.recommended,
]
