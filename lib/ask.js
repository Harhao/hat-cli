const async = require('async');
const inquirer = require("inquirer");
const evaluate = require("./eval");

const promptMapping = {
    string: 'input',
    boolean: 'confirm'
}

module.exports = function ask(prompts, data, done) {
    async.eachSeries(Object.keys(prompts), (key, next) => {
        prompt(data, key, prompts[key], next)
    }, done)
}

function prompt(data, key, prompt, done) {
    if (prompt.when && !evaluate(prompt.when, data)) {
        return done();
    }
    let promptDefault = prompt.default;
    if (typeof prompt.default === "function") {
        promptDefault = function () {
            return prompt.default.bind(this)(data);
        }
    }
    inquirer.prompt([{
        type: promptMapping[prompt.type] || prompt.type,
        name: key,
        message: prompt.message || prompt.label || key,
        default: promptDefault,
        choices: prompt.choices || [],
        validate: prompt.validate || (() => true)
    }]).then(answer => {
        if (Array.isArray(answer[key])) {
            data[key] = {};
            answer[key].forEach(multiChoiceAnswer => {
                data[key][multiChoiceAnswer] = true;
            })
        } else if (typeof answer[key] === "string") {
            data[key] = answer[key].replace(/"/g, '\\"')
        } else {
            data[key] = answer[key]
        }
        done()
    }).catch(done)
}