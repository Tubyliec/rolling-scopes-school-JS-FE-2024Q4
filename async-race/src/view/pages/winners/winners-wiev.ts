import { NavBar } from '../../../components/navigation-panel/nav-bar';
import { WinnersContainer } from '../../../components/winners-container/winners-container';
import type { ElementOptions } from '../../../models/interfaces/element-options.interface';
import type { IsHTMLElement } from '../../../models/types/is-html-element.type';
import { ViewUtilities } from '../../../utils/accessory-utils/view-utilities';
import { PageCreator } from '../../../utils/view-creators/page-creator';

export class WinnersView extends PageCreator {
  public winnersTable: WinnersContainer | undefined;
  private navBar: IsHTMLElement;

  constructor(options: ElementOptions) {
    super(options);
    this.navBar = undefined;
    this.addNav();
    this.renderWinners();
  }

  public addNav(): void {
    this.navBar = new NavBar({ tag: 'nav', css: ['nav-bar'] }).getElement();
    this.addInnerElement(this.navBar);
  }

  public renderWinners(): void {
    if (this.winnersTable && this.winnersTable.element) {
      ViewUtilities.clearElement(this.winnersTable.element);
    }
    this.winnersTable = new WinnersContainer({
      tag: 'div',
      css: ['winners-container'],
    });
    this.addInnerElement(this.winnersTable.getElement());
  }
}
