module.exports = {
  plugins: [
    {
      rules: {
        'custom-regex': ({ header }) => [
          /^(feat|fix|chore|docs|style|refactor|test|build)\((\*|[a-z]{3,})\): [a-z](?:[a-z-]*[a-z])+(?:\s+[a-z](?:[a-z-]*[a-z])+)*$/.test(
            header,
          ),
          `Invalid format! Use:\n`
            + `"type(scope): subject"\n`
            + `- Type: feat|fix|chore|docs|style|refactor|test\n`
            + `- Scope: "*" or lowercase letters (3+)\n`
            + `- Subject: Lowercase words (3+ letters each, single spaces)`,
        ],
      },
    },
  ],
  rules: {
    'custom-regex': [2, 'always'],
    'header-trim': [2, 'always', { chars: 'both' }],
    'scope-case': [0],
    'subject-case': [0],
    'type-case': [0],
    'type-enum': [0],
  },
};
