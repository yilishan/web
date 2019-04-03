/**************************************React.Component*****************************/ 
// 通过这种标签语法来使用我们上面声明的组件: <ShoppingList name="Mark" />
// class ShoppingList extends React.Component{
//     render(){
//         return(
//             <div className="shopping-list">
//                 <h1>shopping list for {this.props.name}</h1>
//                 <ul>
//                     <li>weixin</li>
//                     <li>QQ</li>
//                     <li>weibo</li>
//                 </ul>
//             </div>
//         );
//     }
// }
/***********************************************************************************/ 

// 小方格
class Square extends React.Component {
    // 在 React 组件的构造方法 constructor 当中，你可以通过 this.state 为该组件设置自身的状态数据
    constructor(){
        // 在使用 JavaScript classes 时，你必须调用 super(); 方法才能在继承父类的子类中正确获取到类型的 this 
        super();
        // 每当 this.setState 方法被触发时，组件都会开始准备更新，React 通过比较状态的变化来更新组件当中跟随数据改变了的内容。每当 this.setState 方法被触发时，组件都会开始准备更新，React 通过比较状态的变化来更新组件当中跟随数据改变了的内容。
        this.state = {
            value: null,
        }
    }

    render() {
        return (
            <button className="square" onClick={() => this.setState({value:'X'})}>
                {this.state.value}
            </button>
        );
    }
}

// 棋盘
class Board extends React.Component {
    renderSquare(i) {
        // 传递一个名为 value 的 prop 到 Square 当中
        return <Square value={i} />;
    }

    render() {
        const status = 'Next player: X';

        return (
            <div>
            <div className="status">{status}</div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        );
    }
}
  
class Game extends React.Component {
    render() {
        return (
            <div className="game">
                <div className="game-board">
                    <Board />
                </div>
                <div className="game-info">
                    <div>{/* status */}</div>
                    <ol>{/* TODO */}</ol>
                </div>
            </div>
        );
    }
}
  
// ========================================

ReactDOM.render(
    <Game />,
    document.getElementById('root')
);
  