module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es2022: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:jsx-a11y/recommended',
    'next/core-web-vitals', // This includes the Next.js rules
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
    project: './tsconfig.json', // For type-aware rules
  },
  plugins: [
    '@typescript-eslint',
    'react',
    'import',
    'jsx-a11y',
  ],
  settings: {
    react: {
      version: 'detect',
    },
    'import/resolver': {
      typescript: {},
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
  rules: {
    // General rules
    'no-console': ['warn', { allow: ['warn', 'error'] }],
    'prefer-const': 'error',
    
    // TypeScript rules
    '@typescript-eslint/explicit-module-boundary-types': 'off', // Too verbose for React components
    '@typescript-eslint/no-unused-vars': ['error', { 
      argsIgnorePattern: '^_',
      varsIgnorePattern: '^_', 
    }],
    '@typescript-eslint/no-explicit-any': 'warn',
    
    // React rules
    'react/react-in-jsx-scope': 'off', // Not needed in Next.js with new JSX transform
    'react/prop-types': 'off', // Use TypeScript for prop validation
    'react/jsx-sort-props': ['warn', {
      callbacksLast: true,
      shorthandFirst: true,
      ignoreCase: false,
      reservedFirst: true,
    }],
    
    // Import rules
    'import/order': ['warn', {
      'groups': ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'object', 'type'],
      'newlines-between': 'always',
      'alphabetize': { order: 'asc', caseInsensitive: true },
    }],
    'import/no-duplicates': 'error',
    
    // Tailwind-friendly rules
    'react/no-unknown-property': ['error', { ignore: ['css'] }], // For CSS-in-JS libraries
    'max-len': 'off', // Don't limit line length (for Tailwind classes)
    'jsx-a11y/alt-text': 'error', // Ensure all images have alt text
  },
  overrides: [
    // App Router special files
    {
      files: [
        'app/[locale]/**/page.tsx',
        'app/[locale]/**/layout.tsx',
        'app/**/page.tsx',
        'app/**/layout.tsx',
        'app/**/loading.tsx',
        'app/**/error.tsx',
        'middleware.ts',
        'app/api/**/route.ts',
      ],
      rules: {
        'import/no-default-export': 'off',
        '@typescript-eslint/ban-ts-comment': 'off',
        'react-hooks/exhaustive-deps': 'off', // Often not needed in static components like layouts
      },
    },
    // Special config for middleware.ts
    {
      files: ['middleware.ts'],
      rules: {
        '@typescript-eslint/no-unused-vars': 'off', // Middleware may have unused params from Next.js
      },
    },
    // Special config for next-intl messages
    {
      files: ['i18n/locales/*.json'],
      rules: {
        'max-len': 'off',
        'quote-props': 'off',
      },
    },
  ],
};
