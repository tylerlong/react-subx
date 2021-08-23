const config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupFiles: ['./setup.ts'],
  testTimeout: 32000,
};

export default config;
