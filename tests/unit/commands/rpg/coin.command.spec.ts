import command
from "../../../../src/commands/rpg/coin.command";

import { CoinFlip }
from "../../../../src/domain/coin/CoinFlip";

jest.mock(
  "../../../../src/domain/coin/CoinFlip"
);

describe(
  "coin.command",
  () => {

    afterEach(() => {
      jest.clearAllMocks();
    });

    it(
      "should reply with coin flip result",
      async () => {

        (
          CoinFlip.prototype.execute as jest.Mock
        ).mockReturnValue(
          "Heads"
        );

        const reply =
          jest.fn();

        const interaction: any = {
          reply,
        };

        await (command as any).run({
          interaction,
          client: {} as any,
          options: {} as any,
        });

        expect(
          reply
        ).toHaveBeenCalled();

      }
    );

  }
);