import type { CreateOptions } from '../models/interfaces/create-options.interface';
import type { EventFunction } from '../models/types/event-callback.type';
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
    if (options.callback) {
      this.setCallback(options.callback);
    }
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

  public setCallback(callback: EventFunction): void {
    if (typeof callback === 'function' && this.element) {
      this.element.addEventListener('click', (event) => {
        void callback(event);
      });
    }
  }
}
