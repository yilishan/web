# Grand Project

## 2019-07-23
1. 安装cnpm：npm install -g cnpm --registry=https://registry.npm.taobao.org
2. 安装create-react-app：cnpm i -g create-react-app
3. create-react-app grandproject
4. cd grandproject/
5. 运行：npm start，开发环境可以实时更新，至此开发环境配置完了
6. 安装redux：cnpm i redux --save
7. 安装express：cnpm i express --save
8. 新建server/server.js，并添加express listen和get
9. cd server, node server.js, 运行成功后可以在http://localhost:9093/看到返回结果
10. 但是上述node启动服务不会热更新，所以可以使用nodemon实现热更新，cnpm i -g nodemon, 以后直接运行nodemon server.js即可热更新