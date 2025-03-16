import type { CreateOptions } from '../../models/interfaces/create-options.interface';
import type { EventFunction } from '../../models/types/event-callback.type';
import { HtmlElementCreator } from '../html-element-creator';
import './button.scss';

const cssClasses: string[] = ['main-button'];

export class ButtonCreator extends HtmlElementCreator {
  constructor(options: CreateOptions, text: string, callback?: EventFunction) {
    super(options);
    this.setText(text);
    if (callback) {
      this.setCallback(callback);
    }
  }

  public createHtmlElement(): void {
    this.element = document.createElement('button');
    this.setCss([...cssClasses]);
  }
}
