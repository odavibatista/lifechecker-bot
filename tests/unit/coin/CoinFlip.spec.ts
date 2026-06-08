import { CoinFlip } from "../../../src/domain/coin/CoinFlip";
import { CoinSide } from "../../../src/domain/coin/types/CoinSide";

import * as randomHelper from "../../../src/helpers/random/randomArrayElement";

describe("CoinFlip", () => {
  let coinFlip: CoinFlip;

  beforeEach(() => {
    coinFlip = new CoinFlip();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("should return HEADS when randomArrayElement returns HEADS", () => {
    jest
      .spyOn(randomHelper, "randomArrayElement")
      .mockReturnValue(CoinSide.HEADS);

    const result = coinFlip.execute();

    expect(result).toBe(CoinSide.HEADS);
  });

  it("should return TAILS when randomArrayElement returns TAILS", () => {
    jest
      .spyOn(randomHelper, "randomArrayElement")
      .mockReturnValue(CoinSide.TAILS);

    const result = coinFlip.execute();

    expect(result).toBe(CoinSide.TAILS);
  });

  it("should call randomArrayElement with all possible coin sides", () => {
    const spy = jest
      .spyOn(randomHelper, "randomArrayElement")
      .mockReturnValue(CoinSide.HEADS);

    coinFlip.execute();

    expect(spy).toHaveBeenCalledWith([
      CoinSide.HEADS,
      CoinSide.TAILS,
    ]);
  });
});