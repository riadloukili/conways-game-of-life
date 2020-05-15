import React, { Component } from "react";

import {gridContainer, grid, row, cell, alive} from "./style.module.scss";
import classNames from "classnames";

export default class Grid extends Component {

  render() {
    let {life, rows, columns} = this.props;
    return (
      <div className={gridContainer}>
        <div className={grid} style={{
            width: 16 * columns + 2,
            height: 16 * rows + 2,
          }}>
          {life.currentField.grid.map((r, i) => (
            <div key={`row-${i}`} className={row} style={{width: 16 * columns}}>
              {r.map((el, i) => <Node isAlive={el} key={i}/>)}
            </div>
          ))}
        </div>
      </div>
    );
  }
}


class Node extends Component {
  render() {
    const {isAlive} = this.props;
    return (
      <div className={classNames(cell, {[alive]: isAlive})} />
    );
  }
}
