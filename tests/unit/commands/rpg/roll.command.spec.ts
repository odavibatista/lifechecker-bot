import command from "../../../../src/commands/rpg/roll.command";

import { DiceService } from "../../../../src/domain/dice/services/dice.service";
import { validateDice } from "../../../../src/helpers/validators/dice.validator";

jest.mock(
  "../../../../src/domain/dice/services/dice.service",
);

jest.mock(
  "../../../../src/helpers/validators/dice.validator",
);

describe(
  "roll.command",
  () => {
    afterEach(() => {
      jest.clearAllMocks();
    });

    it(
      "should execute a dice roll successfully",
      async () => {
        (
          DiceService.prototype.roll as jest.Mock
        ).mockReturnValue({
          rolls: [4, 6, 2],
          total: 12,
        });

        const reply =
          jest.fn();

        const interaction: any = {
          options: {
            getInteger: jest
              .fn()
              .mockImplementation((name: string) => {
                if (name === "quantity") {
                  return 3;
                }

                if (name === "faces") {
                  return 6;
                }

                return null;
              }),
          },

          reply,
        };

        await (command as any).run({
          interaction,
        });

        expect(
          interaction.options.getInteger
        ).toHaveBeenCalledWith(
          "quantity",
          true,
        );

        expect(
          interaction.options.getInteger
        ).toHaveBeenCalledWith(
          "faces",
          true,
        );

        expect(
          validateDice
        ).toHaveBeenCalledWith(
          3,
          6,
        );

        expect(
          DiceService.prototype.roll
        ).toHaveBeenCalledWith(
          3,
          6,
        );

        expect(
          reply
        ).toHaveBeenCalledWith(
          expect.objectContaining({
            content: expect.stringContaining(
              "🎲 **Rolagem de Dados**",
            ),
          }),
        );
      },
    );

    it(
      "should reply with validator error",
      async () => {
        (
          validateDice as jest.Mock
        ).mockImplementation(() => {
          throw new Error(
            "Quantidade inválida",
          );
        });

        const reply =
          jest.fn();

        const interaction: any = {
          options: {
            getInteger: jest
              .fn()
              .mockImplementation((name: string) => {
                if (name === "quantity") {
                  return 0;
                }

                if (name === "faces") {
                  return 6;
                }

                return null;
              }),
          },

          reply,
        };

        await (command as any).run({
          interaction,
        });

        expect(
          reply
        ).toHaveBeenCalledWith({
          ephemeral: true,
          content: "❌ Quantidade inválida",
        });
      },
    );

    it(
      "should reply with service error",
      async () => {
        (
          DiceService.prototype.roll as jest.Mock
        ).mockImplementation(() => {
          throw new Error(
            "Erro interno",
          );
        });

        const reply =
          jest.fn();

        const interaction: any = {
          options: {
            getInteger: jest
              .fn()
              .mockImplementation((name: string) => {
                if (name === "quantity") {
                  return 2;
                }

                if (name === "faces") {
                  return 20;
                }

                return null;
              }),
          },

          reply,
        };

        await (command as any).run({
          interaction,
        });

        expect(
          reply
        ).toHaveBeenCalledWith({
          ephemeral: true,
          content: "❌ Quantidade inválida",
        });
      },
    );
  },
);