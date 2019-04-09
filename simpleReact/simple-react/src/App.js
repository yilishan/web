import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import 'antd/dist/antd.css';
import {
	Button,
	Tree,
} from 'antd';

// input obj, return TreeNode of Tree
class AppTree extends React.Component {
	mapData = (item) => {
		if (item && Array.isArray(item)) {
			return item.map((ele) => {
				if (ele.children && Array.isArray(ele.children)) {
					return (
						<div className='App-tree-div' key={ele.title}>
							{ele.title}
							{this.mapData(ele.children)}
						</div>
					);
				} else {
					return (
						<div className='App-tree-div' key={ele.title}>
							{ele.title}
						</div>
					);
				}
			});
		} else {
			return [];
		}
	}

	render() {
		let content = this.mapData(this.props.value);

		return (
			<div>
				{content}
			</div>
		);
	};
}

const { TreeNode } = Tree;
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
					children: [
						{
							title: '语文',
							children: [
								{
									title: '现代文',
									children: [

									]
								},
								{
									title: '文言文',
									children: [

									]
								},
							]
						},
						{
							title: '数学',
							children: [
								{
									title: '几何',
									children: [

									]
								},
								{
									title: '代数',
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

	render() {
		return (
			<div className="App">
				<header className="App-header">
					<Button type="primary" onClick={() => output(this.state.data)}> show </Button>
					{/* <Tree
						showLine
						defaultExpandedKeys={['0-0-0']}
						onSelect={this.onSelect}
					>
						<TreeNode title='root' key="0-0">
							<TreeNode title="parent 1-0" key="0-0-0">
								<TreeNode title="leaf" key="0-0-0-0" />
								<TreeNode title="leaf" key="0-0-0-1" />
								<TreeNode title="leaf" key="0-0-0-2" />
							</TreeNode>
							<TreeNode title="parent 1-1" key="0-0-1">
								<TreeNode title="leaf" key="0-0-1-0" />
							</TreeNode>
							<TreeNode title="parent 1-2" key="0-0-2">
								<TreeNode title="leaf" key="0-0-2-0" />
								<TreeNode title="leaf" key="0-0-2-1" />
							</TreeNode>
						</TreeNode>
					</Tree> */}
					<AppTree value={this.state.dataList} />
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
