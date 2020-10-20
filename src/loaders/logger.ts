import chalk from 'chalk';
const log = console.log;

export const logSuccess = (...text: any[]) =>
    log(chalk.black.bgGreen.bold(` |${new Date().toUTCString()}| : ${text} `));
export const logFailed = (...text: any[]) => log(chalk.white.bgRed.bold(` |${new Date().toUTCString()}| : ${text} `));
