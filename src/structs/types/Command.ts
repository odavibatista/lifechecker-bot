import {
  ApplicationCommandData,
  ButtonInteraction,
  Collection,
  CommandInteraction,
  CommandInteractionOptionResolver,
  ModalSubmitInteraction,
  StringSelectMenuInteraction,
} from "discord.js";
import { ExtendedClient } from "../ExtendedClient";

/* Default properties of a command */
interface CommandProps {
  client: ExtendedClient;
  interaction: CommandInteraction;
  options: CommandInteractionOptionResolver;
}

/* Type for buttons */
export type ComponentsButton = Collection<
  string,
  (interaction: ButtonInteraction) => any
>;

/* Type for selecting interactions */
export type ComponentsSelect = Collection<
  string,
  (interaction: StringSelectMenuInteraction) => any
>;

/* Type for modals */
export type ComponentsModal = Collection<
  string,
  (interaction: ModalSubmitInteraction) => any
>;

/* Interface for creating commands */
interface CommandComponents {
  buttons?: ComponentsButton;
  selects?: ComponentsSelect;
  modals?: ComponentsModal;
}

export type CommandType = ApplicationCommandData &
  CommandComponents & {
    run(props: CommandProps): any;
  };

export class Command {
  constructor(options: CommandType) {
    options.dmPermission = false;
    Object.assign(this, options);
  }
}
