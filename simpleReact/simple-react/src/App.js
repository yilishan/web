import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import 'antd/dist/antd.css';
import {
	Button,
	Input,
} from 'antd';

// History
function History(props) {
	let content = props.history.map((item, index) => {
		return (<a className='App-History-a' href='#' onClick={() => props.resetHistory(index)} key={index}>{index + 1}. {item.operation}：{item.title}</a>);
	});
	return (
		<div className='App-tree-root'>
			<h3>历史记录</h3>
			{content}
		</div>
	);
}

const { TextArea } = Input;
// input obj, return TreeNode of Tree
class AppTree extends React.Component {
	// show array data to tree Recursively 
	mapData = (item) => {
		if (item && Array.isArray(item)) {
			return item.map((ele) => {
				return (
					<div
						className={(this.props.selectId && this.props.selectId === ele.id) ? 'App-tree-node-selected' : 'App-tree-node'}
						onClick={(e) => this.props.onClick(ele, e)}
						onDoubleClick={(e) => this.props.onDoubleClick(ele, e)}
						key={ele.id}
					>
						<Input type={'text'} style={{border:'0 solid #fff', marginTop:'2px'}} defaultValue={ele.title} onChange={(e) => this.props.editElement(ele.id, e.target.value)} />
						{(ele.children && Array.isArray(ele.children)) ? this.mapData(ele.children) : ''}
					</div>
				);
			});
		} else {
			return [];
		}
	}

	render() {
		let content = this.mapData(this.props.dataList);
		return (
			<div className='App-tree-root'>
				{content}
			</div>
		);
	};
}

let timer = 0;
let delay = 200;
let prevent = false;

class App extends Component {
	constructor() {
		super();
		this.state = {
			data: {
				'学科': {
					'数学': {
						'老高1': '59',
						'老高2': '58',
						'老高3': '57',
					},
					'物理': {
						'老杨1': '59',
						'老杨2': '58',
					},
					'英语': {
						'小明1': '59',
						'小明2': '58',
					},
				},
			},
			idList: ['0001', '0002', '0003', '0004', '0005', '0006', '0007', '0008', '0009',],
			history: [
				// {
				// 	operation: '添加',
				// 	title: '语文',
				// 	data: [{
				// 		title: '几何',
				// 		id: '0006',
				// 		children: [],
				// 	}],
				// },
			],
			selectId: '',
			dataList: [
				{
					title: '学科',
					id: '0001',
					children: [
						{
							title: '语文',
							id: '0002',
							children: [
								{
									title: '现代文',
									id: '0003',
									children: [

									]
								},
								{
									title: '文言文',
									id: '0004',
									children: [

									]
								},
							]
						},
						{
							title: '数学',
							id: '0005',
							children: [
								{
									title: '几何',
									id: '0006',
									children: [

									]
								},
								{
									title: '代数',
									id: '0007',
									children: [

									]
								},
							]
						},
					]
				},
			],
		};
	}

	// onKeyPress
	handleKeyPress(e) {
		let me = this;
		let selectId = me.state.selectId;
		console.log(e.key);
		switch (e.key) {
			case 'Enter':
				if (selectId && selectId !== '') {
					me.addElement('物理', 'current');
				}
				break;
			default:
		}
	}

	// onclick
	handleClick(element, e) {
		e.preventDefault();
		e.stopPropagation();
		let me = this;
		timer = setTimeout(function () {
			if (!prevent) {
				me.doClick(element);
			}
			prevent = false;
		}, delay);
	}

	// onDoubleClick
	handleDoubleClick(element, e) {
		e.preventDefault();
		e.stopPropagation();
		clearTimeout(timer);
		prevent = true;
		this.doDoubleClick(element);
	}

	doClick(element) {
		console.log('单击:' + element.title, element.id);
		this.setState({
			selectId: element.id,
		});
	}

	doDoubleClick(element) {
		console.log('双击:' + element.title);
		// this.dataModify(element.id, element.title + '123', 'EDIT');
		// this.deleteElement();
		// this.addElement('物理');
		this.editElement(element.id, '物理');
	}

	// add element after id, type: current/children
	// TODO: generate unique id
	addElement(titleText, type) {
		let mylist = this.state.dataList;
		let id = this.state.selectId;

		this.getId();
		let newElement = {
			title: titleText,
			id: this.getId(),
			children: [

			]
		};

		function mapList(item) {
			if (item && Array.isArray(item)) {
				for (let i = 0, len = item.length; i < len; i++) {
					if (item[i].id === id) {
						// handle here
						console.log('添加：' + item[i].title);
						if (type === 'current') {
							item.splice(i + 1, 0, newElement);
						} else if (type === 'children') {
							console.log(item[i].children);
							item[i].children.push(newElement);
						}
						return item;
					}
					if (item[i].children && Array.isArray(item[i].children)) {
						item[i].children = mapList(item[i].children);
					}
				}
			}
			return item;
		}

		mylist = mapList(mylist);
		this.addHistory((type === 'current') ? '添加节点' : '插入子节点', titleText, mylist);
		this.setState({
			dataList: mylist,
		});
	}

	// delete element with id
	deleteElement() {
		let mylist = this.state.dataList;
		let id = this.state.selectId;
		let myTitle = '';

		if (id === '') {
			return;
		}

		function mapList(item) {
			if (item && Array.isArray(item)) {
				for (let i = 0, len = item.length; i < len; i++) {
					if (item[i].id === id) {
						// handle here
						console.log('删除：' + item[i].title);
						myTitle = item[i].title;
						item.splice(i, 1);
						return item;
					}
					if (item[i].children && Array.isArray(item[i].children)) {
						item[i].children = mapList(item[i].children);
					}
				}
			}
			return item;
		}

		mylist = mapList(mylist);
		this.addHistory('删除节点', myTitle, mylist);
		this.setState({
			selectId: '',
			dataList: mylist,
		});
	}

	// edit element with id and titleText
	editElement(id, titleText) {
		let mylist = this.state.dataList;
		let myTitle = '';

		function mapList(item) {
			if (item && Array.isArray(item)) {
				for (let i = 0, len = item.length; i < len; i++) {
					if (item[i].id === id) {
						// handle here
						console.log('编辑：' + item[i].title);
						myTitle = item[i].title;
						item[i].title = titleText;
						return item;
					}
					if (item[i].children && Array.isArray(item[i].children)) {
						item[i].children = mapList(item[i].children);
					}
				}
			}
			return item;
		}

		mylist = mapList(mylist);
		this.addHistory('编辑节点', myTitle, mylist);
		this.setState({
			dataList: mylist,
		});
	}

	// getId, without repetition, use timestamp right now
	getId() {
		let id = Date.now().toString();
		let idList = this.state.idList;
		// delete repetition
		if (idList.indexOf(id) !== -1) {
			id = this.getId();
		} else {
			this.setState({
				idList: idList.concat(id),
			});
		}
		return id;
	}

	// add history
	addHistory(operation, title, list) {
		const historyLength = 5;
		const [...mylist] = list;
		let myHistory = this.state.history;
		let newElement = {
			operation: operation,
			title: title,
			data: mylist,
		};

		while (myHistory.length >= historyLength) {
			myHistory.shift();
		}
		myHistory.push(newElement);
		console.log('历史：', JSON.stringify(myHistory));
		this.setState({
			history: myHistory,
		});
	}

	// reset history to index
	resetHistory(index) {
		let myHistory = this.state.history;
		let myDataList = myHistory[index].data;
		let deleteLength = myHistory.length - index - 1;
		myHistory.splice(index, deleteLength);
		console.log('回溯历史：', myHistory, myDataList);
		this.setState({
			dataList: myDataList,
			history: myHistory,
			selectId: '',
		});
	}

	render() {
		return (
			<div className="App"
				onKeyPress={this.handleKeyPress.bind(this)}
				tabIndex="0"
			>
				<header className="App-header">
					<Button
						className='App-btn'
						type="danger"
						onClick={this.deleteElement.bind(this)}
					> 删除 </Button>
					<Button
						className='App-btn'
						type="primary"
						onClick={this.addElement.bind(this, '化学', 'current')}
					> 插入节点(Enter) </Button>
					<Button
						className='App-btn'
						type="primary"
						onClick={this.addElement.bind(this, '阿拉伯语', 'children')}
					> 添加子节点 </Button>
					<p className='App-p'>当前选中id：{this.state.selectId}</p>
					<AppTree
						dataList={this.state.dataList}
						onClick={(element, e) => this.handleClick(element, e)}
						onDoubleClick={(element, e) => this.handleDoubleClick(element, e)}
						selectId={this.state.selectId}
						editElement={(id, titleText) => this.editElement(id, titleText)}
					/>
					<History history={this.state.history} resetHistory={this.resetHistory.bind(this)}></History>
				</header>
			</div>
		);
	}
}

export default App;
