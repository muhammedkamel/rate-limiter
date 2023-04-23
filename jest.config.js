require('dotenv').config({ path: '.env.testing' });

module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    testMatch: ['**/*.test.ts'],
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1',
    },
    globals: {
        __DEV__: true,
    },
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
    },
};
