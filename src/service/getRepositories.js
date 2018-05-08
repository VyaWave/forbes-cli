require('es6-promise').polyfill()

import { basename } from 'path'
const fetch = require('isomorphic-fetch')

const downloadGitRepo = require('download-git-repo')

export class getRepositoriesFromGithub {
  constructor(repoType, repoScope) {
    this.repoType = repoType
    this.repoScope = repoScope
  }

  /** Promise Base Fetch */
  baseFetch(url) {
    return fetch(url).then(function(response) {
      if (response.status >= 400) {
        throw new Error('Bad response from server')
      }
      const data = response.json()
      if (data.message === 'Not Found') {
        throw new Error('This Api Url Not Found')
      }
      console.log('baseFetch:', data)
      return data
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

    console.info(url, scaffold)
    return new Promise((resolve, reject) => {
      downloadGitRepo(url, `./test`, (err) => {
        if (err) {
          reject(err)
          return
        }
        resolve(true)
      })
    })
  }
}
