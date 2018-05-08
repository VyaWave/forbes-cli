import ora from 'ora'

export const OraLoading = (action = 'getting', repo = '') => {
  const loader = ora(`${action} ${repo}`)
  return loader.start()
}
