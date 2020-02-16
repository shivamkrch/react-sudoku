import React, { Component } from "react";

export default class SudokuField extends Component {
  handleChange = e => {
    const value = "" ? null : parseInt(e.target.value);

    this.props.onChange({ ...this.props.field, value }, e);
  };
  render() {
    const { field } = this.props;
    return (
      <input
        className="field"
        value={field.value || ""}
        answered={field.answered}
        readOnly={field.readonly}
        onChange={this.handleChange}
      />
    );
  }
}
