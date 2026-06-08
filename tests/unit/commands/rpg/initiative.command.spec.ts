import command from "../../../../src/commands/rpg/initiative.command";

import { DiceService } from "../../../../src/domain/dice/services/dice.service";
import { formatInitiativeResult } from "../../../../src/helpers/formatters/formatInitiativeResult";

jest.mock(
  "../../../../src/domain/dice/services/dice.service",
);

jest.mock(
  "../../../../src/helpers/formatters/formatInitiativeResult",
);

describe(
  "initiative.command",
  () => {
    afterEach(() => {
      jest.clearAllMocks();
    });

    it(
      "should reply with initiative roll result",
      async () => {
        (
          DiceService.prototype.roll as jest.Mock
        ).mockReturnValue({
          rolls: [15],
          total: 15,
        });

        (
          formatInitiativeResult as jest.Mock
        ).mockReturnValue(
          "Initiative Result",
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
          interaction.options.getInteger
        ).toHaveBeenCalledWith(
          "modifier",
          true,
        );

        expect(
          DiceService.prototype.roll
        ).toHaveBeenCalledWith(
          1,
          20,
        );

        expect(
          formatInitiativeResult
        ).toHaveBeenCalledWith(
          15,
          3,
          18,
        );

        expect(
          reply
        ).toHaveBeenCalledWith({
          content: "Initiative Result",
        });
      },
    );

    it(
      "should reply with error message when an exception occurs",
      async () => {
        (
          DiceService.prototype.roll as jest.Mock
        ).mockImplementation(() => {
          throw new Error(
            "Dice failure",
          );
        });

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
          reply
        ).toHaveBeenCalledWith({
          ephemeral: true,
          content: "❌ Dice failure",
        });
      },
    );
  },
);