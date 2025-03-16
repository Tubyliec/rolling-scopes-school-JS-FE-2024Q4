import type { CreateOptions } from '../../models/interfaces/create-options.interface';
import type { ListOptions } from '../../models/interfaces/list-options.interface';
import type { IsHtmlElement } from '../../models/types/is-html-element.type';
import { ButtonsActions } from '../buttons-actions/buttons-actions';

import { ButtonCreator } from '../buttons-creator/buttons-creator';
import { HtmlElementCreator } from '../html-element-creator';
import { OptionInputCreator } from '../input-creator/option-input-creator';
import './option-field.scss';

const cssClasses: string[] = ['option'];

export class OptionFieldCreator extends HtmlElementCreator {
  public primaryInput: IsHtmlElement;
  public secondaryInput: IsHtmlElement;
  public labelElement: IsHtmlElement;
  public deleteButton: IsHtmlElement;
  public optionIndex: number;

  constructor(
    options: CreateOptions,
    optionOptions: ListOptions,
    index: number,
  ) {
    super(options);
    this.createHtmlElement();
    this.labelElement = OptionFieldCreator.createlabel(optionOptions);
    const primaryOption = { placeholder: 'Title', role: 'primary' };
    const secondaryOption = { placeholder: 'Title', role: 'primary' };
    this.primaryInput = new OptionInputCreator(
      primaryOption,
      optionOptions,
    ).getHtmlElement();
    this.secondaryInput = new OptionInputCreator(
      secondaryOption,
      optionOptions,
    ).getHtmlElement();
    this.deleteButton = new ButtonCreator(options, 'Delete', () =>
      ButtonsActions.deleteOption(index, this.element),
    ).getHtmlElement();
    this.deleteButton?.classList.add('button--delete');
    this.optionIndex = index;
    this.element?.append(this.labelElement);
    if (this.primaryInput instanceof HTMLElement) {
      this.element?.append(this.primaryInput);
    }
    if (this.secondaryInput instanceof HTMLElement) {
      this.element?.append(this.secondaryInput);
    }
    if (this.element && this.deleteButton) {
      this.element.append(this.deleteButton);
    }
  }

  public static createInput(
    optionOptions: ListOptions,
    placeholder: string,
    role: string,
  ): HTMLElement {
    const input: HTMLInputElement = document.createElement('input');
    input.placeholder = placeholder;
    if (optionOptions.id) {
      input.id = `${optionOptions.id}-${role}`;
    }
    if (optionOptions.title) {
      input.value = optionOptions.title;
    }
    input.classList.add('input', `${role}-input`);
    return input;
  }

  public static createlabel(optionOptions: ListOptions): HTMLElement {
    const labelElement: HTMLLabelElement = document.createElement('label');
    labelElement.classList.add('label');
    if (optionOptions.id) {
      labelElement.htmlFor = `${optionOptions.id}-primary`;
      labelElement.textContent = optionOptions.id;
    }
    return labelElement;
  }

  public createHtmlElement(): void {
    this.element = document.createElement('li');
    this.setCss(cssClasses);
  }
}
