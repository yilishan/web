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
11. 安装mongoose: cnpm i mongoose --save，学习mongoose的增删改查
12. 安装antd-mobile：cnpm i antd-mobile@next --save, 官网：https://mobile.ant.design/docs/react/introduce-cn
13. antd按需加载配置文档：https://mobile.ant.design/docs/react/use-with-create-react-app-cn
14. redux学习：
   - redux专注于状态管理，和react解耦
   - 单一状态，单向数据流
   > 老赵有个保险箱（store），所有状态在那里都有记录（state），需要改变的时候，告诉专员（dispatch）要干什么（action），处理变化的人（reducer）拿到state和action生成新的state

   - 安装redux： cnpm i redux --save
   - 订阅发布的设计模式
   - 和react一起使用:
      - 把store.dispatch方法传递给组件，内部可以调用修改状态
      - Subscribe订阅render函数，每次修改都重新渲染
      - redux相关内容，移到单独的文件index.redux.js单独管理
      - 基本应用：https://www.bilibili.com/video/av47296993/?p=13
      - 更进一步：https://www.bilibili.com/video/av47296993/?p=16 
         - 异步处理：使用redux-thunk中间件，安装：cnpm i redux-thunk --save
         - 调试工具：cnpm i redux-devtools-extension，chrome中redux工具
         - 更优雅的和react结合：使用react-redux优雅连接react和redux
            1. 安装：cnpm i react-redux --save
            2. 忘记subscribe，记住reducer，action和dispatch即可
            3. react-redux提供provider和connect两个接口来连接，里应外合


----
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
