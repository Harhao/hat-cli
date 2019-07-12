const chalk = require('chalk')

module.exports = {
  v2SuffixTemplatesDeprecated (template, name) {
    const initCommand = 'hat init ' + template.replace('-1.0', '') + ' ' + name

    console.log(chalk.red('  This template is deprecated, as the original template now uses Vue 1.0 by default.'))
    console.log()
    console.log(chalk.yellow('  Please use this command instead: ') + chalk.green(initCommand))
    console.log()
  }
}
