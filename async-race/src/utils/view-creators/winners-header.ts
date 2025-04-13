import type { ElementOptions } from '../../models/interfaces/element-options.interface';
import { ViewCreator } from './view-creator';

export class WinnersHeader extends ViewCreator {
  public number: ViewCreator | undefined;
  public car: ViewCreator | undefined;
  public name: ViewCreator | undefined;
  public wins: ViewCreator | undefined;
  public time: ViewCreator | undefined;
  constructor(options: ElementOptions) {
    super(options);
    this.init();
  }

  public init(): void {
    this.number = new ViewCreator({
      tag: 'div',
      css: ['table-element', 'col'],
      text: '№',
    });
    this.addInnerElement(this.number);
    this.car = new ViewCreator({
      tag: 'div',
      css: ['table-element', 'col'],
      text: 'Car',
    });
    this.addInnerElement(this.car);
    this.name = new ViewCreator({
      tag: 'div',
      css: ['table-element', 'col'],
      text: 'Name',
    });
    this.addInnerElement(this.name);
    this.wins = new ViewCreator({
      tag: 'div',
      css: ['table-element', 'col'],
      text: 'Wins',
    });
    this.addInnerElement(this.wins);
    this.time = new ViewCreator({
      tag: 'div',
      css: ['table-element', 'col'],
      text: 'Best time',
    });
    this.addInnerElement(this.time);
  }
}
