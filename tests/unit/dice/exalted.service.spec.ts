import { ExaltedService } from "../../../src/domain/dice/services/exalted.service";

describe(
  "ExaltedService",
  () => {

    it(
      "should count double tens",
      () => {

        const service =
          new ExaltedService();

        const result =
          service.calculateSuccesses(
            [
              10,
              10,
              8,
              5
            ]
          );

        expect(
          result
        ).toBe(5);

      }
    );

  }
);