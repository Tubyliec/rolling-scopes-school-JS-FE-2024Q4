import type { ElementOptions } from '../../../models/interfaces/element-options.interface';
import type { IsHTMLElement } from '../../../models/types/is-html-element.type';
import { CarControlPanel } from '../../../components/car-control-panel/car-control-panel';
import { GarageContainer } from '../../../components/garage-container/garage-container';
import { NavBar } from '../../../components/navigation-panel/nav-bar';
import { domElements } from '../../../data/dom-elements';
import { Api } from '../../../services/api';
import { ViewUtilities } from '../../../utils/accessory-utils/view-utilities';
import { PageCreator } from '../../../utils/view-creators/page-creator';

export class GarageView extends PageCreator {
  private CarControlPanel: IsHTMLElement;
  private navBar: IsHTMLElement;
  private garageContainer: GarageContainer | undefined;
  private CarCount: string | null;
  constructor(options: ElementOptions) {
    super(options);
    this.CarCount = '';
    this.renderView();
  }

  public renderView(): void {
    void this.updateCarsCount().then(() => {
      ViewUtilities.clearElement(this.element);
      this.init({ tag: 'section', css: ['garage-container'] });
    });
  }

  public init(options: ElementOptions): void {
    this.navBar = new NavBar({ tag: 'nav', css: ['nav-bar'] }).getElement();
    this.addInnerElement(this.navBar);
    this.CarControlPanel = new CarControlPanel({
      tag: 'div',
      css: ['car-control-panel'],
    }).getElement();
    this.addInnerElement(this.CarControlPanel);
    this.addHeader(this.element, {
      tag: 'h1',
      css: ['page-header'],
      text: `Garage(${this.CarCount})`,
    });
    this.garageContainer = new GarageContainer(options);
    domElements.garageContainer = this.garageContainer;
    this.addInnerElement(this.garageContainer);
  }

  public async updateCarsCount(): Promise<void> {
    const count = await Api.getCarsCount();
    this.CarCount = count;
  }
}
