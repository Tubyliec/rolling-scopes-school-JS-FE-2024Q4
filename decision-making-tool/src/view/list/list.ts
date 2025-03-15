import { CreateOptions } from '../../models/interfaces/create-options.interface';
import { ViewCreator } from '../view-creator';
const scssClasses = ['list'];

export class List extends ViewCreator {
  constructor() {
    const options: CreateOptions = {
      tag: 'ul',
      classes: [...scssClasses],
    };
    super(options);
    this.createElementView(options);
  }
}
