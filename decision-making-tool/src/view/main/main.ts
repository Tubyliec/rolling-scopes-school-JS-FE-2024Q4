import { CreateOptions } from '../../models/interfaces/create-options.interface';
import { ViewCreator } from '../view-creator';
import './main.scss';

const scssClasses = ['main-section'];

export class mainView extends ViewCreator {
  constructor() {
    const options: CreateOptions = {
      tag: 'main',
      classes: [...scssClasses],
    };
    super(options);
    this.createElementView(options);
  }
}
