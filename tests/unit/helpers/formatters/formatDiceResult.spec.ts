import { formatDiceResult } from "../../../../src/helpers/formatters/formatDiceResult";

describe(
  "formatDiceResult",
  () => {
    it(
      "should format multiple dice results",
      () => {
        const result =
          formatDiceResult([
            4,
            6,
            2,
          ]);

        expect(result).toBe(
          "4, 6, 2",
        );
      },
    );

    it(
      "should format a single dice result",
      () => {
        const result =
          formatDiceResult([
            20,
          ]);

        expect(result).toBe(
          "20",
        );
      },
    );

    it(
      "should return an empty string when rolls array is empty",
      () => {
        const result =
          formatDiceResult([]);

        expect(result).toBe(
          "",
        );
      },
    );
  },
);