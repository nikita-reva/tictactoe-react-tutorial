import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Board from './Board.js';

class Game extends React.Component {
	constructor(props) {
		super(props); 
		this.state = {
			history: [{
				squares: Array(9).fill(null),
				lastClicked: null,
			}],
			stepNumber: 0,
			xIsNext: true,
			reversed: false,
			winLines: Array(3).fill(null),
		}
	}

	handleClick(i) {
		const history = this.state.history.slice(0, this.state.stepNumber + 1);
		const current = history[history.length - 1];
		const squares = current.squares.slice();
		if(calculateWinner(squares) || squares[i]) {
			return;
		}
		squares[i] = this.state.xIsNext ? 'X' : 'O';
		this.setState({
			history: history.concat([
				{
					squares: squares,
					lastClicked: i,
				}
			]),
			
			stepNumber: history.length,
			xIsNext: !this.state.xIsNext,
			});
	}

	jumpTo(stepNr) {
		this.setState({
			stepNumber: stepNr,
			xIsNext: (stepNr % 2) === 0,
		});
	}

	sortMoves() {
		if(!this.state.reversed) {
			this.setState({
				reversed: true,
			})
		} else {
			this.setState({
				reversed: false,
			})
		}
	}
	
	render() {
		const history = this.state.history;
		const current = history[this.state.stepNumber];
		const winner = calculateWinner(current.squares);
		const winLines = getWinLines(current.squares);

		let moves = history.map((step, move) => {
			const position = getPosition(step.lastClicked)
			const stepNumber = this.state.stepNumber;
			const buttonClass = stepNumber === move ? "button-selected" : ""; 

			const desc = move ? 
				"Go to move #" + move + " (" + (move % 2 ? 'X' : 'O') + " placed at " + "col " + position[0] + ", row " + position[1] + ")":
				"Go to game start";
			return (
				<li key={move}>
					<button className={buttonClass} onClick={() => this.jumpTo(move)}>{desc}</button>
				</li>
			);
		});
		
		const buttonSort = <button className="button-sort" onClick={() => {this.sortMoves()}}>Sort moves</button>;
		const reversed = this.state.reversed;
		const order = reversed ? 'reversed' : '';

		moves = reversed ? moves.reverse() : moves;


		let status;

		if(winner) {
		  	status = 'Winner: ' + winner;
		} else {
			  for(let i = 0; i < 9; i++) {
				if(current.squares[i] === null) {
					status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
					break;
				} else {
					status = "It's a draw!";
				}
			}
		}
		
		return (
			<div className="game">
				<div className="game-board">
					<Board 
						squares={current.squares}
						onClick={(i) => this.handleClick(i)}
						winLines={winLines}
					/>
				</div>
				<div className="game-info">
					<div>{status}</div>
					<div>{buttonSort}</div>
					<ol reversed={order}>{moves}</ol>
				</div>
			</div>
		);
	}
}

ReactDOM.render(<Game />, document.getElementById('root'));
// ========================================

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

function getWinLines(squares) {
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
			return lines[i]
	  	}
	}
	return null;
}

function getPosition(index) {
	const position = Array(2);
	position[0] = (index % 3) + 1;
	position[1] = Math.floor((index + 3) / 3);

	return position;
}