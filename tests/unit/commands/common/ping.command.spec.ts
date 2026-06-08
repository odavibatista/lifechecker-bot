import command from "../../../../src/commands/common/ping.command";

describe(
  "ping.command",
  () => {
    afterEach(() => {
      jest.clearAllMocks();
    });

    it(
      "should reply with pong message",
      () => {
        const reply =
          jest.fn();

        const interaction: any = {
          reply,
        };

        (command as any).run({
          interaction,
        });

        expect(
          reply,
        ).toHaveBeenCalledWith(
          expect.objectContaining({
            ephemeral: true,
            content: "Pong!",
            components: expect.any(Array),
          }),
        );
      },
    );

    it(
      "should register ping button",
      () => {
        expect(
          (command as any).buttons.has(
            "ping",
          ),
        ).toBe(true);
      },
    );

    it(
      "should remove components when ping button is clicked",
      async () => {
        const update =
          jest.fn();

        const interaction: any = {
          update,
        };

        const buttonHandler =
          (command as any).buttons.get(
            "ping",
          );

        await buttonHandler?.(
          interaction,
        );

        expect(
          update,
        ).toHaveBeenCalledWith({
          components: [],
        });
      },
    );
  },
);