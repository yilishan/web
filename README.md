### follow [教程：从零开始使用webpack 4, Babel 7创建一个React项目（2018）](https://zhuanlan.zhihu.com/p/47704649)
当前进行到了：webpack需要两个工具来生成这个html文件：html-webpack-plugin跟html-loader

# 目录

### |---knowledgeTree
### |---web
###     |---myreactapp
###         |---注： webpack+react创建项目
###     |---tic-tac-toe
###         |---注： react官网快速上手游戏
###     |---simpleReact 
###         |---注： 单页react项目

-------------

# how to use
1. clone to your workspace
2. enter into project directory
3. npm install
4. npm run start

-------------

# plan
## *2019-04-08*
### 写一个tree控件
- [x] 最基本的功能：根据数据展示tree形目录
- [X] 响应鼠标事件
- [X] 选中字段功能：点击，定位对象，标识出来
- [X] 交互定义：单击->选中（变色突出），双击orF2->编辑（变为输入框），选中状态下delete->删除节点，选中状态下回车->下一级目录下新建一个节点
- [X] 响应键盘事件
- [X] javascript判断数组元素重复
- [x] 随机生成不重复的id
- [X] 添加节点
- [X] 添加子节点
- [X] 删除节点
- [X] 历史记录
- [X] 撤销操作
- [X] 编辑字段功能
- [X] 展开收起功能
- [ ] 全部展开/收起（节点及子节点递归操作）
- [ ] 导航竖线存在对齐问题
- [ ] 搜索
- [ ] 可以定制的样式（参考antd）

--------------

# problem
### 1. onClick 与 onDoubleClick冲突的问题
[参考stackoverflow](https://stackoverflow.com/questions/25777826/onclick-works-but-ondoubleclick-is-ignored-on-react-component)  
[参考W3C规范](https://www.w3.org/TR/DOM-Level-3-Events/#event-type-dblclick)  
解决方法：不要同时使用单击和双击事件，这种应用场景，应该由用户进行代理调度  

### 2. 键盘事件在div中不响应的问题  
解决方法：添加 ==tabIndex="0"== 后即可
```html
<div className="App"
    onKeyPress={this.handleKeyPress}
    tabIndex="0"
>
```

### 3. 键盘事件不能捕获Insert、F2这些功能按键

### 4. addHistory中后续动作会修改前面的对象数据

### 5. 使用input后功能如何设置需要重新思考

### 6. npm run start 启动缓慢

### 7. 思维导图实现思路
参考:[用JS的库实现在线思维导图](https://www.crifan.com/use_js_lib_implement_online_mind_map/)
