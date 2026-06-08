import { Event } from "../../../../src/structs/types/Event";

describe(
  "Event",
  () => {
    it(
      "should assign provided properties",
      () => {
        const run =
          jest.fn();

        const event =
          new Event({
            name: "ready",
            once: true,
            run,
          });

        expect((event as any).name).toBe("ready");
        expect((event as any).once).toBe(true);
        expect((event as any).run).toBe(run);
      },
    );      
  },
);