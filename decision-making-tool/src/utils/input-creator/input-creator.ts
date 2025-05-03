import { Tags } from '../../models/enums/tags.enum';
import type { CreateOptions } from '../../models/interfaces/create-options.interface';
import type { InputOptions } from '../../models/interfaces/input-options.interface';
import type { EventInputFunction } from '../../models/types/event-input.type';
import { HtmlElementCreator } from '../html-element-creator';
import './input.scss';

export class InputCreator extends HtmlElementCreator<HTMLInputElement> {
  constructor(inputOptions: InputOptions) {
    const options: CreateOptions = {
      tag: Tags.INPUT,
      classes: ['input', inputOptions.role],
    };
    super(options);
    if (inputOptions.callback) {
      this.setCallback(inputOptions.callback);
    }

    if (this.element) this.element.placeholder = inputOptions.placeholder;

    if (inputOptions.type) {
      this.setType(inputOptions.type);
    }
  }

  public setCallback(callback: EventInputFunction): void {
    if (typeof callback === 'function' && this.element) {
      this.eventHandler = (event: Event): void => {
        void callback(event);
      };
      this.element.addEventListener('change', this.eventHandler);
    }
  }

  public cleanCallback(): void {
    if (this.element && this.eventHandler) {
      this.element.removeEventListener('change', this.eventHandler);
      this.eventHandler = undefined;
    }
  }

  public setType(type: string): void {
    if (this.element) this.element.type = type;
  }
}
