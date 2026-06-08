import { validateDice } from "../../../../src/helpers/validators/dice.validator";

describe(
  "validateDice",
  () => {
    it(
      "should not throw for valid values",
      () => {
        expect(() =>
          validateDice(1, 6),
        ).not.toThrow();

        expect(() =>
          validateDice(5, 20),
        ).not.toThrow();

        expect(() =>
          validateDice(10, 100),
        ).not.toThrow();
      },
    );

    it(
      "should throw when quantity is zero",
      () => {
        expect(() =>
          validateDice(0, 20),
        ).toThrow(
          "Quantity must be greater than zero.",
        );
      },
    );

    it(
      "should throw when quantity is negative",
      () => {
        expect(() =>
          validateDice(-5, 20),
        ).toThrow(
          "Quantity must be greater than zero.",
        );
      },
    );

    it(
      "should throw when faces is one",
      () => {
        expect(() =>
          validateDice(3, 1),
        ).toThrow(
          "Faces must be greater than one.",
        );
      },
    );

    it(
      "should throw when faces is zero",
      () => {
        expect(() =>
          validateDice(3, 0),
        ).toThrow(
          "Faces must be greater than one.",
        );
      },
    );

    it(
      "should throw when faces is negative",
      () => {
        expect(() =>
          validateDice(3, -10),
        ).toThrow(
          "Faces must be greater than one.",
        );
      },
    );
  },
);