require('es6-promise').polyfill()

const { basename } = require('path')
const fetch = require('isomorphic-fetch')

const downloadGitRepo = require('download-git-repo')

module.exports = class getRepositoriesFromGithub {
  constructor(repoType, repoScope) {
    this.repoType = repoType
    this.repoScope = repoScope
  }

  /** Promise Base Fetch */
  baseFetch(url) {
    return fetch(url, {
      method: 'GET',
      headers: {
        'User-Agent': 'RVya'
      }
    })
      .then(function(response) {
        console.info(response.statusText)
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
