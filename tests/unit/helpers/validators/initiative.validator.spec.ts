import { validateInitiativeModifier }
from "../../../../src/helpers/validators/initiative.validator";

describe(
  "validateInitiativeModifier",
  () => {

    it(
      "should not throw when modifier is 0",
      () => {

        expect(() =>
          validateInitiativeModifier(0)
        ).not.toThrow();

      }
    );

    it(
      "should not throw when modifier is positive",
      () => {

        expect(() =>
          validateInitiativeModifier(10)
        ).not.toThrow();

      }
    );

    it(
      "should not throw when modifier is negative",
      () => {

        expect(() =>
          validateInitiativeModifier(-10)
        ).not.toThrow();

      }
    );

    it(
      "should not throw when modifier is exactly 50",
      () => {

        expect(() =>
          validateInitiativeModifier(50)
        ).not.toThrow();

      }
    );

    it(
      "should not throw when modifier is exactly -50",
      () => {

        expect(() =>
          validateInitiativeModifier(-50)
        ).not.toThrow();

      }
    );

    it(
      "should throw when modifier is greater than 50",
      () => {

        expect(() =>
          validateInitiativeModifier(51)
        ).toThrow(
          "Modifier must be between -50 and 50."
        );

      }
    );

    it(
      "should throw when modifier is lower than -50",
      () => {

        expect(() =>
          validateInitiativeModifier(-51)
        ).toThrow(
          "Modifier must be between -50 and 50."
        );

      }
    );

  }
);