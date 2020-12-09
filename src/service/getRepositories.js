require('es6-promise').polyfill()

const { basename } = require('path')

const request = require('request')

const downloadGitRepo = require('download-git-repo')

module.exports = class getRepositoriesFromGithub {
  constructor(repoType, repoScope) {
    this.repoType = repoType
    this.repoScope = repoScope
  }

  fetch(api) {
    return new Promise((resolve, reject) => {
      request(
        {
          url: api,
          method: 'GET',
          headers: {
            'User-Agent': 'RVya'
          }
        },
        (err, res, body) => {
          if (err) {
            reject(err)
            return
          }
          const data = JSON.parse(body)
          if (data.message === 'Not Found') {
            reject(new Error(`${api} is not found`))
          } else {
            resolve(data)
          }
        }
      )
    })
  }

  async fetchRepoList() {
    const repoListApiUrl = `https://api.github.com/${this.repoType}s/${this.repoScope}/repos`
    return await this.fetch(repoListApiUrl)
  }

  async fetchRepoTagList(repo) {
    const { url } = await this.fetchGitInfo(repo)
    const api = `https://api.github.com/repos/${url}/tags`

    return this.fetch(api)
  }

  async fetchGitInfo(repo) {
    let template = repo
    let [scaffold] = template.split('@')

    scaffold = basename(scaffold)

    template = template.split('@').filter(Boolean).join('#')
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
