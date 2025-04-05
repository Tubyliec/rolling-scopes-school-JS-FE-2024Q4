import type { CarWay } from '../../components/car-way/car-way';
import { animationState } from '../../data/animation-state';
import type { Engine } from '../../models/types/engine.type';
import type { Winner } from '../../models/types/winner.type';
import { Api } from '../../services/api';
import { Animation } from '../animation/animation';

export class Driving {
  public static async startDriving(id: number, element: CarWay): Promise<void> {
    const car = element.car;
    const flag = element.flag;
    const drivingResult: Winner = { id: 0, time: 0, wins: 0 };
    if (element.startButton instanceof HTMLButtonElement)
      element.startButton.disabled = true;
    if (car && flag) {
      const engine: Engine = await Api.getStartEngine(id);
      const { velocity, distance } = engine;
      const time = Math.round(distance / velocity);
      const distanceBetweenElements = Animation.getDistance(car, flag) + 80;
      animationState[id] = Animation.animation(
        car,
        distanceBetweenElements,
        time,
      );
      const driveState = await Api.getDriveStatus(id);
      const { success } = driveState;
      if (!success) globalThis.cancelAnimationFrame(animationState[id].id);
      if (success) {
        if (element.startButton instanceof HTMLButtonElement)
          element.startButton.disabled = false;
        drivingResult.wins = 1;
        drivingResult.id = id;
        drivingResult.time = time;
        void Api.sendWinner(drivingResult);
      }
    }
  }
}
