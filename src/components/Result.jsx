import React, { Component } from "react";

export default class Result extends Component {
  render() {
    const { sudoku } = this.props;
    const elapsed = Math.floor(
      (sudoku.solvedTime.getTime() - sudoku.startTime.getTime()) / 1000
    );
    return <h2 className="solved">Sudoku solved in {elapsed} seconds.</h2>;
  }
}
