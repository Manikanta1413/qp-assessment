module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  globals: {
    "ts-jest": {
      tsconfig: "tsconfig.json",
    },
  },
  moduleFileExtensions: ["ts", "js"],
  testMatch: ["*/tests//.test.ts"],
  transform: {
    "^.+\\.ts$": "ts-jest",
  },
};
