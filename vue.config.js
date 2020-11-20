const path = require('path');        //引入path模块
function resolve(dir){
  return path.join(__dirname,dir)  //path.join(__dirname)设置绝对路径
}

module.exports = {
  // configureWebpack:{
  //   resolve:{  //resolve 配置路经相关
  //     extensions:[], //配置后缀名 某些路径的后缀名就不用写了 这里不用配置 已经配置完了
  //     alias:{ //配置别名
  //       'assets': '@/assets',
  //       'common': '@/common',
  //       'components': '@/components',
  //       'network': '@/network',
  //       'views': '@/views',
  //     }
  //   }
  // }
  chainWebpack:(config)=>{
    config.resolve.alias
    config.resolve.alias.set('@', resolve('src'))
      .set('components', resolve('src/components'))
      .set('assets',resolve('src/assets'))
      .set('common',resolve('src/common'))
      .set('network',resolve('src/network'))
      .set('views',resolve('src/views'))
    //set第一个参数：设置的别名，第二个参数：设置的路径　　　
  }

}

