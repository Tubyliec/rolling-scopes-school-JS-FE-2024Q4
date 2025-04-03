import type { ElementOptions } from '../../../models/interfaces/element-options.interface';
import type { IsHTMLElement } from '../../../models/types/is-html-element.type';
import { ButtonsCreator } from '../../../utils/view-creators/buttons-creator';
import { HTMLElementCreator } from '../../../utils/view-creators/html-element-creator';
import { ViewCreator } from '../../../utils/view-creators/view-creator';
import './garage-container.scss';

export class GarageContainer extends HTMLElementCreator {
  public pageNumber: IsHTMLElement;
  public carsContainer: IsHTMLElement;
  public paginationButtons: IsHTMLElement;
  public prevButton: IsHTMLElement;
  public nextButton: IsHTMLElement;
  constructor(options: ElementOptions) {
    super(options);
    this.addPageNumber();
    this.addCarsContainer();
    this.addPaginationButtons();
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
}
