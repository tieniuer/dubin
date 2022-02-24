
const fs = require('fs');
const chalk = require('chalk');

module.exports = function getFileDirByPath( dirPath ){
    return new Promise((sussCb, failCb) => fs.readdir(dirPath,  (err, res) => {
        if(!err) {
            sussCb(res);
        }else{
            console.error(`${chalk('项目路径读取出错，请检测环境node版本')}`)
            failCb(err);
            throw err;
        }
    }))
}