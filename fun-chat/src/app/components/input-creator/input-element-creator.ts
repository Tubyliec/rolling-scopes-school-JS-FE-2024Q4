import type { InputOptions } from '../../../models/interfaces/input-options.interface';
import { BaseElementCreator } from '../base-element-creator';

export class Input extends BaseElementCreator {
  constructor(inputOptions?: InputOptions) {
    super({ tag: 'input', css: ['input__field', 'input_empty'] });

    this.setAttribute({
      name: 'placeholder',
      value: inputOptions?.placeholder || '',
    });
    this.setAttribute({ name: 'type', value: inputOptions?.type || 'text' });
    if (inputOptions?.inputCallback)
      this.setInputListener(inputOptions.inputCallback);
    if (inputOptions?.required)
      this.setAttribute({ name: 'required', value: 'required' });
    if (inputOptions?.pattern)
      this.setAttribute({ name: 'pattern', value: inputOptions.pattern });
  }

  public setInputListener(callback: (value: string) => void): void {
    this.element.addEventListener('input', () => {
      const value = this.getValue();
      if (typeof value === 'string') callback(value);
    });
  }

  public getValue(): string | undefined {
    if (this.element instanceof HTMLInputElement) return this.element.value;
  }

  public setValue(value: string): void {
    if (this.element instanceof HTMLInputElement) this.element.value = value;
  }

  public isInputValid(): boolean {
    if (this.element instanceof HTMLInputElement) {
      return this.element.validity.valid;
    }
    return false;
  }

  public isValueMissing(): boolean {
    if (this.element instanceof HTMLInputElement) {
      return this.element.validity.valueMissing;
    }
    return false;
  }

  public isPatternMismatch(): boolean {
    if (this.element instanceof HTMLInputElement) {
      return this.element.validity.patternMismatch;
    }
    return false;
  }
}
