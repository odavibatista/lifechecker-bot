import { randomInt } from "../../../../src/helpers/random/randomInt";

describe(
  "randomInt",
  () => {
    afterEach(() => {
      jest.restoreAllMocks();
    });

    it(
      "should throw when min is greater than max",
      () => {
        expect(() =>
          randomInt(10, 1),
        ).toThrow(
          "Minimum value cannot be greater than maximum value.",
        );
      },
    );

    it(
      "should return the minimum value",
      () => {
        jest
          .spyOn(Math, "random")
          .mockReturnValue(0);

        const result =
          randomInt(1, 6);

        expect(result).toBe(
          1,
        );
      },
    );

    it(
      "should return the maximum value",
      () => {
        jest
          .spyOn(Math, "random")
          .mockReturnValue(0.999999);

        const result =
          randomInt(1, 6);

        expect(result).toBe(
          6,
        );
      },
    );

    it(
      "should return a middle value",
      () => {
        jest
          .spyOn(Math, "random")
          .mockReturnValue(0.5);

        const result =
          randomInt(1, 6);

        expect(result).toBe(
          4,
        );
      },
    );

    it(
      "should always return the same value when min equals max",
      () => {
        jest
          .spyOn(Math, "random")
          .mockReturnValue(0.5);

        const result =
          randomInt(7, 7);

        expect(result).toBe(
          7,
        );
      },
    );
  },
);