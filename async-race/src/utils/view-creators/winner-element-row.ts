import type { ElementOptions } from '../../models/interfaces/element-options.interface';
import { ViewCreator } from './view-creator';

export class WinnerElementRow extends ViewCreator {
  constructor(options: ElementOptions) {
    super(options);
  }
}
