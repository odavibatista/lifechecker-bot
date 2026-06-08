import command
from "../../../../src/commands/rpg/exalted.command";

describe(
  "exalted.command",
  () => {
    it(
      "should reply with exalted roll result",
      async () => {
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