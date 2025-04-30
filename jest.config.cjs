module.exports = {
  preset: 'jest-expo',
  testMatch: ['<rootDir>/e2e/**/*.test.ts?(x)'],
  setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
  transform: {
    '^.+\\.[jt]sx?$': 'babel-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  transformIgnorePatterns: [
    'node_modules/(?!(expo-modules-core|expo(nent)?|@expo(nent)?/.*|react-native.*|@react-native.*))',
  ],
};