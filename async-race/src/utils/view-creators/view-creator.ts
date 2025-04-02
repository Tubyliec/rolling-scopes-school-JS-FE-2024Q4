import type { ElementOptions } from '../../models/interfaces/element-options.interface';
import { HTMLElementCreator } from './html-element-creator';

export class ViewCreator extends HTMLElementCreator {
  constructor(options: ElementOptions) {
    super(options);
    this.setTextContent(options.text);
  }
}
