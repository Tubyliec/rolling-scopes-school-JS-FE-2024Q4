import type { ElementOptions } from '../../models/interfaces/element-options.interface';
import type { IsHTMLElement } from '../../models/types/is-html-element.type';
import { RaceControlActions } from '../../utils/buttons-processing/race-buttons-actions';
import { ButtonsCreator } from '../../utils/view-creators/buttons-creator';
import { HTMLElementCreator } from '../../utils/view-creators/html-element-creator';
import { ViewCreator } from '../../utils/view-creators/view-creator';
import './car-control-panel.scss';

export class CarControlPanel extends HTMLElementCreator {
  public raceContainer: IsHTMLElement;
  public raceButton: IsHTMLElement;
  public resetButton: IsHTMLElement;
  constructor(options: ElementOptions) {
    super(options);
    this.init();
  }

  public init(): void {
    this.raceContainer = new ViewCreator({
      tag: 'div',
      css: ['race-container'],
    }).getElement();
    this.addInnerElement(this.raceContainer);
    this.raceButton = new ButtonsCreator({
      tag: 'button',
      css: ['button', 'race-button'],
      text: 'Race',
      callback: (): void => {
        RaceControlActions.Race();
      },
    }).getElement();
    this.addInnerElement(this.raceButton);
    this.resetButton = new ButtonsCreator({
      tag: 'button',
      css: ['button', 'race-button'],
      text: 'Reset',
      callback: (): void => {
        RaceControlActions.Reset();
      },
    }).getElement();
    this.addInnerElement(this.resetButton);
  }
}
