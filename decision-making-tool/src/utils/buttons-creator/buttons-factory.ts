import type { ButtonOptions } from '../../models/interfaces/button-options.interface';

export function createButton(options: ButtonOptions): HTMLButtonElement {
  const button = document.createElement('button');
  button.textContent = options.text;
  button.type = options.type || 'button';
  if (options.classNames) {
    for (const name of options.classNames) {
      button.classList.add(name);
    }
  }
  if (options.clickHandler) {
    button.addEventListener('click', options.clickHandler);
  }
  return button;
}
