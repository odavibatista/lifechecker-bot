import { Command } from "../../../../src/structs/types/Command";

describe(
  "Command",
  () => {
    it(
      "should assign provided properties",
      () => {
        const run =
          jest.fn();

        const command =
          new Command({
            name: "test",
            description: "test command",
            run,
          } as any);

        expect(
          (command as any).name,
        ).toBe(
          "test",
        );

        expect(
          (command as any).description,
        ).toBe(
          "test command",
        );

        expect(
          (command as any).run,
        ).toBe(
          run,
        );
      },
    );

    it(
      "should force dmPermission to false",
      () => {
        const command =
          new Command({
            name: "test",
            dmPermission: true,
            run: jest.fn(),
          } as any);

        expect(
          (command as any).dmPermission,
        ).toBe(
          false,
        );
      },
    );
  },
);