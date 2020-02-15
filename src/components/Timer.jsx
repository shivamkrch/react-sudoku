import React, { Component } from "react";

export default class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      elapsed: 0
    };
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      this.setState({
        elapsed: Math.floor(
          (new Date().getTime() - this.props.start.getTime()) / 1000
        )
      });
    });
  }

  componentWillUnmount() {
    delete this.interval;
  }

  render() {
    const { elapsed } = this.state;
    return (
      <div>
        <h2>
          Time: {parseNumber(elapsed / 3600)} :{" "}
          {parseNumber((elapsed % 3600) / 60)} : {parseNumber(elapsed % 60)}{" "}
        </h2>
      </div>
    );
  }
}

function parseNumber(n) {
  n = parseInt(n);
  return n < 10 ? `0${n}` : n;
}
