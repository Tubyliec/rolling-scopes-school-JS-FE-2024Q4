import type { ElementOptions } from '../../models/interfaces/element-options.interface';
import type { Car } from '../../models/types/car.type';
import type { CarsList } from '../../models/types/cars-list.type';
import type { IsHTMLElement } from '../../models/types/is-html-element.type';
import { Api } from '../../services/api';
import { ButtonsCreator } from '../../utils/view-creators/buttons-creator';
import { HTMLElementCreator } from '../../utils/view-creators/html-element-creator';
import { ViewCreator } from '../../utils/view-creators/view-creator';
import { CarWay } from '../car-way/car-way';
import './garage-container.scss';

export class GarageContainer extends HTMLElementCreator {
  public pageNumber: IsHTMLElement;
  public carsContainer: IsHTMLElement;
  public paginationButtons: IsHTMLElement;
  public prevButton: IsHTMLElement;
  public nextButton: IsHTMLElement;

  public carsPageNumber = 1;
  public items: Car[];
  public count: string | null;

  constructor(options: ElementOptions) {
    super(options);
    this.items = [];
    this.count = '';
    this.addPageNumber();
    this.addCarsContainer();
    this.addPaginationButtons();
    this.addCar();
  }

  public addPageNumber(): void {
    this.pageNumber = new ViewCreator({
      tag: 'h2',
      css: ['page-number'],
      text: 'Page#',
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
      css: ['pag-button'],
      text: 'Previous',
    }).element;
    this.nextButton = new ButtonsCreator({
      tag: 'button',
      css: ['pag-button'],
      text: 'Next',
    }).element;
    if (this.paginationButtons) this.addInnerElement(this.paginationButtons);
    if (this.prevButton) this.paginationButtons?.append(this.prevButton);
    if (this.nextButton) this.paginationButtons?.append(this.nextButton);
  }

  public async updateGarage(): Promise<void> {
    const { items, count }: CarsList = await Api.getCars(this.carsPageNumber);
    console.log(items, count);
    this.items = items;
    this.count = count;
  }

  public addCar(): void {
    void this.updateGarage().then(() => {
      for (const item of this.items) {
        const car = new CarWay(
          { tag: 'div', css: ['car-way'] },
          item,
        ).getElement();
        this.carsContainer?.append(car);
      }
    });
  }
}
