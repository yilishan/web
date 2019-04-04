import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
	constructor(){
		super();
		this.state = {
			data: {
				'学科': {
					'数学':{
						'老高1': '59',
						'老高2': '58',
						'老高3': '57',
					},
					'物理':{
						'老杨1': '59',
						'老杨2': '58',
					},
					'英语':{
						'小明1': '59',
						'小明2': '58',
					},
				},
			},
		};
	}

	render() {
		return (
			<div className="App">
				<header className="App-header">
					{/* <img src={logo} className="App-logo" alt="logo" />
					<p>
						Edit <code>src/App.js</code> and save to reload.
					</p>
					<a
						className="App-link"
						href="https://reactjs.org"
						target="_blank"
						rel="noopener noreferrer"
					>
						Learn React now123
					</a> */}
					<button onClick={() => output(this.state.data)}>show</button>
				</header>
			</div>
		);
	}
}

// 将对象展开成目录树
function treeList(arr, obj, str){
	if(obj){
		for(let i in obj){
			arr.push(str + i);
			if(typeof obj[i] === 'object'){
				treeList(arr, obj[i], str + '|----');
			}else{
				arr.push(str+ '|----' + obj[i]);
			}
		}
		return arr;
	}
}

// 输出目录树
function output(obj){
	let resarr = treeList([], obj, '|----');
	for(let i in resarr){
		console.log(resarr[i]);
	}
}

export default App;
