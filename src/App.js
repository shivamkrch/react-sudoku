import React, { Component } from "react";
import "./App.css";
import {
  generateSudoku,
  checkSolution,
  shareURL,
  checkAnswer
} from "./lib/sudoku";
import produce from "immer";
import SudokuBoard from "./components/SudokuBoard";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = produce({}, () => ({
      sudoku: generateSudoku()
    }));
  }

  handleChange = e => {
    this.setState(
      produce(state => {
        state.sudoku.rows[e.row].cols[e.col].value = e.value;
        if (!state.sudoku.solvedTime) {
          const solved = checkSolution(state.sudoku);

          if (solved) {
            state.sudoku.solvedTime = new Date();
            state.sudoku.shareURL = shareURL(state.sudoku);
          }
          const isCorrect = checkAnswer(
            state.sudoku.rows[e.row].cols[e.col].value,
            state.sudoku.rows[e.row].cols[e.col].rawindex,
            state.sudoku
          );
          if (isCorrect) {
            state.sudoku.rows[e.row].cols[e.col].answered = "yes";
          } else state.sudoku.rows[e.row].cols[e.col].answered = null;
        }
      })
    );
  };

  solveSudoku = e => {
    this.setState(
      produce(state => {
        state.sudoku.rows.forEach(row =>
          row.cols.forEach(col => {
            if (!col.readonly) {
              col.value = state.sudoku.solution[col.row * 9 + col.col];
            }
          })
        );
      })
    );
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>React Sudoku</h1>
        </header>
        <SudokuBoard sudoku={this.state.sudoku} onChange={this.handleChange} />

        <button className="btn btn-yellow" onClick={this.solveSudoku}>
          Solve it magically!
        </button>
      </div>
    );
  }
}

export default App;
