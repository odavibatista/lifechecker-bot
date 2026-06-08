import command from "../../../../src/commands/rpg/exalted.command";

import { DiceService } from "../../../../src/domain/dice/services/dice.service";
import { ExaltedService } from "../../../../src/domain/dice/services/exalted.service";

jest.mock(
  "../../../../src/domain/dice/services/dice.service",
);

jest.mock(
  "../../../../src/domain/dice/services/exalted.service",
);

describe(
  "exalted.command",
  () => {
    afterEach(() => {
      jest.clearAllMocks();
    });

    it(
      "should reply with exalted roll result",
      async () => {
        (
          DiceService.prototype.roll as jest.Mock
        ).mockReturnValue({
          rolls: [10, 8, 3],
          total: 21,
        });

        (
          ExaltedService.prototype.calculateSuccesses as jest.Mock
        ).mockReturnValue(
          3,
        );

        const reply =
          jest.fn();

        const interaction: any = {
          options: {
            getInteger: jest.fn().mockReturnValue(
              3,
            ),
          },

          reply,
        };

        await (command as any).run({
          interaction,
          client: {} as any,
        });

        expect(
          DiceService.prototype.roll
        ).toHaveBeenCalledWith(
          3,
          10,
        );

        expect(
          ExaltedService.prototype.calculateSuccesses
        ).toHaveBeenCalledWith(
          [10, 8, 3],
        );

        expect(
          reply
        ).toHaveBeenCalled();
      },
    );

    it(
      "should reply with validation error",
      async () => {
        const reply =
          jest.fn();

        const interaction: any = {
          options: {
            getInteger: jest.fn().mockReturnValue(
              0,
            ),
          },

          reply,
        };

        await (command as any).run({
          interaction,
          client: {} as any,
        });

        expect(
          reply
        ).toHaveBeenCalledWith(
          expect.objectContaining({
            ephemeral: true,
          }),
        );
      },
    );
  },
);