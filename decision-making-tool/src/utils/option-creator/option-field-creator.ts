import type { CreateOptions } from '../../models/interfaces/create-options.interface';
import type { InputOptions } from '../../models/interfaces/input-options.interface';
import type { ListOptions } from '../../models/interfaces/list-options.interface';
import type { IsHtmlElement } from '../../models/types/is-html-element.type';
import { ButtonsActions } from '../buttons-actions/buttons-actions';
import { ButtonCreator } from '../buttons-creator/buttons-creator';
import { HtmlElementCreator } from '../html-element-creator';
import { InputActions } from '../input-actions/input-actions';
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
    this.labelElement = OptionFieldCreator.createLabel(optionOptions);
    const primaryOption: InputOptions = {
      placeholder: 'Title',
      role: 'primary-input',
      callback: (): void =>
        InputActions.saveValue(this.optionIndex, primaryOption.role),
    };
    const secondaryOption: InputOptions = {
      placeholder: 'Weight',
      role: 'secondary-input',
      callback: (): void =>
        InputActions.saveValue(this.optionIndex, secondaryOption.role),
    };
    this.primaryInput = new OptionInputCreator(
      primaryOption,
      optionOptions,
    ).getHtmlElement();
    this.secondaryInput = new OptionInputCreator(
      secondaryOption,
      optionOptions,
    ).getHtmlElement();
    if (this.secondaryInput instanceof HTMLInputElement) {
      this.secondaryInput.type = 'number';
    }

    this.deleteButton = new ButtonCreator(
      ['button', 'button__delete'],
      'Delete',
      () => ButtonsActions.deleteOption(index, this.element),
    ).getHtmlElement();
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

  public static createLabel(optionOptions: ListOptions): HTMLElement {
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
