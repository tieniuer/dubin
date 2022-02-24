const path = require("path");
const fs = require("fs");
const chalk = require("chalk");

const {
  getFileDirByPath,
  getTypeByProDir,
  checkDirRoot,
  shellExec,
} = require("./../lib");
const TYPE_MAP = require("./../lib/type");

class PackageSafeWorker {
  constructor(params) {
    const { proPath } = params || {};
    const defaultPath = path.resolve(process.cwd());
    this.rootPath = proPath || defaultPath;
    this.lockType = getTypeByProDir.LOCK_TYPES[2];
    this.runRes = {};
  }
  //  初始化配置；
  init = async () => {
    // 前置log
    this.LogPreRun();
    // 校验项目目录是否合规
    await this.checkProDir();
  };
  // 前置log
  LogPreRun = () => {
    console.info(
      `${chalk.green(`项目依赖包检测插件启动，该包目前由 @铁牛 维护;`)}`
    );
    console.info(`${chalk.green(`------即将进行项目依赖包安全检测------`)}`);
  };

  checkProDir = async () => {
    let proDir;
    try {
      proDir = await getFileDirByPath(this.rootPath);
    } catch (error) {
      throw error;
    }
    // 检测是否为项目的根目录
    checkDirRoot(proDir);
    // 检测是否含有锁文件;
    this.lockType = getTypeByProDir(proDir);
  };

  // run 扫描流程， 结果以报表形式在控制台展示，以JSON形式return出去
  run = async (isLog) => {
    await this.init();
    console.info(`${chalk.green(`------项目依赖包安全检测启动------`)}`);
    const targetSh =
      TYPE_MAP.find((typeShItem) => typeShItem.type === this.lockType) ||
      TYPE_MAP[2];
    let runRes;
    try {
      runRes = await shellExec(targetSh.cmd);
    } catch (error) {
      runRes = error;
    }
    this.runRes = runRes;
    if (isLog) {
      try {
        const resList = runRes.split("\n") || [];
        for (let i = 0; i < resList.length; i++) {
          try {
            const cuObj = JSON.stringify(JSON.parse(resList[i]), null, 4);
            if (i === resList.length - 2) {
              console.log(chalk.green("===最终检测结果如下===\n"));
            }
                console.log(cuObj)
          } catch (error) {
            if (i === resList.length - 2) {
              console.log("===最终检测结果如下===\n");
            }
            console.log(resList[i]);
          }
        }
      } catch (error) {
        console.log(runRes);
      }
    }
    return runRes;
  };
}

module.exports = PackageSafeWorker;
