module.exports = {
  "env": {
    "browser": true,
    "es6": true,
    "node": true
  },
  "extends": [
    "airbnb-base"
  ],
  "ignorePatterns": [
    "test/**/*"
  ],
  "overrides": [
    {
      "files": [
        "**/*.ts"
      ],
      "extends": [
        "airbnb-typescript/base",
        "plugin:@typescript-eslint/recommended",
        "plugin:@typescript-eslint/recommended-requiring-type-checking",
        "plugin:eslint-comments/recommended"
      ],
      "parserOptions": {
        "project": "./tsconfig.eslint.json"
      },
      "rules": {
        "@typescript-eslint/no-unsafe-member-access": "off",
        "@typescript-eslint/unbound-method": [
          "error",
          {
            "ignoreStatic": true
          }
        ],
        "eslint-comments/disable-enable-pair": "off",
        "import/no-extraneous-dependencies": [
          "error",
          {
            "devDependencies": true
          }
        ],
        "no-underscore-dangle": "off",
        "linebreak-style": 0
      }
    }
  ]
}
