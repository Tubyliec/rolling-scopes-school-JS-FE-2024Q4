import { raceCars } from '../../data/race-state';

export class RaceControlActions {
  public static Race(): void {
    for (const car of raceCars) {
      car.startButton?.click();
    }
  }
  public static Reset(): void {
    for (const car of raceCars) {
      car.stopButton?.click();
    }
  }
}
