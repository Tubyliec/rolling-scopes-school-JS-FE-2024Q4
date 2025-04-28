import { Tags } from '../../models/enums/tags.enum';
import type { CreateOptions } from '../../models/interfaces/create-options.interface';
import { ViewCreator } from '../view-creator';
import './name.scss';
const cssClasses: string[] = ['name'];

export class Name extends ViewCreator {
  constructor() {
    const options: CreateOptions = {
      tag: Tags.H1,
      classes: [...cssClasses],
      text: 'Decision Making Tool',
    };
    super(options);
    this.createElementView(options);
  }
}
