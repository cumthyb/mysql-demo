const koa = require('koa');
const app = new koa();
const cors = require('koa2-cors');
const bodyParser = require('koa-bodyparser')
const routes = require('./router')
const { getConnection } = require("./util/index.js")
const PORT = 3013

getConnection().then(conn => {
  if (conn.state === 'disconnected') {
    console.log('连接失败')
    debug_mysql(conn)
    return
  }
  else {
    app.use(cors({
      origin: function (ctx) {
        // if (ctx.url === '/test') {
          return "*"; // 允许来自所有域名请求
        // }
        return 'http://localhost:3013'; // 这样就能只允许 http:/ / localhost: 8080 这个域名的请求了
      },
      exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
      maxAge: 5,
      credentials: true,
      allowMethods: ['GET', 'POST', 'DELETE'],
      allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
    }))

    let router = routes(conn);

    app
      .use(bodyParser())
      .use(router.routes())
      .use(router.allowedMethods());

    app.listen(PORT, () => {
      console.log("server started at port ", PORT)
    });

  }
}).catch(err => {
  console.log('连接失败: ', err)
})



