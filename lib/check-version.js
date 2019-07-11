const request = require("request");
const semver = require("semver");
const chalk = require("chalk");
const packageConfig = require("../package.json")

module.exports = done => {
    if (!semver.satisfies(process.version, packageConfig.engines.node)) {
        return console.log(chalk.red(
            '    You must upgrade node to >=' + packageConfig.engines.node + '.x to use hat-cli'
        ))
    }
    request({
        url: "https://registry.npmjs.org/hat-cli",
        timeout: 1000
    }, (err, res, body) => {
        if (!err && res.statusCode === 200) {
            const lastestVersion = JSON.parse(body)['dist-tags'].lastest;
            const localVersion = packageConfig.version;
            if (semver.lt(localVersion, lastestVersion)) {
                console.log(chalk.yellow('  A newer version of hat-cli is available.'))
                console.log();
                console.log('  lastest:   ' + chalk.green(lastestVersion))
                console.log('  installed: ' + chalk.red(localVersion))
                console.log()
            }
        }
        done();
    })
}