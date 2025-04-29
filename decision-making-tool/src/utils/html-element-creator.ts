import type { CreateOptions } from '../models/interfaces/create-options.interface';
import type { EventFunction } from '../models/types/event-callback.type';
import type { IsHtmlElement } from '../models/types/is-html-element.type';

export class HtmlElementCreator {
  public element: IsHtmlElement | undefined;
  public clickHandler?: (event: Event) => void;

  constructor(options: CreateOptions) {
    this.createHtmlElement(options);
  }

  public getHtmlElement(): IsHtmlElement {
    return this.element;
  }

  public createHtmlElement(options: CreateOptions): void {
    this.element = document.createElement(options.tag);
    if (options.classes) this.setCss(options.classes);
    if (options.text) this.setText(options.text);
    if (options.callback) {
      this.setCallback(options.callback);
    }
  }

  public appendElement(elements: IsHtmlElement[]): void {
    const htmlFragment = document.createDocumentFragment();
    for (const htmlElement of elements) {
      if (htmlElement) htmlFragment.append(htmlElement);
    }
    if (this.element) this.element.append(htmlFragment);
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

  public setCallback(callback: EventFunction): void {
    if (typeof callback === 'function' && this.element) {
      this.clickHandler = (event: Event): void => {
        void callback(event);
      };
      this.element.addEventListener('click', this.clickHandler);
    }
  }

  public cleanCallback(): void {
    if (this.element && this.clickHandler) {
      this.element.removeEventListener('click', this.clickHandler);
      this.clickHandler = undefined;
    }
  }
}
