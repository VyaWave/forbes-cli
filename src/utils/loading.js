const ora = require('ora')

module.exports = (action = 'getting', repo = '') => {
  const oraOption = {
    text: `${action} ${repo}`,
    spinner: 'weather'
  }
  const loader = ora(oraOption)
  return loader.start()
}
