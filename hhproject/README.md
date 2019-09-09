# Grand Project
## 2019-07-25
1. 创建项目
2. 遇到vscode中rg.exe内存占用过大的问题，使用cnpm install --by=npm重装后解决
3. 如何使用babel？
4. 如何antd按需加载？参考：https://www.cnblogs.com/yulingjia/p/9724052.html ， https://blog.csdn.net/zoepriselife316/article/details/88063171
   - npm install customize-cra --save
   - npm install react-app-rewired@2.x --save
   - 根目录添加config-overrides.js，内容见内
   - npm install less --save
   - npm install less-loader --save
   - 修改package.json：
        ```json 
        "scripts": {
            "start": "react-app-rewired start",
            "build": "react-app-rewired build",
            "test": "react-app-rewired test",
            "eject": "react-app-rewired eject"
        }
        ```
   - 根目录添加文件.babelrc
        ```json
        "plugins": [
            ["import", {
                "libraryName": "antd",
                "libraryDirectory": "es",
                "style": "css" // `style: true` 会加载 less 文件
            }],
            "transform-runtime"
        ]
        ```   
   - 重启项目
5. 如何使用less？
6. 设置路由？

## 2019-07-26
1. 安装react-router：npm install --save react-router ， 文档：http://react-guide.github.io/react-router-cn/index.html
2. 安装react-router-dom：npm install --save react-router-dom
3. 全局变量置于：global/config.js
4. 提取组件NameShow、MySteps
5. 解决组件中绑定this的问题
6. 通过withRouter实现页面跳转和传参：https://www.jianshu.com/p/52528ebb771d

## 2019-07-27
1. 安装axios：npm isntall axios --save
2. 使用https://www.mockapi.io 在线模拟数据，接口如：http://5d3bcfa4552bfb00148e0449.mockapi.io/mock/v1/test
3. axios请求跨域问题：package.json中添加"proxy": "http://5d3bcfa4552bfb00148e0449.mockapi.io"
4. 添加server.js，进入目录后启动服务器过程：
   - 启动mongodb
   - 启动服务nodemon server.js
   - 服务器地址：http://localhost:9093
5. server返回静态数据http://localhost:9093/title & http://localhost:9093/identity，实现和mockapi.io相同功能
6. 考虑常用数据缓存机制，比如在global中设置常用数据，页面跳转直接从其中获取。同时每次进入时更新global数据，从而达到无感拉取数据的过程
7. 如何打包、发布？
8. 如何配置数据库自启动？

## 2019-07-29
1. 添加注册登录页
2. 完成登录页数据判空
3. 登录页TODO
   1. [x] md5加密
   2. [x] 服务器获取验证
   3. [x] 跳转页面

## 2019-07-30
1. npm i --save cookie-parser
2. npm i --save body-parser
3. 完成登录->后端->数据库->返回结果

## 2019-07-31
1. app.use(cookieParser())要在app.use('/user', userRoute)前面，否则无法使用req.cookies获取到参数
2. 添加登录后跳转至首页 | 登录态写入cookie 
3. 注册页TODO
   1. [x] 新增用户数据
   2. [x] 用户数据判重提示
   3. [x] 跳转页面
   4. [x] 用户登录后注销登录操作

## 2019-08-01
1. 添加注销登录按钮
2. npm i --save react-cookies
3. 添加登录加载
4. 添加登录错误提示
5. app.use(bodyParser.json())要在app.use('/user', userRoute)前面，否则无法使用req.body获取到参数
6. npm install md5 --save
7. 完成注册 | 注销 | 错误提示 | 加载提示 | md5加密(加盐)
8. 数据库清空旧数据
9. 添加注册时用户身份选择

## 2019-08-02
1. 修改步骤
2. npm install moment --save, 处理日期格式的库
3. 配置委托单字段对照表 | 新增新建产品页

## 2019-08-04
1. 注册添加部门选择
2. 分离添加产品和编辑委托信息
3. 完善新建产品展示和数据库 | 产品列表初步展示

## 2019-08-05
1. 遍历数组：Object.keys(obj).map(key => console.log(obj[key]));
2. 编辑委托信息修改中...

## 2019-08-06
1. antd中defaultValue在每次组件变化后都会重新计算
2. 设置默认日期：moment().format('YY.MM.DD')
3. 编辑委托信息修改中2...

## 2019-08-07
1. 添加委托说明样式

## 2019-08-08
1. 如何判断空对象：https://blog.csdn.net/qq_38627581/article/details/77353015
2. 如何判断字符串是否全为空格：使用trim()函数，可移除字符串前面和后面的空格
3. TODO: 委托说明中，校验某些不能有空值的字段，并反馈校验结果
4. 目前bug位置：basicinfo：244-248行，121-122行,问题是productData和attorneyObj中attorneyList嵌套层数不同，这里需要理一下数据逻辑，重新设计字段结构
5. bug接上：一个产品中有产品基本信息+委托单列表，委托单列表中包括委托单信息+委托说明列表，委托说明中若干条不同的委托数据。现在委托单列表和委托说明列表都是用的同一个名字`attorneyList`。只需要将委托说明列表换个名字即可，换为attorneyExplainList

## 2019-09-04
1. 上述bug已修复，面对本页数据比较复杂的特点，考虑使用redux、lodash.get
2. 后续：
   1. 数据判空
   2. 引入lodash.get
   3. 上传图片模块
   4. 生成委托单

## 2019-09-09
1. 导出excel的思路：
      1. 绘制表格，导出excel
      2. 先编写excel模板，再读取修改对应的值，之后导出。这种方法的关键在于导出后的格式能否保留原有样式
      3. 前端可以使用`SheetJS`(https://github.com/SheetJS/js-xlsx)
      4. nodejs可以考虑使用`ejsexcel`https://github.com/sail-sail/ejsExcel
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
