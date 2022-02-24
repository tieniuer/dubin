const chalk = require('chalk');

const LOCK_FILES = ['yarn.lock', 'package-lock.json'];

const LOCK_TYPES = ["YARN", "NPM","NO_TYPE"];

function getTypeByProDir( proDir ){
    
    if(proDir.indexOf(LOCK_FILES[0]) > -1){
        console.info(`${chalk.blue(`======检测到${LOCK_FILES[0]}文件======`)}`)
        return LOCK_TYPES[0];
    }
    if(proDir.indexOf(LOCK_FILES[1]) > -1){
        console.info(`${chalk.blue(`======检测到${LOCK_FILES[1]}文件======`)}`)
        return LOCK_TYPES[1];
    }
    console.info(`${chalk.warning(`======警告:未检测到任何依赖锁文件======`)}`)
    return LOCK_TYPES[2];
}
getTypeByProDir.LOCK_FILES = LOCK_FILES;
getTypeByProDir.LOCK_TYPES = LOCK_TYPES;

module.exports = getTypeByProDir;