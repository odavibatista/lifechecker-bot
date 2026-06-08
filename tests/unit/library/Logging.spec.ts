import Logging from "../../../src/library/Logging";

describe(
  "Logging",
  () => {
    let consoleSpy: jest.SpyInstance;

    beforeEach(() => {
      consoleSpy = jest
        .spyOn(console, "log")
        .mockImplementation(
          () => undefined,
        );
    });

    afterEach(() => {
      jest.restoreAllMocks();
    });

    it(
      "should delegate log to info",
      () => {
        const infoSpy =
          jest.spyOn(
            Logging,
            "info",
          );

        Logging.log(
          "test",
        );

        expect(
          infoSpy,
        ).toHaveBeenCalledWith(
          "test",
        );
      },
    );

    it(
      "should log info messages",
      () => {
        Logging.info(
          "message",
        );

        expect(
          consoleSpy,
        ).toHaveBeenCalledTimes(
          1,
        );
      },
    );

    it(
      "should log data messages",
      () => {
        Logging.data(
          "message",
        );

        expect(
          consoleSpy,
        ).toHaveBeenCalledTimes(
          1,
        );
      },
    );

    it(
      "should log warning messages",
      () => {
        Logging.warn(
          "message",
        );

        expect(
          consoleSpy,
        ).toHaveBeenCalledTimes(
          1,
        );
      },
    );

    it(
      "should log error messages",
      () => {
        Logging.err(
          "message",
        );

        expect(
          consoleSpy,
        ).toHaveBeenCalledTimes(
          1,
        );
      },
    );

    it(
      "should support object payloads",
      () => {
        const payload = {
          foo: "bar",
        };

        Logging.info(
          payload,
        );

        expect(
          consoleSpy,
        ).toHaveBeenCalledTimes(
          1,
        );
      },
    );

    it(
  "should log data object payloads",
  () => {
    Logging.data({
      id: 1,
    });

    expect(
      consoleSpy,
    ).toHaveBeenCalled();
  },
);

it(
  "should log warning object payloads",
  () => {
    Logging.warn({
      id: 1,
    });

    expect(
      consoleSpy,
    ).toHaveBeenCalled();
  },
);

it(
  "should log error object payloads",
  () => {
    Logging.err({
      id: 1,
    });

    expect(
      consoleSpy,
    ).toHaveBeenCalled();
  },
);
  },
  
);