import type { CarControlPanel } from '../../components/car-control-panel/car-control-panel';
import { domElements } from '../../data/dom-elements';
import { raceCars } from '../../data/race-state';
import { Api } from '../../services/api';
import { RandomCarGenerator } from '../random-cars/random-cars';

export class RaceControlActions {
  public static race(controlElement: CarControlPanel): void {
    if (controlElement.raceButton instanceof HTMLButtonElement)
      controlElement.raceButton.disabled = true;
    if (controlElement.resetButton instanceof HTMLButtonElement)
      controlElement.resetButton.disabled = false;
    for (const car of raceCars) {
      car.startButton?.click();
    }
  }
  public static reset(controlElement: CarControlPanel): void {
    if (controlElement.raceButton instanceof HTMLButtonElement)
      controlElement.raceButton.disabled = false;
    if (controlElement.resetButton instanceof HTMLButtonElement)
      controlElement.resetButton.disabled = true;
    for (const car of raceCars) {
      car.stopButton?.click();
    }
  }

  public static async generateCars(
    controlElement: CarControlPanel,
  ): Promise<void> {
    if (controlElement.generateCarsButton instanceof HTMLButtonElement)
      controlElement.generateCarsButton.disabled = true;

    const generatedCars = RandomCarGenerator.generateRandomCars();
    await Promise.all(generatedCars.map(async (car) => Api.getCreateCar(car)));
    domElements.garageView?.renderView();

    if (controlElement.generateCarsButton instanceof HTMLButtonElement)
      controlElement.generateCarsButton.disabled = false;
  }
}
