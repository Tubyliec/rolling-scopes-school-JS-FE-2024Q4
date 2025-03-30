import type { ElementOptions } from '../../models/interfaces/element-options.interface';
import type { IsHTMLElement } from '../../models/types/is-html-element.type';

export abstract class HTMLElementCreator {
  public element: IsHTMLElement;
  constructor(options: ElementOptions) {
    this.element = undefined;
    this.createElements(options);
  }

  public createElements(options: ElementOptions): void {
    this.element = document.createElement(options.tag);
  }

  public getElement(): HTMLElement {
    if (!this.element) {
      throw new Error('Element not created');
    }
    return this.element;
  }
}
