import type { CreateOptions } from '../../models/interfaces/create-options.interface';
import { OptionCreator } from '../../utils/input-creator/option-field-creator';
import { ViewCreator } from '../view-creator';
import './list.scss';

const cssClasses = ['list'];

export class List extends ViewCreator {
  constructor() {
    const options: CreateOptions = {
      tag: 'ul',
      classes: [...cssClasses],
    };
    super(options);
    this.createElementView(options);

    const optionItem = new OptionCreator(options, {
      id: 'fuel',
    }).getHtmlElement();
    if (optionItem) {
      this.createElementView(options).appendElement([optionItem]);
    }
  }
}
