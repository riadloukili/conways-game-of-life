import React, { Component } from "react";
import classNames from "classnames";

import {
  controls,
  closed,
  hideShowContainer,
  button,
  seedButton,
  cellsButton,
  simulateButton,
  stopButton,
  resetButton,
  icon,
  inputsContainer,
  inputGrp,
  gridSizeContainer,
  gridSize,
  twoButtonsContainer,
  disabled,
} from './style.module.scss';

export default class Controls extends Component {

  render() {
    const controlsClassNames = classNames(
      controls, 
      {
        [closed]: !this.props.open,
      }
    );
    return (
      <div className={controlsClassNames}>
        <div>
          <div className={twoButtonsContainer}>
            <button
              className={classNames(button, seedButton)}
              type="button"
              title="Seed Randomly"
              onClick={this.props.onSeed}
              disabled={this.props.simulating || this.props.stopping}
            >
              <ion-icon class={icon} name="infinite-outline"></ion-icon> Seed
            </button>
            {/*
            <button
              className={classNames(button, cellsButton)}
              type="button"
              title="Add cells manually"
              disabled={this.props.simulating || this.props.stopping}
            >
              <ion-icon class={icon} name="flower-outline"></ion-icon> Cells
            </button> */}
          </div>
          <div className={gridSizeContainer}>
            <span className={gridSize}>Grid size</span>
            <div className={inputsContainer}>
              <div className={classNames(inputGrp, {[disabled]: this.props.simulating || this.props.stopping})}>
                <span>
                  <ion-icon class={icon} name="ellipsis-vertical-outline"></ion-icon>
                </span>
                <input
                  type="number"
                  step="1"
                  min="1"
                  max="32"
                  pattern="[0-9]+"
                  name="rows_count"
                  value={this.props.rows}
                  onChange={e => this.props.onRowsUpdate(e.target.value)}
                  disabled={this.props.simulating || this.props.stopping}
                />
              </div>
              <div className={classNames(inputGrp, {[disabled]: this.props.simulating || this.props.stopping})}>
                <span>
                  <ion-icon class={icon} name="ellipsis-horizontal-outline"></ion-icon>
                </span>
                <input
                  type="number"
                  step="1"
                  min="1"
                  max="32"
                  pattern="[0-9]+"
                  name="columns_count"
                  id="columns_count"
                  value={this.props.columns}
                  onChange={e => this.props.onColumnsUpdate(e.target.value)}
                  disabled={this.props.simulating || this.props.stopping}
                />
              </div>
            </div>
          </div>
          <div className={twoButtonsContainer}>
            <button
              className={classNames(button, simulateButton)}
              type="button"
              title="Simulate"
              onClick={this.props.onSimulate}
              disabled={this.props.simulating || this.props.stopping}
            >
              <ion-icon class={icon} name="planet-outline"></ion-icon> Simulate
            </button>
            <button
              className={classNames(button, stopButton)}
              type="button"
              title="Stop the simulation"
              onClick={this.props.onStop}
              disabled={this.props.stopping}
            >
              <ion-icon class={icon} name="stop-outline"></ion-icon> Stop
            </button>
          </div>
          <button
            className={classNames(button, resetButton)}
            type="button"
            title="Reset"
            onClick={this.props.onReset}
            disabled={this.props.simulating || this.props.stopping}
          >
            <ion-icon class={icon} name="refresh-outline"></ion-icon> Reset
          </button>
        </div>
        <div className={hideShowContainer}>
          <button
            className={button}
            type="button"
            onClick={()=>this.props.setOpen(!this.props.open)}
          >
            <ion-icon class={icon} name="arrow-forward-outline"></ion-icon>
          </button>
        </div>
      </div>
    );
  }
}
