import componentEvent from "../../../../src/events/main/components";
import { client } from "../../../../src";

jest.mock(
  "../../../../src",
  () => ({
    client: {
      modals: {
        get: jest.fn(),
      },

      buttons: {
        get: jest.fn(),
      },

      selects: {
        get: jest.fn(),
      },
    },
  }),
);

const componentEventWithRun =
  componentEvent as any;

const modalsGet =
  client.modals.get as jest.Mock;

const buttonsGet =
  client.buttons.get as jest.Mock;

const selectsGet =
  client.selects.get as jest.Mock;

describe(
  "components event",
  () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it(
      "should have the correct event name",
      () => {
        expect(
          Object.getOwnPropertyNames(componentEvent).includes("run"),
        ).toBe(
          true,
        );
      },
    );

    it(
      "should execute modal handler",
      () => {
        const modalHandler =
          jest.fn();

        modalsGet.mockReturnValue(
          modalHandler,
        );

        const interaction: any = {
          customId: "test-modal",

          isModalSubmit: jest.fn().mockReturnValue(
            true,
          ),

          isButton: jest.fn().mockReturnValue(
            false,
          ),

          isStringSelectMenu: jest.fn().mockReturnValue(
            false,
          ),
        };

        (componentEvent as any).run(
          interaction,
        );

        expect(
          modalsGet,
        ).toHaveBeenCalledWith(
          "test-modal",
        );

        expect(
          modalHandler,
        ).toHaveBeenCalledWith(
          interaction,
        );
      },
    );

    it(
      "should execute button handler",
      () => {
        const buttonHandler =
          jest.fn();

        buttonsGet.mockReturnValue(
          buttonHandler,
        );

        const interaction: any = {
          customId: "test-button",

          isModalSubmit: jest.fn().mockReturnValue(
            false,
          ),

          isButton: jest.fn().mockReturnValue(
            true,
          ),

          isStringSelectMenu: jest.fn().mockReturnValue(
            false,
          ),
        };

        componentEventWithRun.run(
          interaction,
        );

        expect(
          buttonsGet,
        ).toHaveBeenCalledWith(
          "test-button",
        );

        expect(
          buttonHandler,
        ).toHaveBeenCalledWith(
          interaction,
        );
      },
    );

    it(
      "should execute select menu handler",
      () => {
        const selectHandler =
          jest.fn();

        selectsGet.mockReturnValue(
          selectHandler,
        );

        const interaction: any = {
          customId: "test-select",

          isModalSubmit: jest.fn().mockReturnValue(
            false,
          ),

          isButton: jest.fn().mockReturnValue(
            false,
          ),

          isStringSelectMenu: jest.fn().mockReturnValue(
            true,
          ),
        };

        componentEventWithRun.run(
          interaction,
        );

        expect(
          selectsGet,
        ).toHaveBeenCalledWith(
          "test-select",
        );

        expect(
          selectHandler,
        ).toHaveBeenCalledWith(
          interaction,
        );
      },
    );

    it(
      "should not throw when modal handler does not exist",
      () => {
        modalsGet.mockReturnValue(
          undefined,
        );

        const interaction: any = {
          customId: "unknown-modal",

          isModalSubmit: jest.fn().mockReturnValue(
            true,
          ),

          isButton: jest.fn().mockReturnValue(
            false,
          ),

          isStringSelectMenu: jest.fn().mockReturnValue(
            false,
          ),
        };

        expect(() =>
          componentEventWithRun.run(
            interaction,
          ),
        ).not.toThrow();
      },
    );

    it(
      "should not throw when button handler does not exist",
      () => {
        buttonsGet.mockReturnValue(
          undefined,
        );

        const interaction: any = {
          customId: "unknown-button",

          isModalSubmit: jest.fn().mockReturnValue(
            false,
          ),

          isButton: jest.fn().mockReturnValue(
            true,
          ),

          isStringSelectMenu: jest.fn().mockReturnValue(
            false,
          ),
        };

        expect(() =>
          componentEventWithRun.run(
            interaction,
          ),
        ).not.toThrow();
      },
    );

    it(
      "should not throw when select handler does not exist",
      () => {
        selectsGet.mockReturnValue(
          undefined,
        );

        const interaction: any = {
          customId: "unknown-select",

          isModalSubmit: jest.fn().mockReturnValue(
            false,
          ),

          isButton: jest.fn().mockReturnValue(
            false,
          ),

          isStringSelectMenu: jest.fn().mockReturnValue(
            true,
          ),
        };

        expect(() =>
          componentEventWithRun.run(
            interaction,
          ),
        ).not.toThrow();
      },
    );

    it(
      "should do nothing for unsupported interactions",
      () => {
        const interaction: any = {
          customId: "unsupported",

          isModalSubmit: jest.fn().mockReturnValue(
            false,
          ),

          isButton: jest.fn().mockReturnValue(
            false,
          ),

          isStringSelectMenu: jest.fn().mockReturnValue(
            false,
          ),
        };

        componentEventWithRun.run(
          interaction,
        );

        expect(
          modalsGet,
        ).not.toHaveBeenCalled();

        expect(
          buttonsGet,
        ).not.toHaveBeenCalled();

        expect(
          selectsGet,
        ).not.toHaveBeenCalled();
      },
    );
  },
);