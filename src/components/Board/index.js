import React from 'react';
// import './index.css';

console.log('Export from Board');

function Square (props) {
  // console.log('Square ', props);
  return (
    <button className="square" onClick={props.onClick2}> 
      {props.value}
    </button>
  );
}

function renderSquare(props, i) {
  // console.log('renderSquare ', props.squares[i] + ' i: ' + i);
  return (
    <Square 
      key={`square_` + i}
      value={props.squares[i]}
      onClick2={() => props.onClick1(i)} 
    />
  );
}

export function Board (props) {
  const rows = 3;
  const cells = 3;
  console.log('Board ', props);
  return (
      <div>
          {[...Array(rows).keys()].map(row => (
              <div className="board-row" key={row}>
                  {[...Array(cells).keys()].map(cell => renderSquare(props, row * cells + cell))}
              </div>
          ))}
      </div>
  )
}
