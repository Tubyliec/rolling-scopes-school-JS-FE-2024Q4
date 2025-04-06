import type { ElementOptions } from '../../models/interfaces/element-options.interface';
import type { CallbackNav } from '../../models/types/callback-nav.type';
import { HTMLElementCreator } from './html-element-creator';

export class InputCreator extends HTMLElementCreator {
  constructor(options: ElementOptions) {
    super(options);
    if (options.callback) {
      this.setCallback(options.callback);
    }

    this.setPlaceholder(options);
    this.setType(options);
  }

  public setCallback(callback: CallbackNav): void {
    if (this.element && typeof callback === 'function') {
      this.element.addEventListener('change', (event) => callback(event));
    }
  }

  public setPlaceholder(options: ElementOptions): void {
    if (this.element && this.element instanceof HTMLInputElement) {
      this.element.placeholder = options.placeholder || '';
    }
  }

  public setType(options: ElementOptions): void {
    if (this.element && this.element instanceof HTMLInputElement) {
      this.element.type = options.type || '';
    }
  }
}
