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
					<div className='App-tree-node' onClick={(e) => this.props.onClick(ele,e)} key={ele.id}>
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
		let content = this.mapData(this.props.value);
		return (
			<div className='App-tree-root'>
				{content}
			</div>
		);
	};
}

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

	// onclick
	handleClick(element,e) {
		e.preventDefault();
		e.stopPropagation();
		console.log(element.title + '被点击了', element.id);
		this.dataModify(element.id, element.title + '123');
	}

	//  input id & , then can do select/add/delete/modify/find
	dataModify(id, value) {
		let mylist = this.state.dataList;

		function mapList(item) {
			if (item && Array.isArray(item)) {
				for (let i = 0, len = item.length; i < len; i++) {
					if (item[i].id === id) {
						console.log(item[i].title, value);
						// handle here
						item[i].title = value;
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
			<div className="App">
				<header className="App-header">
					<Button type="primary" onClick={() => output(this.state.data)}> show </Button>
					<AppTree
						value={this.state.dataList}
						onClick={(element,e) => this.handleClick(element,e)}
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
