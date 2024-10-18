// jest.config.js
module.exports = {
    transform: {
      '^.+\\.(js|jsx)$': 'babel-jest',  // Transpile JavaScript and JSX files using babel-jest
    },
    testEnvironment: 'jsdom',  // Set the test environment to jsdom (for testing React components)
    moduleNameMapper: {
      '\\.(css|less|scss|sass)$': 'identity-obj-proxy', // Mock CSS imports during testing
    },
  };
  