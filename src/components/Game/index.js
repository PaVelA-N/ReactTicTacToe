import React from 'react';
import {Board} from '../Board';

console.log('Expot game');

function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }

class Game extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        history: [{
          squares: Array(9).fill(null),
        }],
        stepHistory: [
           {column: null, row: null},
        ],
        stepNumber: 0,
        xIsNext: true,
      };
    }
  
    handleClick(i) {
      const history = this.state.history.slice(0, this.state.stepNumber + 1);
      const stepHistory = this.state.stepHistory.slice(0, this.state.stepNumber + 1);
      const current = history[history.length -1];
      const stepLocation = stepHistory[stepHistory.length -1];
      const squares = current.squares.slice(); // arr.slice() создаёт копию массива arr
      if (calculateWinner(squares)|| squares[i]){ /* если есть победитель или ячейка squares[i] уже не null (уже заполнена), то из этого условия
        handleClick выходит по return. Если условие не срабатывает, то handleClick обрабатывает дальше - дает ввести значение */
        return;
      }
      squares[i] = this.state.xIsNext ? 'X' : 'O';
      this.setState({
        history: history.concat([{ /*concat создает новый массив = history + [{squares}]  */
          squares: squares,
        }]),
        stepHistory: stepHistory.concat([
          {column: i % 3 + 1 , row: Math.trunc(i/3 +1)},
        ]),
        stepNumber: history.length,
        xIsNext : !this.state.xIsNext,
      });
    }
  
    jumpTo(step) {
      this.setState({
        stepNumber: step,
        xIsNext: (step % 2) === 0,
      });
    }
  
    render() {
      const history = this.state.history;
      const stepHistory = this.state.stepHistory;
      const current = history [this.state.stepNumber];
      const winner = calculateWinner(current.squares);
  
      const moves = history.map((step, move) => {
        const desc = move ?
         'перейти к ходу #' + move + `(столбец: ${stepHistory[move].column}, строка: ${stepHistory[move].row})`: 
         'К началу игры';
         return(
         <li key={move}>
          <button onClick={()=>this.jumpTo(move)}>{desc}</button>
         </li>
        );
      });
  
      let status;
      if (winner) {
        status = 'Выиграл ' + winner;
      } else {
        status = 'Следующий ход: ' + (this.state.xIsNext ? 'X' : 'O');
      }
  
      return (
        <div className="game">
          <div className="game-board">
            <Board 
              squares={current.squares}
              onClick1={(i) => this.handleClick(i)}
            />
          </div>
          <div className="game-info">
            <div>{ status }</div>
            <ol>{moves}</ol>
          </div>
        </div>
      );
    }
  }

export { Game };