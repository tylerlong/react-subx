let start;

beforeEach(() => {
  start = new Date();
});

afterEach(() => {
  expect(new Date() - start).toBeLessThanOrEqual(
    parseInt(process.env.BENCHMARK_THRESHOLD) || 100
  );
});
