import { formatExaltedResult } from "../../../../src/helpers/formatters/formatExaltedResult";

describe(
  "formatExaltedResult",
  () => {
    it(
      "should format rolls and successes correctly",
      () => {
        const result =
          formatExaltedResult(
            [10, 8, 7, 4, 2],
            4,
          );

        expect(result).toContain(
          "🎲 Rolagens",
        );

        expect(result).toContain(
          "10 | 8 | 7 | 4 | 2",
        );

        expect(result).toContain(
          "Sucessos: 4",
        );
      },
    );

    it(
      "should format a single roll correctly",
      () => {
        const result =
          formatExaltedResult(
            [10],
            2,
          );

        expect(result).toContain(
          "10",
        );

        expect(result).toContain(
          "Sucessos: 2",
        );
      },
    );

    it(
      "should handle zero successes",
      () => {
        const result =
          formatExaltedResult(
            [1, 2, 3],
            0,
          );

        expect(result).toContain(
          "1 | 2 | 3",
        );

        expect(result).toContain(
          "Sucessos: 0",
        );
      },
    );

    it(
      "should handle empty rolls array",
      () => {
        const result =
          formatExaltedResult(
            [],
            0,
          );

        expect(result).toContain(
          "🎲 Rolagens",
        );

        expect(result).toContain(
          "Sucessos: 0",
        );
      },
    );

    it(
  "should return the expected string format",
  () => {
    const result =
      formatExaltedResult(
        [10, 8, 7],
        3,
      );

    expect(result.trim()).toBe(
      [
        "🎲 Rolagens",
        "",
        "10 | 8 | 7",
        "",
        "Sucessos: 3",
      ].join("\n"),
    );
  },
);
  },
);