const program = require('commander')
const inquirer = require('inquirer')
const downloadGitRepo = require('download-git-repo')
import { OraLoading } from '../utils/loading'

import { getRepositoriesFromGithub } from '../service'

const service = new getRepositoriesFromGithub('org', 'Template-Store')

const config = {
  repoType: 'org', // org | user
  repoScope: 'Template-Store'
}

const fetchGithubRepoTemplate = (cb) => {
  downloadGitRepo(
    'Template-Store/webpack-demo',
    process.cwd(),
    false,
    (errMark) => {
      console.log(errMark ? 'Sorry Create Fail' : 'Create Success')
    }
  )
}

program
  .command('install')
  .description('install template project to current dir')
  .action(async (options) => {
    console.log('install command')

    let loader = OraLoading('fetch repo list')
    let repos = await service.fetchRepoList()
    loader.succeed('fetch repo list success')
    if (repos.length === 0) {
      throw new Error(
        `There is no any scaffolds in https://github.com/${
          config.repoScope
        }. Please create and try`
      )
    }

    //list命令的实现体
    let choices = repos.map((r) => r.name)

    // 类型
    const questions = [
      {
        type: 'list',
        name: 'repo',
        message: 'which repo do you want to install?',
        choices
      }
    ]
    // 调用问题
    let answers = await inquirer.prompt(questions).then((answers) => {
      console.log(answers) // 输出最终的答案
      // fetchGithubRepoTemplate()
      return answers
    })

    // 取出选择的git仓库
    const repo = answers.repo
    // 获取选择仓库所有的版本

    let version
    loader = OraLoading('fetch repo tag list')
    const tags = await service.fetchRepoTagList(repo)
    loader.succeed('fetch repo tag list success')
    if (tags.length === 0) {
      version = ''
    } else {
      choices = tags.map(({ name }) => name)
      answers = await inquirer.prompt([
        {
          type: 'list',
          name: 'version',
          message: 'which version do you want to install?',
          choices
        }
      ])
      version = answers.version
    }

    loader = OraLoading('begin download repo')
    let result = await service.downloadGitRepo([repo, version].join('@'))
    //console.log( result ? 'SUCCESS' : result )
    loader.succeed('download repo success')
    console.dir(result)
  })

//开始解析用户输入的命令
program.parse(process.argv)
