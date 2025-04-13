import type { Car } from '../types/car.type';
import type { Winner } from '../types/winner.type';

export interface WinnerRow {
  winner: Winner;
  winnerData: Car;
  WinnerNumber: number;
}
