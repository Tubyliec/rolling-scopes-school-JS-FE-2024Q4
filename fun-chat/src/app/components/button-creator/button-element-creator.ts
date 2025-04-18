import type { ButtonOptions } from '../../../models/interfaces/button-options.interface';
import type { ElementOptions } from '../../../models/interfaces/element-options.interface';
import { BaseElementCreator } from '../base-element-creator';

export class ButtonCreator extends BaseElementCreator {
  constructor(options: ElementOptions, buttonOptions?: ButtonOptions) {
    super({ ...options, tag: 'button' });
    if (buttonOptions?.clickCallback)
      this.setClickListener(buttonOptions.clickCallback);
    if (buttonOptions?.type)
      this.setAttribute({ name: 'type', value: buttonOptions.type });
  }

  public setDisableState(state: boolean): void {
    if (this.element instanceof HTMLButtonElement) {
      this.element.disabled = state;
    }
  }

  public setClickListener(listener: (event: Event) => void): void {
    this.element.addEventListener('click', listener);
  }
}
