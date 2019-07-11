const chalk = require("chalk");
const format = require("util").format;
const prefix = '   hat-cli';
const sep = chalk.grey('·')

exports.log = function (...args) {
    const msg = format.apply(format, args);
    console.log(chalk.white(prefix), sep, msg);
}

exports.fatal = function (...args) {
    if (args[0] instanceof Error) {
        args[0] = args[0].message.trim()
    }
    const msg = format.apply(format, args);
    console.error(chalk.red(prefix), sep, msg)
    process.exit(1)
}

exports.success = function (...args) {
    const msg = format.apply(format, args);
    console.log(chalk.white(prefix), sep, msg)
}