import React from 'react';
import Square from './Square';

class Board extends React.Component {
	renderSquare(i) {
		return (
		<Square 
			value={this.props.squares[i]} 
			onClick={() => this.props.onClick(i)}
			/>
		);
    }
    
    renderBoard() {
        let board = [];
        for(let r = 0; r < 3; r++) {
            let squares = [];
            for(let c = 0 + r * 3; c < 3 + r * 3; c++) {
                squares.push(this.renderSquare(c));
            }
            board.push(<div key={r} className="board-row">{squares}</div>);
        }
        console.log(board);
        return board;
    }
    
    render() {
        return this.renderBoard();
    }
}

export default Board;