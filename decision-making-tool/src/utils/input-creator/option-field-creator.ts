import type { CreateOptions } from '../../models/interfaces/create-options.interface';
import type { ListOptions } from '../../models/interfaces/list-options.interface';
import type { IsHtmlElement } from '../../models/types/is-html-element.type';
import { ButtonCreator } from '../buttons-creator/buttons-creator';
import { HtmlElementCreator } from '../html-element-creator';
import './option-field.scss';

const cssClasses = ['option'];

export class OptionCreator extends HtmlElementCreator {
  public primaryInput: IsHtmlElement;
  public secondaryInput: IsHtmlElement;
  public labelElement: IsHtmlElement;
  public deleteButton: IsHtmlElement;

  constructor(options: CreateOptions, optionOptions: ListOptions) {
    super(options);
    this.createHtmlElement();
    this.labelElement = this.createlabel(optionOptions);
    this.primaryInput = this.createPrimaryInput(optionOptions);
    this.secondaryInput = this.createSecondaryInput(optionOptions);
    this.deleteButton = new ButtonCreator(options, 'Delete').getHtmlElement();
    this.deleteButton?.classList.add('button--delete');
    if (this.element && this.deleteButton) {
      this.element.append(
        this.labelElement,
        this.primaryInput,
        this.secondaryInput,
        this.deleteButton,
      );
    }
  }

  public createHtmlElement(): void {
    this.element = document.createElement('li');
    this.setCss(cssClasses);
  }

  public createPrimaryInput(optionOptions: ListOptions): HTMLElement {
    const primaryInput = document.createElement('input');
    primaryInput.placeholder = 'Title';
    if (optionOptions.id) {
      primaryInput.id = optionOptions.id;
    }
    primaryInput.classList.add('input', 'primary-input');
    return primaryInput;
  }

  public createSecondaryInput(optionOptions: ListOptions): HTMLElement {
    const secondaryInput = document.createElement('input');
    secondaryInput.placeholder = 'Weight';
    secondaryInput.type = 'number';
    if (optionOptions.weight) {
      secondaryInput.value = optionOptions.weight;
    }
    secondaryInput.classList.add('input', 'secondary-input');
    return secondaryInput;
  }

  public createlabel(optionOptions: ListOptions): HTMLElement {
    const labelElement = document.createElement('label');
    labelElement.classList.add('label');
    if (optionOptions.id) {
      labelElement.htmlFor = optionOptions.id;
      labelElement.textContent = optionOptions.id;
    }
    return labelElement;
  }
}
