
// const shell = require('shelljs');
const { exec } = require('child_process')

module.exports = function shellExec(cmdStr, options = {}){
    return new Promise((resolve, reject)=>{
        exec(cmdStr, {
            timeout: 40000,
            ...options
        }, (err, stdout)=>{
            if(err.code === 0){
                console.log(stdout)
                console.err(err);
                process.exit();
            }else{
                resolve(stdout)
            }
            
        })
    })
}

// module.exports = function shellExec(cmdStr){
//    return new Promise((succCb, failCb)=> {
//     return shell.exec(cmdStr, function(code, stdout, stderr ){
//         const result = {
//             code, 
//             stdout, 
//             stderr
//         }
//         if(code !== 0) {
//             failCb(result);
//             shell.exit(1);
//         }else{
//             succCb(result);
//         }
//         return result;
//      })
//    })
// }