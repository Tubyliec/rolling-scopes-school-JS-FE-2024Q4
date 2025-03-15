import { ButtonOptions } from '../../models/interfaces/button-options.interface';
import { CreateOptions } from '../../models/interfaces/create-options.interface';
import { HtmlElementCreator } from '../html-element-creator';
import './button.scss';

const scssClasses = ['main-button'];

export class ButtonCreator extends HtmlElementCreator {
  constructor(options: CreateOptions, text: string) {
    super(options);
    this.setText(text);
  }
  createHtmlElement(options: CreateOptions): void {
    this.element = document.createElement('button');
    this.setCss([...scssClasses]);
  }
}
