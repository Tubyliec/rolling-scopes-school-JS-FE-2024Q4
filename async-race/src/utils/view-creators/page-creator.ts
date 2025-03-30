import type { ElementOptions } from '../../models/interfaces/element-options';
import { HTMLElementCreator } from './html-element-creator';

export class PageCreator extends HTMLElementCreator {
  constructor(options: ElementOptions) {
    super(options);
  }
}
