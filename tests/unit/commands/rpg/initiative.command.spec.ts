import command
from "../../../../src/commands/rpg/initiative.command";

describe(
  "initiative.command",
  () => {
    it(
      "should reply with initiative roll result",
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