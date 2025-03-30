import type { ElementOptions } from '../../models/interfaces/element-options';

export abstract class HTMLElementCreator {
  public element: HTMLElement | undefined;
  constructor(options: ElementOptions) {
    this.element = undefined;
    this.createElements(options);
  }

  public createElements(options: ElementOptions): void {
    this.element = document.createElement(options.tag);
  }
}
