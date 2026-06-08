import { formatInitiativeResult } from "../../../../src/helpers/formatters/formatInitiativeResult";

describe(
  "formatInitiativeResult",
  () => {
    it(
      "should format initiative result with positive modifier",
      () => {
        const result =
          formatInitiativeResult(
            15,
            3,
            18,
          );

        expect(result).toContain(
          "⚔️ **Rolagem de Iniciativa**",
        );

        expect(result).toContain(
          "🎲 D20: **15**",
        );

        expect(result).toContain(
          "➕ Modificador: **+3**",
        );

        expect(result).toContain(
          "📊 Resultado Final: **18**",
        );
      },
    );

    it(
      "should format initiative result with zero modifier",
      () => {
        const result =
          formatInitiativeResult(
            12,
            0,
            12,
          );

        expect(result).toContain(
          "➕ Modificador: **+0**",
        );
      },
    );

    it(
      "should format initiative result with negative modifier",
      () => {
        const result =
          formatInitiativeResult(
            12,
            -2,
            10,
          );

        expect(result).toContain(
          "➕ Modificador: **-2**",
        );
      },
    );

    it(
      "should return the expected string format",
      () => {
        const result =
          formatInitiativeResult(
            15,
            3,
            18,
          );

        expect(
          result.trim(),
        ).toBe(
          [
            "⚔️ **Rolagem de Iniciativa**",
            "",
            "🎲 D20: **15**",
            "",
            "➕ Modificador: **+3**",
            "",
            "📊 Resultado Final: **18**",
          ].join("\n"),
        );
      },
    );
  },
);