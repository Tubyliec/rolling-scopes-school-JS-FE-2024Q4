import { CreateOptions } from '../models/interfaces/create-options.interface';
import { IsHtmlElement } from '../models/interfaces/types/is-html-element.type';

export class HtmlElementCreator {
  element: IsHtmlElement;

  constructor(options: CreateOptions) {
    this.element = null;
    this.createHtmlElement(options);
  }

  getHtmlElement(): IsHtmlElement {
    return this.element;
  }

  createHtmlElement(options: CreateOptions): void {
    this.element = document.createElement(options.tag);
    this.setCss(options.classes);
  }

  setCss(classes: string[]): void {
    classes.forEach((className: string): void => {
      if (this.element) {
        this.element.classList.add(className);
      }
    });
  }
}
