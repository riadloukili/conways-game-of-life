import React, { Component } from "react";

import Controls from "./components/controls";
import Grid from "./components/grid";

import "./App.scss";

export default class App extends Component {
  
  constructor() {
    super();
    this.state = {
      rows: 10,
      columns: 10,
      open: true,
      life: null,
      stop: false,
      simulating: false,
    };
    this.state.life = new Life(this.state.rows, this.state.columns);
  }

  componentDidUpdate(_, prevState) {
    if(prevState.rows !== this.state.rows || prevState.columns !== this.state.columns)
      this.setState({life: new Life(this.state.rows, this.state.columns)});
  }

  async simulate() {
    this.setState({simulating: true})
    while(!this.state.stop) {
      await timeout(100);
      this.state.life.nextState();
      this.setState({})
    }
    this.setState({stop: false, simulating: false})
  }
  stop() {
    this.setState({stop: true})
  }
  reset() {
    this.setState({life: new Life(this.state.rows, this.state.columns)});
  }

  render() {
    // console.log(this.state.life)
    return (
      <>
        <Controls
          rows={this.state.rows}
          columns={this.state.columns}
          onRowsUpdate={(value) => this.setState({rows: Number(value)})}
          onColumnsUpdate={(value) => this.setState({columns: Number(value)})}
          open={this.state.open}
          setOpen={open => this.setState({open})}
          simulating={this.state.simulating}
          stopping={this.state.stop}
          onSeed={() => {
            this.state.life.seed()
            this.setState({})
          }}
          onSimulate={() => this.simulate()}
          onStop={() => this.stop()}
          onReset={() => this.reset()}
        />
        <Grid life={this.state.life} rows={this.state.rows} columns={this.state.columns} />
        {/* <div id="notifications"></div> */}
      </>
    );
  }
}


class Life {
  currentField;
  nextField;
  rows;
  columns;
  constructor(rows, columns) {
    this.rows = Number(rows);
    this.columns = Number(columns);
    this.currentField = new Field(rows, columns);
    this.nextField = new Field(rows, columns);
  }
  seed(randIntGenerator = getRandInt) {
    const grid = new Array(this.rows);
    for(let i = 0; i < this.rows; ++i) {
      grid[i] = new Array(this.columns);
      for(let j = 0; j < this.columns; ++j) {
        grid[i][j] = false;
      }
    }
    this.currentField.grid = grid;
    for(let i = 0; i < this.rows * this.columns / 4; ++i) {
      let x = randIntGenerator(this.rows), y = randIntGenerator(this.columns);
      // console.log({x, y})
      this.currentField.set(x, y, true);
    }
  }
  nextState() {
    for(let r = 0; r < this.rows; ++r) {
      for(let c = 0; c < this.columns; ++c) {
        this.nextField.set(r, c, this.currentField.nextState(r, c));
      }
    }
    [this.currentField, this.nextField] = [this.nextField, this.currentField]
  }
}
class Field {
  rows;
  columns;
  grid;
  constructor(rows, columns) {
    this.rows = rows;
    this.columns = columns;
    const grid = new Array(rows);
    for(let i = 0; i < rows; ++i) {
      grid[i] = new Array(columns);
      for(let j = 0; j < columns; ++j) {
        grid[i][j] = false;
      }
    }
    this.grid = grid;
  }
  set(r, c, isAlive) {
    this.grid[r][c] = isAlive;
  }
  isAlive(r, c) {
    r = (r + this.rows) % this.rows;
    c = (c + this.columns) % this.columns;
    return this.grid[r][c];
  }
  nextState(r, c) {
    let aliveCount = 0;
    for(let dr = -1; dr <= 1; ++dr) {
      for(let dc = -1; dc <= 1; ++dc) {
        if(dr === 0 && dc === 0) continue;
        else if(this.isAlive(r + dr, c + dc)) ++aliveCount;
      }
    }
    return aliveCount === 3 || (aliveCount === 2 && this.isAlive(r, c));
  }
}

const getRandInt = (limit) => {
  return Math.round(Math.random() * (limit - 1));
}
const timeout = ms => {
  return new Promise(resolve => setTimeout(resolve, ms));
}
