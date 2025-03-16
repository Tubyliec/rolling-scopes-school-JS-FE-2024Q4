import type { CreateOptions } from '../../models/interfaces/create-options.interface';
import type { InputOptions } from '../../models/interfaces/input-options.interface';
import type { EventFunction } from '../../models/types/event-callback.type';
import { HtmlElementCreator } from '../html-element-creator';
import './input.scss';

export class InputCreator extends HtmlElementCreator {
  constructor(inputOptions: InputOptions) {
    const options: CreateOptions = {
      tag: 'input',
      classes: ['input', `${inputOptions.role}-input`],
    };
    super(options);
    this.createHtmlElement(options);
    if (inputOptions.callback) {
      this.setCallback(inputOptions.callback);
    }
    if (this.element instanceof HTMLInputElement) {
      this.element.placeholder = inputOptions.placeholder;
    }
  }

  public setCallback(callback: EventFunction): void {
    if (typeof callback === 'function' && this.element) {
      this.element.addEventListener('click', (event) => callback(event));
    }
  }
}
