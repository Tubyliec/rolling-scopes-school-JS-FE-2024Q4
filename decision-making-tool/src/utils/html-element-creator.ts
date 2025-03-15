import { CreateOptions } from '../models/interfaces/create-options.interface';
import { IsHtmlElement } from '../models/types/is-html-element.type';

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
    this.setText(options.text);
  }

  appendElement(htmlElement: IsHtmlElement): void {
    if (this.element && htmlElement) {
      this.element.append(htmlElement);
    }
  }

  setCss(classes: string[]): void {
    if (classes) {
    }
    classes.forEach((className: string): void => {
      if (this.element) {
        this.element.classList.add(className);
      }
    });
  }

  setText(text: string = '') {
    if (this.element) {
      this.element.textContent = text;
    }
  }
}
