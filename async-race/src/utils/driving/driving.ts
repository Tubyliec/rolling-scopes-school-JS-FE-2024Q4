import type { CarWay } from '../../components/car-way/car-way';
import { animationState } from '../../data/animation-state';
import type { DrivingResult } from '../../models/interfaces/driving-result.interface';
import type { DrivingStatus } from '../../models/types/driving-status.type';
import type { Engine } from '../../models/types/engine.type';
import { Api } from '../../services/api';
import { Animation } from '../animation/animation';

export class Driving {
  public static async startDriving(
    id: number,
    element: CarWay,
  ): Promise<DrivingStatus> {
    const car = element.car;
    const flag = element.flag;
    const drivingResult: DrivingResult = { success: true, id: 0, time: 0 };
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
      drivingResult.success = success;
      drivingResult.id = id;
      drivingResult.time = time;
    }

    return drivingResult;
  }
}
