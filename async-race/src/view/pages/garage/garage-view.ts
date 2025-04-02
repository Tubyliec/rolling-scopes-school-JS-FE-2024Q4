import { NavBar } from '../../../components/navigation-panel/nav-bar';
import type { ElementOptions } from '../../../models/interfaces/element-options.interface';
import type { IsHTMLElement } from '../../../models/types/is-html-element.type';
import { PageCreator } from '../../../utils/view-creators/page-creator';

export class GarageView extends PageCreator {
  private navBar: IsHTMLElement;
  constructor(options: ElementOptions) {
    super(options);
    this.addNav();
  }

  public addNav(): void {
    this.navBar = new NavBar({ tag: 'nav', css: ['nav-bar'] }).getElement();
    this.addInnerElement(this.navBar);
  }
}
