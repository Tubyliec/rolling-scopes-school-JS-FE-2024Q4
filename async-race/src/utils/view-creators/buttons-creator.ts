import type { ElementOptions } from '../../models/interfaces/element-options.interface';
import type { CallbackNav } from '../../models/types/callback-nav.type';
import { HTMLElementCreator } from './html-element-creator';

export class ButtonsCreator extends HTMLElementCreator {
  constructor(options: ElementOptions) {
    super(options);
    this.setTextContent(options.text);
    if (options.callback) {
      this.setCallback(options.callback);
    }
  }
  public setCallback(callback: CallbackNav): void {
    if (this.element && typeof callback === 'function') {
      this.element.addEventListener('click', (event) => callback(event));
    }
  }
}
