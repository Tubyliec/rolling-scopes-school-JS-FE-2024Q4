import type { CarWay } from '../../components/car-way/car-way';
import { updatedCar, updatedId } from '../../data/creation-car-data';
import { domElements } from '../../data/dom-elements';
import { Api } from '../../services/api';

export class ControlActions {
  public static removeCar(element: HTMLElement): void {
    element.remove();
    void Api.getDeleteCarById(Number(element.id)).then(() =>
      domElements.garageView?.renderView(),
    );
  }

  public static selectCar(element: CarWay): void {
    const nameInput = domElements.updateCarName?.element;
    const colorInput = domElements.updateCarColor?.element;
    updatedId.id = element.id;

    if (nameInput instanceof HTMLInputElement && nameInput.type === 'text') {
      nameInput.value = element.name;
      updatedCar.name = element.name;
    }
    if (colorInput instanceof HTMLInputElement && colorInput.type === 'color') {
      colorInput.value = element.color;
      updatedCar.color = element.color;
    }
  }
}
