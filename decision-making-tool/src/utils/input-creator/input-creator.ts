import { Tags } from '../../models/enums/tags.enum';
import type { CreateOptions } from '../../models/interfaces/create-options.interface';
import type { InputOptions } from '../../models/interfaces/input-options.interface';
import type { EventInputFunction } from '../../models/types/event-input.type';
import { HtmlElementCreator } from '../html-element-creator';
import './input.scss';

export class InputCreator extends HtmlElementCreator {
  constructor(inputOptions: InputOptions) {
    const options: CreateOptions = {
      tag: Tags.INPUT,
      classes: ['input', inputOptions.role],
    };
    super(options);
    if (inputOptions.callback) {
      this.setCallback(inputOptions.callback);
    }
    if (this.element instanceof HTMLInputElement) {
      this.element.placeholder = inputOptions.placeholder;
    }
    if (inputOptions.type) {
      this.setType(inputOptions.type);
    }
  }

  public setCallback(callback: EventInputFunction): void {
    if (typeof callback === 'function' && this.element) {
      this.element.addEventListener('change', (event) => callback(event));
    }
  }

  public setType(type: string): void {
    if (this.element instanceof HTMLInputElement) {
      this.element.type = type;
    }
  }
}
