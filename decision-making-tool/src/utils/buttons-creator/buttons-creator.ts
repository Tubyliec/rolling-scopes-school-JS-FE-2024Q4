import type { CreateOptions } from '../../models/interfaces/create-options.interface';
import { HtmlElementCreator } from '../html-element-creator';
import './button.scss';

const cssClasses: string[] = ['main-button'];

export class ButtonCreator extends HtmlElementCreator {
  constructor(options: CreateOptions, text: string) {
    super(options);
    this.setText(text);
  }
  public createHtmlElement(): void {
    this.element = document.createElement('button');
    this.setCss([...cssClasses]);
  }
}
