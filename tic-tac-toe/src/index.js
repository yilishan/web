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
    // 状态数据提升到了board中
    /* constructor(){
        // 在使用 JavaScript classes 时，你必须调用 super(); 方法才能在继承父类的子类中正确获取到类型的 this 
        super();
        // 每当 this.setState 方法被触发时，组件都会开始准备更新，React 通过比较状态的变化来更新组件当中跟随数据改变了的内容。每当 this.setState 方法被触发时，组件都会开始准备更新，React 通过比较状态的变化来更新组件当中跟随数据改变了的内容。
        // 当你遇到需要同时获取多个子组件数据，或者两个组件之间需要相互通讯的情况时，把子组件的 state 数据提升至其共同的父组件当中保存。之后父组件可以通过 props 将状态数据传递到子组件当中。这样应用当中的状态数据就能够更方便地交流共享了。
        this.state = {
            value: null,
        };
    } */
    
    render() {
        return (
            // <button className="square" onClick={() => this.setState({value:'X'})}>
            // 事件处理函数也可以简化写成：onClick={props.onClick}
            <button className="square" onClick={() => this.props.onClick()}>
                {this.props.value}
            </button>
        );
    }
} 

// React 专门为像 Square 组件这种只有 render 方法的组件提供了一种更简便的定义组件的方法： 函数定义组件
// 函数定义的方式重写 Square 组件
/*
function Square(props) {
    return (
        <button className="square" onClick={props.onClick}>
            {props.value}
        </button>
    );
}
*/

// 棋盘
class Board extends React.Component {
    constructor() {
        super();
        // 这里是square状态提升的结果，可以方便的管理子组件的状态数据
        this.state = {
            squares: Array(9).fill(null),
            xIsNext: true,
        };
    }

    handleClick(i) {
        // 使用slice对数组进行浅拷贝，涉及到react中的不可变性的重要性
        const squares = this.state.squares.slice();
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            squares: squares,
            xIsNext: !this.state.xIsNext,
        });
    }

    renderSquare(i) {
        // 传递一个名为 value 的 prop 到 Square 当中
        // 再通过 props 传递一个父组件当中的事件处理函数到子组件当中。也就是从 Board 组件里传递一个事件处理函数到 Square 当中
        return(
            <Square 
                value={this.state.squares[i]} 
                onClick={() => this.handleClick(i)}
            />
        );
    }

    render() {
        const status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');

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
  