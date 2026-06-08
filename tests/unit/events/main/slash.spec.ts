import commandEvent from "../../../../src/events/main/slash";
import Logging from "../../../../src/library/Logging";
import { client } from "../../../../src";

jest.mock(
  "../../../../src",
  () => ({
    client: {
      commands: {
        get: jest.fn(),
      },
    },
  }),
);

jest.mock(
  "../../../../src/library/Logging",
  () => ({
    __esModule: true,
    default: {
      err: jest.fn(),
    },
  }),
);

const commandEventWithRun =
  commandEvent as any;

const commandsGet =
  client.commands.get as jest.Mock;

jest.mock(
  "../../../../src",
  () => ({
    client: {
      commands: {
        get: jest.fn(),
      },
    },
  }),
);

jest.mock(
  "../../../../src/library/Logging",
  () => ({
    __esModule: true,

    default: {
      err: jest.fn(),
    },
  }),
);

describe(
  "command event",
  () => {
    const commandEventWithRun =
      commandEvent as any;

    const commandsGet =
      client.commands.get as jest.Mock;

    beforeEach(() => {
      jest.clearAllMocks();
    });

    it(
      "should have the correct event name",
      () => {
        expect(
          commandEventWithRun.name,
        ).toBe(
          "interactionCreate",
        );
      },
    );

    it(
      "should ignore non chat input interactions",
      async () => {
        const interaction: any = {
          isChatInputCommand: jest.fn().mockReturnValue(
            false,
          ),
        };

        await commandEventWithRun.run(
          interaction,
        );

        expect(
          commandsGet,
        ).not.toHaveBeenCalled();
      },
    );

    it(
      "should return when command is not found",
      async () => {
        commandsGet.mockReturnValue(
          undefined,
        );

        const interaction: any = {
          commandName: "unknown",

          isChatInputCommand: jest.fn().mockReturnValue(
            true,
          ),
        };

        await commandEventWithRun.run(
          interaction,
        );

        expect(
          commandsGet,
        ).toHaveBeenCalledWith(
          "unknown",
        );
      },
    );

    it(
      "should execute the command successfully",
      async () => {
        const run =
          jest.fn();

        commandsGet.mockReturnValue({
          run,
        });

        const interaction: any = {
          commandName: "ping",

          options: {},

          isChatInputCommand: jest.fn().mockReturnValue(
            true,
          ),
        };

        await commandEventWithRun.run(
          interaction,
        );

        expect(
          run,
        ).toHaveBeenCalledWith({
          client,
          interaction,
          options: interaction.options,
        });
      },
    );

    it(
      "should reply when command execution fails and interaction was not answered",
      async () => {
        const error =
          new Error(
            "Unexpected error",
          );

        commandsGet.mockReturnValue({
          run: jest.fn().mockRejectedValue(
            error,
          ),
        });

        const reply =
          jest.fn();

        const interaction: any = {
          commandName: "ping",

          options: {},

          replied: false,
          deferred: false,

          reply,

          isChatInputCommand: jest.fn().mockReturnValue(
            true,
          ),
        };

        await commandEventWithRun.run(
          interaction,
        );

        expect(
          Logging.err,
        ).toHaveBeenCalledWith(
          error,
        );

        expect(
          reply,
        ).toHaveBeenCalledWith({
          ephemeral: true,
          content:
            "❌ Ocorreu um erro inesperado ao executar este comando.",
        });
      },
    );

    it(
      "should follow up when interaction was already replied",
      async () => {
        const error =
          new Error(
            "Unexpected error",
          );

        commandsGet.mockReturnValue({
          run: jest.fn().mockRejectedValue(
            error,
          ),
        });

        const followUp =
          jest.fn();

        const interaction: any = {
          commandName: "ping",

          options: {},

          replied: true,
          deferred: false,

          followUp,

          isChatInputCommand: jest.fn().mockReturnValue(
            true,
          ),
        };

        await commandEventWithRun.run(
          interaction,
        );

        expect(
          Logging.err,
        ).toHaveBeenCalledWith(
          error,
        );

        expect(
          followUp,
        ).toHaveBeenCalledWith({
          ephemeral: true,
          content:
            "❌ Ocorreu um erro inesperado ao executar este comando.",
        });
      },
    );

    it(
      "should follow up when interaction was deferred",
      async () => {
        const error =
          new Error(
            "Unexpected error",
          );

        commandsGet.mockReturnValue({
          run: jest.fn().mockRejectedValue(
            error,
          ),
        });

        const followUp =
          jest.fn();

        const interaction: any = {
          commandName: "ping",

          options: {},

          replied: false,
          deferred: true,

          followUp,

          isChatInputCommand: jest.fn().mockReturnValue(
            true,
          ),
        };

        await commandEventWithRun.run(
          interaction,
        );

        expect(
          followUp,
        ).toHaveBeenCalledWith({
          ephemeral: true,
          content:
            "❌ Ocorreu um erro inesperado ao executar este comando.",
        });
      },
    );
  },
);