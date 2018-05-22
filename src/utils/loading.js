import ora from 'ora'

export const OraLoading = (action = 'getting', repo = '') => {
  const oraOption = {
    text: `${action} ${repo}`,
    spinner: 'weather'
  }
  const loader = ora(oraOption)
  return loader.start()
}
