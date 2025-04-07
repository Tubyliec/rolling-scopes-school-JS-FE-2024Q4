import type { CarControlPanel } from '../../components/car-control-panel/car-control-panel';
import { domElements } from '../../data/dom-elements';
import { raceCars, succesArray } from '../../data/race-state';
import { Api } from '../../services/api';
import { Driving } from '../driving/driving';
import { RandomCarGenerator } from '../random-cars/random-cars';

export class RaceControlActions {
  public static async race(controlElement: CarControlPanel): Promise<void> {
    if (controlElement.raceButton instanceof HTMLButtonElement)
      controlElement.raceButton.disabled = true;
    if (controlElement.resetButton instanceof HTMLButtonElement)
      controlElement.resetButton.disabled = false;

    await Promise.all(
      raceCars.map(async (car) => Driving.startDriving(car.id, car)),
    )
      .then(() => {
        succesArray.sort((a, b) => a.time - b.time);
        console.log(succesArray);
        const winner = succesArray[0];
        console.log(winner);
        void Api.updateWinner(winner.id, winner);
        return winner;
      })
      .then(async (winner) => {
        const winnerCar = await Api.getCar(String(winner.id));
        console.log(winnerCar.name);
        domElements.raceContainer?.element?.insertAdjacentText(
          'beforeend',
          `Winner: ${winnerCar.name} time: ${winner.time}`,
        );
        succesArray.length = 0;
      });
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
