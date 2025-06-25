import { domElements } from '../../data/dom-elements';

export class PagginationActions {
  public static nextButton(): void {
    const garage = domElements.garageContainer;
    const previousButton = domElements.prevButton?.getElement();
    const nextButton = domElements.nextButton?.getElement();
    if (garage) {
      garage.carsPageNumber += 1;
      garage.addCar();
      if (garage.carsPageNumber * 7 >= Number(garage.count))
        nextButton?.setAttribute('disabled', 'true');
      if (previousButton?.hasAttribute('disabled'))
        previousButton?.removeAttribute('disabled');
    }
  }

  public static prevButton(): void {
    const garage = domElements.garageContainer;
    const previousButton = domElements.prevButton?.getElement();
    const nextButton = domElements.nextButton?.getElement();
    if (garage) {
      garage.carsPageNumber -= 1;
      garage.addCar();
      if (garage.carsPageNumber <= 1)
        previousButton?.setAttribute('disabled', 'true');
      if (nextButton?.hasAttribute('disabled'))
        nextButton?.removeAttribute('disabled');
    }
  }
}
