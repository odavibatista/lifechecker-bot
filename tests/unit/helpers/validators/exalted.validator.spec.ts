import { validateExaltedDice } from "../../../../src/helpers/validators/exalted.validator";

describe(
  "validateExaltedDice",
  () => {
    it.each([
      [1],
      [10],
      [25],
      [100],
    ])(
      "should accept quantity=%i",
      (quantity) => {
        expect(() =>
          validateExaltedDice(quantity),
        ).not.toThrow();
      },
    );

    it.each([
      [0],
      [-1],
      [-10],
    ])(
      "should reject invalid quantity=%i",
      (quantity) => {
        expect(() =>
          validateExaltedDice(quantity),
        ).toThrow(
          "Quantity must be greater than zero.",
        );
      },
    );

    it.each([
      [101],
      [150],
      [999],
    ])(
      "should reject quantity greater than 100 (%i)",
      (quantity) => {
        expect(() =>
          validateExaltedDice(quantity),
        ).toThrow(
          "Maximum Exalted dice quantity is 100.",
        );
      },
    );
  },
);