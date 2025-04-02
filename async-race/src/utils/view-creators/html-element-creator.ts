import type { ElementOptions } from '../../models/interfaces/element-options.interface';
import type { IsHTMLElement } from '../../models/types/is-html-element.type';

export abstract class HTMLElementCreator {
  public element: IsHTMLElement;
  constructor(options: ElementOptions) {
    this.element = undefined;
    this.createElement(options);
  }

  public createElement(options: ElementOptions): void {
    this.element = document.createElement(options.tag);
    this.setCssClasses(options.css);
  }

  public getElement(): HTMLElement {
    if (!this.element) {
      throw new Error('Element not created');
    }
    return this.element;
  }

  public setCssClasses(cssClasses: string[]): void {
    for (const cssClass of cssClasses) {
      if (this.element) {
        this.element.classList.add(cssClass);
      }
    }
  }

  public setTextContent(text = ''): void {
    if (this.element) {
      this.element.textContent = text;
    }
  }

  public addInnerElement(element: HTMLElement | HTMLElementCreator): void {
    if (this.element && element instanceof HTMLElementCreator) {
      this.element.append(element.getElement());
    } else if (this.element && element instanceof HTMLElement) {
      this.element.append(element);
    }
  }
}
