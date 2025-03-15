import type { CreateOptions } from '../models/interfaces/create-options.interface';
import type { IsHtmlElement } from '../models/types/is-html-element.type';

export class HtmlElementCreator {
  public element: IsHtmlElement;

  constructor(options: CreateOptions) {
    this.element = undefined;
    this.createHtmlElement(options);
  }

  public getHtmlElement(): IsHtmlElement {
    return this.element;
  }

  public createHtmlElement(options: CreateOptions): void {
    this.element = document.createElement(options.tag);
    this.setCss(options.classes);
    this.setText(options.text);
  }

  public appendElement(elements: IsHtmlElement[]): void {
    for (const htmlElement of elements) {
      if (this.element && htmlElement) {
        this.element.append(htmlElement);
      }
    }
  }

  public setCss(classes: string[]): void {
    if (classes) {
      for (const className of classes) {
        if (this.element) {
          this.element.classList.add(className);
        }
      }
    }
  }

  public setText(text: string = ''): void {
    if (this.element) {
      this.element.textContent = text;
    }
  }
}
