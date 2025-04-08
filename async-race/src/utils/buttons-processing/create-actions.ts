import { domElements } from '../../data/dom-elements';
import type { CreatedCar } from '../../models/types/created-car.type';
import { Api } from '../../services/api';

export class createCarActions {
  public static createCar(carOptions: CreatedCar): void {
    if (carOptions.name !== '' && carOptions.color !== '') {
      void Api.getCreateCar(carOptions).then(() => {
        domElements.garageView?.renderView();
        carOptions.name = '';
        carOptions.color = '#000000';
      });
    }
  }

  public static updateCar(id: number, carOptions: CreatedCar): void {
    void Api.updateCar(id, carOptions);
    domElements.garageView?.renderView();
  }
}
