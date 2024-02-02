import chalk from "chalk";

export default class Logging {
  public static log = (args: any) => this.info(args);

  public static info = (args: any) =>
    console.log(
      chalk.blueBright(`[${new Date().toLocaleString()}] [INFO]`),
      typeof args === "string" ? chalk.blueBright(args) : args,
    );

  public static data = (args: any) =>
    console.log(
      chalk.greenBright(`[${new Date().toLocaleString()}] [DATA]`),
      typeof args === "string" ? chalk.magentaBright(args) : args,
    );

  public static warn = (args: any) =>
    console.log(
      chalk.yellowBright(`[${new Date().toLocaleString()}] [AVISO]`),
      typeof args === "string" ? chalk.yellowBright(args) : args,
    );

  public static err = (args: any) =>
    console.log(
      chalk.redBright(`[${new Date().toLocaleString()}] [ERRO]`),
      typeof args === "string" ? chalk.redBright(args) : args,
    );
}
