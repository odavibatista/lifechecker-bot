import { DiceService } from "../../../src/domain/dice/services/dice.service";

describe(
  "DiceService",
  () => {
    it(
      "should roll values within range",
      () => {
        const service =
          new DiceService();

        const result =
          service.roll(
            5,
            20
          );

        result.rolls.forEach(
          value => {
            expect(
              value
            ).toBeGreaterThanOrEqual(
              1
            );

            expect(
              value
            ).toBeLessThanOrEqual(
              20
            );
          }
        );
      }
    );
  }
);