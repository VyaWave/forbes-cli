/**
 * 获取Git Repositories class
 * parameters orgName: Public Org
 * @export
 * @class getRepositoriesFromGithub
 */
export class getRepositoriesFromGithub {
  /**
   * 获取git仓库列表
   */
  constructor(orgName) {
    console.info(orgName)
    this.orgName = orgName
  }
  
  async fetchRepoList() {}

  /**
   * 获取仓库所有的版本
   * @param  {[string]} repo [仓库名称]
   * @return {[type]}      [description]
   */
  async fetchRepoTagList( repo ) {}

  /**
   * 获取仓库详细信息
   * @param  {[string]} repo [仓库名称]
   * @return {[type]}      [description]
   */
  async fetchGitInfo( repo ) {}

  /**
   * 下载git仓库代码到指定文件夹
   * @param  {[string]} repo [仓库名称]
   * @return {[type]}      [description]
   */
  async downloadGitRepo( repo ) {}
}
