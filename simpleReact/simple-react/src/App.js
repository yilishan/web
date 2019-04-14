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
		<div className='App-History'>
			<h3>历史记录</h3>
			{content}
		</div>
	);
}

// input obj, return TreeNode of Tree
class AppTree extends React.Component {
	// show array data to tree Recursively 
	mapData = (item) => {
		if (item && Array.isArray(item)) {
			return item.map((ele) => {
				return (
					<div className='App-tree-node-father' key={'father' + ele.id}>
						<div className='App-tree-node-left' key={'left' + ele.id}>
							<div className='App-tree-node-line' />
						</div>
						<div
							className={(this.props.selectId && this.props.selectId === ele.id) ? 'App-tree-node App-tree-node-selected' : 'App-tree-node'}
							key={'treeNode' + ele.id}
						>
							<div className='App-tree-node-content'>
								<p onClick={() => this.props.changeShowChildren(ele.id)}>{ele.showChildren ? '-' : '+'}</p>
								<Input
									type={'text'}
									// disabled={(this.props.selectId && this.props.selectId === ele.id) ? false : true}
									style={{ border: '0 solid #fff', margin: '1px' }}
									defaultValue={ele.title}
									onChange={(e) => this.props.editElement(ele.id, e.target.value)}
									onClick={(e) => this.props.onClick(ele, e)}
									onDoubleClick={(e) => this.props.onDoubleClick(ele, e)} />
							</div>
							{(ele.showChildren && ele.children && Array.isArray(ele.children)) ? this.mapData(ele.children) : ''}
						</div>
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
					showChildren: true,
					children: [
						{
							title: '语文',
							id: '0002',
							showChildren: true,
							children: [
								{
									title: '现代文',
									id: '0003',
									showChildren: true,
									children: [

									]
								},
								{
									title: '文言文',
									id: '0004',
									showChildren: true,
									children: [

									]
								},
							]
						},
						{
							title: '数学',
							id: '0005',
							showChildren: true,
							children: [
								{
									title: '几何',
									id: '0006',
									showChildren: true,
									children: [

									]
								},
								{
									title: '代数',
									id: '0007',
									showChildren: true,
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
					me.addElement('null', 'current');
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
		this.editElement(element.id, 'null');
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
			showChildren: true,
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

	// change showChildren
	changeShowChildren(id) {
		let mylist = this.state.dataList;
		let myTitle = '';
		let historyText = '';

		function mapList(item) {
			if (item && Array.isArray(item)) {
				for (let i = 0, len = item.length; i < len; i++) {
					if (item[i].id === id && item[i].children.length > 0) {
						// handle here
						console.log('展开/收起：' + item[i].title);
						myTitle = item[i].title;
						historyText = item[i].showChildren ? '收起节点' : '展开节点';
						item[i].showChildren = !item[i].showChildren;
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
		if (historyText !== '') {
			this.addHistory(historyText, myTitle, mylist);
		}
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
		const historyLength = 30;
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
					<AppTree
						dataList={this.state.dataList}
						onClick={(element, e) => this.handleClick(element, e)}
						onDoubleClick={(element, e) => this.handleDoubleClick(element, e)}
						selectId={this.state.selectId}
						editElement={(id, titleText) => this.editElement(id, titleText)}
						changeShowChildren={(id) => this.changeShowChildren(id)}
					/>
					<div className='App-header-div'>
						<Button
							className='App-btn'
							type="danger"
							onClick={this.deleteElement.bind(this)}
						> 删除 </Button>
						<Button
							className='App-btn'
							type="primary"
							onClick={this.addElement.bind(this, 'null', 'current')}
						> 插入节点(Enter) </Button>
						<Button
							className='App-btn'
							type="primary"
							onClick={this.addElement.bind(this, 'null', 'children')}
						> 添加子节点 </Button>
						<p className='App-p'>当前选中id：{this.state.selectId}</p>
					</div>
					<History history={this.state.history} resetHistory={this.resetHistory.bind(this)}></History>
				</header>
			</div>
		);
	}
}

export default App;
