import type { InputOptions } from '../../models/interfaces/input-options.interface';
import type { ListOptions } from '../../models/interfaces/list-options.interface';
import { InputCreator } from './input-creator';

export class OptionInputCreator extends InputCreator {
  constructor(inputOptions: InputOptions, optionOptions: ListOptions) {
    super(inputOptions);
    if (this.element && optionOptions.id) {
      this.element.id = `${optionOptions.id}-${inputOptions.role}`;
    }
    if (
      this.element &&
      optionOptions.title &&
      this.element instanceof HTMLInputElement
    ) {
      this.element.value = optionOptions.title;
    }
  }
}
