import { Tags } from '../../models/enums/tags.enum';
import type { CreateOptions } from '../../models/interfaces/create-options.interface';
import type { EventFunction } from '../../models/types/event-callback.type';
import { HtmlElementCreator } from '../html-element-creator';
import './button.scss';

export class ButtonCreator extends HtmlElementCreator<HTMLButtonElement> {
  constructor(classes: string[], text: string, callback?: EventFunction) {
    const options: CreateOptions = {
      tag: Tags.BUTTON,
      classes: [...classes],
    };
    super(options);
    this.setCss([...classes]);
    this.setText(text);
    if (callback) {
      this.setCallback(callback);
    }
  }

  public createHtmlElement(): void {
    this.element = document.createElement('button');
  }
}
