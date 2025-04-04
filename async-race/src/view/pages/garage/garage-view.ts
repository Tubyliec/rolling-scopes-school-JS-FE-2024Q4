import { GarageContainer } from '../../../components/garage-container/garage-container';
import { NavBar } from '../../../components/navigation-panel/nav-bar';
import type { ElementOptions } from '../../../models/interfaces/element-options.interface';
import type { IsHTMLElement } from '../../../models/types/is-html-element.type';
import { PageCreator } from '../../../utils/view-creators/page-creator';

export class GarageView extends PageCreator {
  private navBar: IsHTMLElement;
  private garageContainer: IsHTMLElement;
  constructor(options: ElementOptions) {
    super(options);
    this.addNav();
    this.addHeader(this.element, {
      tag: 'h1',
      css: ['page-header'],
      text: 'Garage()',
    });
    this.addGarageContainer({ tag: 'section', css: ['garage-container'] });
  }

  public addNav(): void {
    this.navBar = new NavBar({ tag: 'nav', css: ['nav-bar'] }).getElement();
    this.addInnerElement(this.navBar);
  }

  public addGarageContainer(options: ElementOptions): void {
    this.garageContainer = new GarageContainer(options).getElement();
    this.addInnerElement(this.garageContainer);
  }
}
