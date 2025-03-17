import type { CreateOptions } from '../../models/interfaces/create-options.interface';
import type { IsHtmlElement } from '../../models/types/is-html-element.type';
import { DialogCreator } from '../../utils/dialog-creator/dialog-creator';
import { ViewCreator } from '../view-creator';

export class WarningDialogCreator extends DialogCreator {
  public warning: IsHtmlElement;
  constructor() {
    super();
    const warningOptions: CreateOptions = {
      tag: 'p',
      classes: ['warning'],
      text: 'Please add at least 2 valid options.',
    };
    this.warning = new ViewCreator(warningOptions).getElement();
  }
}
