import React from 'react';
import Square from './Square';

class Board extends React.Component {
	renderSquare(i) {
        const winLines = this.props.winLines;
        let color = {backgroundColor: "white"};
        if(winLines !== null && winLines.includes(i)) {
            color = {backgroundColor: "green"}
        }
        
        return (
		<Square 
			value={this.props.squares[i]}
			onClick={() => this.props.onClick(i)}
            color={color}
			/>
		);
    }
    
    renderBoard() {
        let board = [];
        for(let r = 0; r < 3; r++) {
            let squares = [];
            for(let c = 0; c < 3; c++) {
                squares.push(this.renderSquare(c+3*r));
            }
            board.push(<div key={r} className="board-row">{squares}</div>);
        }
        console.log(this.props.winLines);
        return board;
    }
    
    render() {
        return this.renderBoard();
    }
}

export default Board;