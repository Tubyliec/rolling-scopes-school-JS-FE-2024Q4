import type { ElementOptions } from '../../models/interfaces/element-options.interface';
import { HTMLElementCreator } from '../../utils/view-creators/html-element-creator';

export class WinnersContainer extends HTMLElementCreator {
  constructor(options: ElementOptions) {
    super(options);
  }
}
