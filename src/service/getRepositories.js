require('es6-promise').polyfill()

const axios = require('axios')

const { basename } = require('path')

const downloadGitRepo = require('download-git-repo')

const service = axios.create({
  headers: {
    'User-Agent': 'RVya',
    Authorization: 'token ee04e6d05dee078380f8d5e7bbb7f2922981d1de'
  }
})

service.interceptors.request.use(function(config) {
  return config
})

module.exports = class getRepositoriesFromGithub {
  constructor(repoType, repoScope) {
    this.repoType = repoType
    this.repoScope = repoScope
  }

  /** Promise Base Fetch */
  baseFetch(url) {
    return service
      .get(url)
      .then((response) => {
        if (response.status >= 400) {
          throw new Error('Bad response from server')
        }
        const data = response.json()
        if (data.message === 'Not Found') {
          throw new Error('This Api Url Not Found')
        }
        return data
      })
      .catch((err) => {
        console.info(err)
        throw new Error('Authentication failed')
      })
  }

  async fetchRepoList() {
    const repoListApiUrl = `https://api.github.com/${this.repoType}s/${
      this.repoScope
    }/repos`
    return await this.baseFetch(repoListApiUrl)
  }

  async fetchRepoTagList(repo) {
    const { url } = await this.fetchGitInfo(repo)
    const api = `https://api.github.com/repos/${url}/tags`

    return this.baseFetch(api)
  }

  async fetchGitInfo(repo) {
    let template = repo
    let [scaffold] = template.split('@')

    scaffold = basename(scaffold)

    template = template
      .split('@')
      .filter(Boolean)
      .join('#')
    const url = `${this.repoScope}/${template}`
    return {
      url,
      scaffold
    }
  }

  async downloadGitRepo(repo) {
    const { url, scaffold } = await this.fetchGitInfo(repo)

    return new Promise((resolve, reject) => {
      downloadGitRepo(url, process.cwd(), (err) => {
        if (err) {
          reject(err)
          return
        }
        resolve(true)
      })
    })
  }
}
