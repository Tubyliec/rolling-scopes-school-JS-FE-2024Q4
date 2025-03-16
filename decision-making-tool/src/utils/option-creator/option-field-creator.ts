import { optionsArray } from '../../data/options';
import type { CreateOptions } from '../../models/interfaces/create-options.interface';
import type { ListOptions } from '../../models/interfaces/list-options.interface';
import type { IsHtmlElement } from '../../models/types/is-html-element.type';

import { ButtonCreator } from '../buttons-creator/buttons-creator';
import { HtmlElementCreator } from '../html-element-creator';
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
    this.primaryInput = OptionFieldCreator.createPrimaryInput(optionOptions);
    this.secondaryInput =
      OptionFieldCreator.createSecondaryInput(optionOptions);
    this.deleteButton = new ButtonCreator(options, 'Delete', () =>
      this.deleteOption(index),
    ).getHtmlElement();
    this.deleteButton?.classList.add('button--delete');
    this.optionIndex = index;
    if (this.element && this.deleteButton) {
      this.element.append(
        this.labelElement,
        this.primaryInput,
        this.secondaryInput,
        this.deleteButton,
      );
    }
  }

  public static createPrimaryInput(optionOptions: ListOptions): HTMLElement {
    const primaryInput: HTMLInputElement = document.createElement('input');
    primaryInput.placeholder = 'Title';
    if (optionOptions.id) {
      primaryInput.id = `${optionOptions.id}-primary`;
    }
    if (optionOptions.title) {
      primaryInput.value = optionOptions.title;
    }
    primaryInput.classList.add('input', 'primary-input');
    return primaryInput;
  }

  public static createSecondaryInput(optionOptions: ListOptions): HTMLElement {
    const secondaryInput: HTMLInputElement = document.createElement('input');
    secondaryInput.placeholder = 'Weight';
    secondaryInput.type = 'number';
    if (optionOptions.weight) {
      secondaryInput.value = optionOptions.weight;
    }
    if (optionOptions.id) {
      secondaryInput.id = `${optionOptions.id}-secondary`;
    }
    secondaryInput.classList.add('input', 'secondary-input');
    return secondaryInput;
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

  public deleteOption(index: number): void {
    optionsArray[index] = {};
    this.element?.remove();
  }
}
