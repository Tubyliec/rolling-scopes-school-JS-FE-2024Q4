import { domElements } from '../../data/dom-elements';
import { Api } from '../../services/api';

export class ControlActions {
  public static removeCar(element: HTMLElement): void {
    element.remove();
    void Api.getDeleteCarById(Number(element.id)).then(() =>
      domElements.garageView?.renderView(),
    );
  }
}
