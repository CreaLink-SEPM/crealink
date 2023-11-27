module.exports = {
    semi: true,
    trailingComma: 'all',
    singleQuote: true,
    printWidth: 120,
    tabWidth: 2,
    arrowParens: 'avoid',
    overrides: [
      {
        files: '*.json',
        options: {
          printWidth: 80,
        },
      },
    ],
  };