import { randomArrayElement } from "../../../../src/helpers/random/randomArrayElement";

describe(
  "randomArrayElement",
  () => {
    afterEach(() => {
      jest.restoreAllMocks();
    });

    it(
      "should throw when array is empty",
      () => {
        expect(() =>
          randomArrayElement([]),
        ).toThrow(
          "Cannot select an element from an empty array.",
        );
      },
    );

    it(
      "should return the first element",
      () => {
        jest
          .spyOn(Math, "random")
          .mockReturnValue(0);

        const result =
          randomArrayElement([
            "Warrior",
            "Mage",
            "Rogue",
          ]);

        expect(result).toBe(
          "Warrior",
        );
      },
    );

    it(
      "should return the last element",
      () => {
        jest
          .spyOn(Math, "random")
          .mockReturnValue(0.999999);

        const result =
          randomArrayElement([
            "Warrior",
            "Mage",
            "Rogue",
          ]);

        expect(result).toBe(
          "Rogue",
        );
      },
    );

    it(
      "should return the correct middle element",
      () => {
        jest
          .spyOn(Math, "random")
          .mockReturnValue(0.4);

        const result =
          randomArrayElement([
            "Warrior",
            "Mage",
            "Rogue",
          ]);

        expect(result).toBe(
          "Mage",
        );
      },
    );
  },
);