import { useState } from "react";

function Square({value,onSquareClick}){
  return <button className="square" onClick={onSquareClick} >{value}</button>
}

function Board({squares,flag,onPlay}){

  function handleClick(index){
      if(squares[index] || calculateWinner(squares)) return;
      const nextSquares=squares.slice();
      if(flag) nextSquares[index]='X';
      else nextSquares[index]='O';
      onPlay(nextSquares);
  }
  const winner=calculateWinner(squares);
  let status;
  if(winner) status='Winner: '+winner;
  else status='Next Player: ' + (flag?'X':'O');
  const temp = squares.map((square,i)=>{
    return(
      <Square value={squares[i]}  onSquareClick={ () =>handleClick(i)} />
    )
  })
return(
    <>
    <div className="status">{status}</div>
    <div>{temp}</div>
    <div className="board-row">
      <Square value={squares[0]}  onSquareClick={ () =>handleClick(0)} />
      <Square value={squares[1]}  onSquareClick={() => handleClick(1)} />
      <Square value={squares[2]}  onSquareClick={() => handleClick(2)} />
    </div>
    <div className="board-row">
      <Square value={squares[3]}  onSquareClick={() => handleClick(3)} />
      <Square value={squares[4]}  onSquareClick={() => handleClick(4)} />
      <Square value={squares[5]}  onSquareClick={() => handleClick(5)} />
    </div>
    <div className="board-row">
      <Square value={squares[6]}  onSquareClick={() => handleClick(6)} />
      <Square value={squares[7]}  onSquareClick={() => handleClick(7)} />
      <Square value={squares[8]}  onSquareClick={() => handleClick(8)} />
    </div>
    </>
  )
}

export default function Game(){
  // const [squares,setSquares]= useState(Array(9).fill(null));
  const [history,setHistory]=useState([Array(9).fill(null)]);//intialy history will just have 1 have array with all null which will be it's intial state
  const [currentMove,setCurrentMove]=useState(0);
  const xTurn=currentMove%2===0;
  const currentSquares = history[currentMove]; //acessing the last eneter square
  
  function handlePlay(nextSquares){
    const nextHistory = [...history.slice(0,currentMove+1),nextSquares];
    setHistory(nextHistory); //set history to prev + add nextstep block
    setCurrentMove(nextHistory.length-1);
  }
  function jumpTo(nextMove){
   setCurrentMove(nextMove);
  }
  const moves = history.map((sqauares,move)=>{
    let description;
    if(move>0){
      description='Go to move #'+move;
    }
    else{
      description='Go to game start';
    }
    return(
      <li key={move}>
        <button onClick={()=>jumpTo(move)}>{description}</button>
      </li>
    )
  })

  return(
    <div className="game">
      <div className="game-board">
        <Board flag={xTurn} squares={currentSquares} onPlay={handlePlay}/>
      </div>
      <div className="game-info">
          <ol>{moves}</ol>
      </div>
    </div>
  )
}

function calculateWinner(squares){
  // winner can be either by 3row or 3 col or 2 diagolan
  //check rows
  for(let i=0;i<3;i++){
    if(squares[3*i] && squares[3*i+0]===squares[3*i+1] && squares[3*i+0]===squares[3*i+2] ) return squares[3*i+0]; //row checking
    if(squares[i] && squares[i]===squares[i+3] && squares[i]===squares[i+6]) return squares[i]; //column checking
  }
  if(squares[4]){
    if(squares[0]===squares[4] && squares[4]===squares[8]) return squares[4];
    if(squares[2]===squares[4] && squares[4] === squares[6]) return squares[4];
  }
  return null;
}