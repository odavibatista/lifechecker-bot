jest.mock(
  "env-var",
  () => ({
    get: jest.fn(() => ({
      required: () => ({
        asString: () => "test-value",
      }),
    })),
  }),
);

describe(
  "config",
  () => {
    it(
      "should load environment variables",
      async () => {
        const config =
          await import(
            "../../../src/config/config"
          );

        expect(
          config,
        ).toBeDefined();
      },
    );
  },
);