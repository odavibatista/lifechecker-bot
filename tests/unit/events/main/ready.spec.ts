import readyEvent from "../../../../src/events/main/ready";
import Logging from "../../../../src/library/Logging";
import { client } from "../../../../src";

jest.mock(
  "../../../../src",
  () => ({
    client: {
      commands: {
        size: 12,
      },

      buttons: {
        size: 5,
      },

      selects: {
        size: 3,
      },

      modals: {
        size: 2,
      },
    },
  }),
);

jest.mock(
  "../../../../src/library/Logging",
  () => ({
    __esModule: true,

    default: {
      info: jest.fn(),
      data: jest.fn(),
    },
  }),
);

describe(
  "ready event",
  () => {
    const readyEventWithRun =
      readyEvent as any;

    beforeEach(() => {
      jest.clearAllMocks();
    });

    it(
      "should have the correct event name",
      () => {
        expect(
          (readyEvent as any).name,
        ).toBe(
          "ready",
        );
      },
    );

    it(
      "should be configured to run once",
      () => {
        expect(
          (readyEvent as any).once,
        ).toBe(
          true,
        );
      },
    );

    it(
      "should log startup information",
      () => {
        readyEventWithRun.run(
          {},
        );

        expect(
          Logging.info,
        ).toHaveBeenCalledWith(
          "Bot online!",
        );

        expect(
          Logging.data,
        ).toHaveBeenCalledWith(
          `Commands loaded: ${client.commands.size}`,
        );

        expect(
          Logging.data,
        ).toHaveBeenCalledWith(
          `Buttons loaded: ${client.buttons.size}`,
        );

        expect(
          Logging.data,
        ).toHaveBeenCalledWith(
          `Selects loaded: ${client.selects.size}`,
        );

        expect(
          Logging.data,
        ).toHaveBeenCalledWith(
          `Modals loaded: ${client.modals.size}`,
        );

        expect(
          Logging.data,
        ).toHaveBeenCalledTimes(
          4,
        );
      },
    );

    it(
      "should ignore the interaction parameter",
      () => {
        expect(() =>
          readyEventWithRun.run(
            {
              any: "value",
            },
          ),
        ).not.toThrow();
      },
    );
  },
);