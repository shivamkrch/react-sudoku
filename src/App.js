import React, { Component } from "react";
import "./App.css";
import generator from "sudoku";
import SudokuBoard from "./components/SudokuBoard";

/*
  Generate a sudoku with the format

  {rows: [{cols: [{row: 0, col: 0, value: 1, readonly: true}, ...]}, ...]}
*/
function genearteSudoku() {
  const raw = generator.makepuzzle();
  const result = { rows: [] };

  for (let i = 0; i < 9; i++) {
    const row = { cols: [], index: i };
    for (let j = 0; j < 9; j++) {
      const value = raw[9 * i + j];
      const col = {
        row: i,
        col: j,
        value,
        readonly: value !== null
      };
      row.cols.push(col);
    }
    result.rows.push(row);
  }

  return result;
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sudoku: genearteSudoku()
    };
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>React Sudoku</h1>
        </header>
        <SudokuBoard sudoku={this.state.sudoku} />
      </div>
    );
  }
}

export default App;
