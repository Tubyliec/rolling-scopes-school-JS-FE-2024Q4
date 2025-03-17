import { HtmlElementCreator } from '../html-element-creator';
import './dialog.scss';

const cssClasses: string[] = [''];

export class DialogCreator extends HtmlElementCreator {
  constructor() {
    const options = {
      tag: 'dialog',
      classes: [...cssClasses],
    };
    super(options);
  }
}
