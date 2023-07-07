/* tslint:disable */
/* eslint-disable */
/**
*/
export enum Cell {
  Alive = 1,
  Dead = 0,
}
/**
*/
export class Universe {
  free(): void;
/**
*/
  tick(): void;
/**
* @returns {number}
*/
  width(): number;
/**
* @param {number} width
*/
  set_width(width: number): void;
/**
* @param {number} height
*/
  set_height(height: number): void;
/**
* @returns {number}
*/
  height(): number;
/**
* @returns {number}
*/
  cells(): number;
/**
*/
  reset_random(): void;
/**
*/
  reset_pattern(): void;
/**
*/
  render(): void;
/**
* @returns {Universe}
*/
  static new(): Universe;
}
