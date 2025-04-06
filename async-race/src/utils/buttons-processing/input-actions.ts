import type { CreatedCar } from '../../models/types/created-car.type';
import type { InputCreator } from '../view-creators/input-creator';

export class InputActions {
  public static sendInput(
    element: InputCreator,
    dataElement: CreatedCar,
  ): void {
    if (
      element.element instanceof HTMLInputElement &&
      element.element.type === 'text'
    ) {
      dataElement.name = element.element.value;
    }
    if (
      element.element instanceof HTMLInputElement &&
      element.element.type === 'color'
    ) {
      dataElement.color = element.element.value;
    }
  }
}
