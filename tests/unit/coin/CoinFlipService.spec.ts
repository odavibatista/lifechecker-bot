
describe(
  "CoinFlip",
  () => {

    it(
      "should return valid side",
      () => {

        const result =
          new CoinFlipService()
            .execute();

        expect(
          [
            "Heads",
            "Tails"
          ]
        ).toContain(result);

      }
    );

  }
);