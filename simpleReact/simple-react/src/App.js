import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import 'antd/dist/antd.css';
import {
	Button,
} from 'antd';

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
						{ele.title}
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
		console.log('按键：');
		if (e.keyCode === 13) {
			console.log('enter');
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
		// this.deleteElement(element.id);
		// this.addElement(element.id,'物理');
		this.editElement(element.id, '物理');
	}

	// add element after id,
	// TODO: generate unique id
	addElement(id, titleText) {
		let mylist = this.state.dataList;
		let newElement = {
			title: titleText,
			id: '0009',
			children: [

			]
		};

		function mapList(item) {
			if (item && Array.isArray(item)) {
				for (let i = 0, len = item.length; i < len; i++) {
					if (item[i].id === id) {
						// handle here
						console.log('添加：' + item[i].title);
						item.splice(i + 1, 0, newElement);
						return item;
					}
					if (item[i].children && Array.isArray(item[i].children)) {
						item[i].children = mapList(item[i].children);
					}
				}
			}
			return item;
		}

		this.setState({
			dataList: mapList(mylist),
		});
	}

	// delete element with id
	deleteElement(id) {
		let mylist = this.state.dataList;

		function mapList(item) {
			if (item && Array.isArray(item)) {
				for (let i = 0, len = item.length; i < len; i++) {
					if (item[i].id === id) {
						// handle here
						console.log('删除：' + item[i].title);
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

		this.setState({
			dataList: mapList(mylist),
		});
	}

	// edit element with id and titleText
	editElement(id, titleText) {
		let mylist = this.state.dataList;

		function mapList(item) {
			if (item && Array.isArray(item)) {
				for (let i = 0, len = item.length; i < len; i++) {
					if (item[i].id === id) {
						// handle here
						console.log('编辑：' + item[i].title);
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

		this.setState({
			dataList: mapList(mylist),
		});
	}

	render() {
		return (
			<div className="App"
				onKeyPress={this.handleKeyPress}
				tabIndex="0"
			>
				<header className="App-header">
					<Button
						type="primary"
						onClick={() => output(this.state.data)}
					> show </Button>
					<AppTree
						dataList={this.state.dataList}
						onClick={(element, e) => this.handleClick(element, e)}
						onDoubleClick={(element, e) => this.handleDoubleClick(element, e)}
						selectId={this.state.selectId}
					/>
				</header>
			</div>
		);
	}
}

// 将对象展开成目录树
function treeList(arr, obj, str) {
	if (obj) {
		for (let i in obj) {
			arr.push(str + i);
			if (typeof obj[i] === 'object') {
				treeList(arr, obj[i], str + '|----');
			} else {
				arr.push(str + '|----' + obj[i]);
			}
		}
		return arr;
	}
}

// 输出目录树
function output(obj) {
	let resarr = treeList([], obj, '|----');
	for (let i in resarr) {
		console.log(resarr[i]);
	}
}

export default App;
