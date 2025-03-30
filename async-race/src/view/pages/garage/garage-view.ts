import type { ElementOptions } from '../../../models/interfaces/element-options.interface';
import { PageCreator } from '../../../utils/view-creators/page-creator';

export class GarageView extends PageCreator {
  constructor(options: ElementOptions) {
    super(options);
    this.getElement().textContent = 'garage';
  }
}
