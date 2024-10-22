module.exports = {
    testEnvironment: 'jest-environment-jsdom', // This line should point to the installed module
    transform: {
      '^.+\\.jsx?$': 'babel-jest',
    },
    moduleFileExtensions: ['js', 'jsx', 'json', 'node'],
  };
  