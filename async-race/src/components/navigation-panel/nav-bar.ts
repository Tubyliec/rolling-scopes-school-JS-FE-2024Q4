import { HTMLElementCreator } from '../../utils/view-creators/html-element-creator';
import type { ElementOptions } from '../../models/interfaces/element-options.interface';
import { ButtonsCreator } from '../../utils/view-creators/buttons-creator';
import type { IsHTMLElement } from '../../models/types/is-html-element.type';
import { NavActions } from '../../utils/buttons-processing/nav-actions';
import './navigation.scss';

export class NavBar extends HTMLElementCreator {
  private garageButton: IsHTMLElement;
  private winnersButton: IsHTMLElement;

  constructor(options: ElementOptions) {
    super(options);
    this.garageButton = undefined;
    this.winnersButton = undefined;
    this.createView();
  }

  public createView(): void {
    this.garageButton = new ButtonsCreator({
      tag: 'button',
      css: ['nav-bar__button'],
      text: 'Garage',
      callback: (): void => NavActions.navigateToPage('garage'),
    }).getElement();
    this.addInnerElement(this.garageButton);
    this.winnersButton = new ButtonsCreator({
      tag: 'button',
      css: ['nav-bar__button'],
      text: 'Winners',
      callback: (): void => NavActions.navigateToPage('winners'),
    }).getElement();
    this.addInnerElement(this.winnersButton);
  }
}
