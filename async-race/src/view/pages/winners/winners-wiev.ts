import type { ElementOptions } from '../../../models/interfaces/element-options.interface';
import { PageCreator } from '../../../utils/view-creators/page-creator';

export class WinnersView extends PageCreator {
  constructor(options: ElementOptions) {
    super(options);
    this.getElement().textContent = 'winners';
  }
}
