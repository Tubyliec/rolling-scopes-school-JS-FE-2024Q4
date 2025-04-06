import { domElements } from '../../data/dom-elements';
import { raceCars } from '../../data/race-state';
import type { ElementOptions } from '../../models/interfaces/element-options.interface';
import type { Car } from '../../models/types/car.type';
import type { CarsList } from '../../models/types/cars-list.type';
import type { IsHTMLElement } from '../../models/types/is-html-element.type';
import { Api } from '../../services/api';
import { ViewUtilities } from '../../utils/accessory-utils/view-utilities';
import { PagginationActions } from '../../utils/buttons-processing/paggination-actions';
import { ButtonsCreator } from '../../utils/view-creators/buttons-creator';
import { HTMLElementCreator } from '../../utils/view-creators/html-element-creator';
import { ViewCreator } from '../../utils/view-creators/view-creator';
import { CarWay } from '../car-way/car-way';
import './garage-container.scss';

export class GarageContainer extends HTMLElementCreator {
  public pageNumber: IsHTMLElement;
  public carsContainer: IsHTMLElement;
  public paginationButtons: IsHTMLElement;
  public prevButton: ButtonsCreator | undefined;
  public nextButton: ButtonsCreator | undefined;

  public carsPageNumber = 1;
  public items: Car[];
  public count: string | null;

  constructor(options: ElementOptions) {
    super(options);
    this.items = [];
    this.count = '';
    this.nextButton = undefined;
    this.addPageNumber();
    this.addCarsContainer();
    this.addPaginationButtons();
    this.addCar();
  }

  public addPageNumber(): void {
    this.pageNumber = new ViewCreator({
      tag: 'h2',
      css: ['page-number'],
      text: `Page #${this.carsPageNumber}`,
    }).element;
    if (this.pageNumber) this.addInnerElement(this.pageNumber);
  }

  public addCarsContainer(): void {
    this.carsContainer = new ViewCreator({
      tag: 'div',
      css: ['cars-container'],
    }).element;
    if (this.carsContainer) this.addInnerElement(this.carsContainer);
  }

  public addPaginationButtons(): void {
    this.paginationButtons = new ViewCreator({
      tag: 'div',
      css: ['pagination-buttons'],
    }).element;
    this.prevButton = new ButtonsCreator({
      tag: 'button',
      css: ['button', 'pag-button'],
      text: 'Previous',
      callback: (): void => {
        PagginationActions.prevButton();
      },
    });
    domElements.prevButton = this.prevButton;
    this.nextButton = new ButtonsCreator({
      tag: 'button',
      css: ['button', 'pag-button'],
      text: 'Next',
      callback: (): void => {
        PagginationActions.NextButton();
      },
    });
    domElements.nextButton = this.nextButton;
    if (this.paginationButtons) this.addInnerElement(this.paginationButtons);
    if (this.prevButton)
      this.paginationButtons?.append(this.prevButton.getElement());
    if (this.nextButton)
      this.paginationButtons?.append(this.nextButton.getElement());
  }

  public async updateGarage(): Promise<void> {
    const { items, count }: CarsList = await Api.getCars(this.carsPageNumber);
    this.items = items;
    this.count = count;
  }

  public addCar(): void {
    ViewUtilities.clearElement(this.carsContainer);
    if (this.carsPageNumber <= 1)
      domElements.prevButton?.getElement()?.setAttribute('disabled', 'true');
    if (this.carsPageNumber <= 7)
      domElements.nextButton?.getElement()?.setAttribute('disabled', 'true');
    if (this.pageNumber) {
      this.pageNumber.textContent = `Page #${this.carsPageNumber}`;
    }
    void this.updateGarage().then(() => {
      raceCars.length = 0;
      for (const item of this.items) {
        const car = new CarWay(
          { tag: 'div', css: ['car-way'], id: item.id },
          item,
        );
        this.carsContainer?.append(car.getElement());
        raceCars.push(car);
      }
    });
  }
}
