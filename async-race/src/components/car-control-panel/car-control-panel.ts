import {
  createdCar,
  updatedCar,
  updatedId,
} from '../../data/creation-car-data';
import { domElements } from '../../data/dom-elements';
import type { ElementOptions } from '../../models/interfaces/element-options.interface';
import type { IsHTMLElement } from '../../models/types/is-html-element.type';
import { createCarActions } from '../../utils/buttons-processing/create-actions';
import { InputActions } from '../../utils/buttons-processing/input-actions';
import { RaceControlActions } from '../../utils/buttons-processing/race-control-actions';
import { ButtonsCreator } from '../../utils/view-creators/buttons-creator';
import { HTMLElementCreator } from '../../utils/view-creators/html-element-creator';
import { InputCreator } from '../../utils/view-creators/input-creator';
import { ViewCreator } from '../../utils/view-creators/view-creator';
import './car-control-panel.scss';

export class CarControlPanel extends HTMLElementCreator {
  public createContainer: ViewCreator | undefined;
  public createCarName: InputCreator | undefined;
  public createCarColor: InputCreator | undefined;
  public createCarButton: ButtonsCreator | undefined;
  public updateContainer: ViewCreator | undefined;
  public updateCarName: InputCreator | undefined;
  public updateCarColor: InputCreator | undefined;
  public updateCarButton: ButtonsCreator | undefined;
  public raceContainer: ViewCreator | undefined;
  public raceButton: IsHTMLElement;
  public resetButton: IsHTMLElement;
  public generateCarsButton: IsHTMLElement;
  public winnerText: ViewCreator | undefined;

  constructor(options: ElementOptions) {
    super(options);
    this.init();
  }

  public init(): void {
    this.initCreateContainer();
    this.initUpdateContainer();
    this.initRaceContainer();
  }

  public initCreateContainer(): void {
    this.createContainer = new ViewCreator({
      tag: 'div',
      css: ['create-container'],
    });
    this.addInnerElement(this.createContainer);
    this.createCarName = new InputCreator({
      tag: 'input',
      css: ['control-input', 'name-input'],
      placeholder: 'Enter car name',
      type: 'text',
      callback: (): void => {
        if (this.createCarName)
          InputActions.sendInput(this.createCarName, createdCar);
      },
    });
    this.createContainer.addInnerElement(this.createCarName);
    this.createCarColor = new InputCreator({
      tag: 'input',
      css: ['control-input', 'color-input'],
      type: 'color',
      callback: (): void => {
        if (this.createCarColor)
          InputActions.sendInput(this.createCarColor, createdCar);
      },
    });
    this.createContainer.addInnerElement(this.createCarColor);
    this.createCarButton = new ButtonsCreator({
      tag: 'button',
      css: ['button', 'create-button'],
      text: 'Create new car',
      callback: (): void => {
        createCarActions.createCar(createdCar);
      },
    });
    this.createContainer.addInnerElement(this.createCarButton);
  }

  public initUpdateContainer(): void {
    this.updateContainer = new ViewCreator({
      tag: 'div',
      css: ['create-container'],
    });
    this.addInnerElement(this.updateContainer);
    this.updateCarName = new InputCreator({
      tag: 'input',
      css: ['control-input', 'name-input'],
      placeholder: 'Enter car new name',
      type: 'text',
      callback: (): void => {
        if (this.updateCarName)
          InputActions.sendInput(this.updateCarName, updatedCar);
      },
    });
    domElements.updateCarName = this.updateCarName;
    this.updateContainer.addInnerElement(this.updateCarName);
    this.updateCarColor = new InputCreator({
      tag: 'input',
      css: ['control-input', 'color-input'],
      type: 'color',
      callback: (): void => {
        if (this.updateCarColor)
          InputActions.sendInput(this.updateCarColor, updatedCar);
      },
    });
    this.updateContainer.addInnerElement(this.updateCarColor);
    domElements.updateCarColor = this.updateCarColor;
    this.updateCarButton = new ButtonsCreator({
      tag: 'button',
      css: ['button', 'create-button'],
      text: 'Update car',
      callback: (): void => {
        if (updatedId.id) createCarActions.updateCar(updatedId.id, updatedCar);
      },
    });
    this.updateContainer.addInnerElement(this.updateCarButton);
  }

  public initRaceContainer(): void {
    this.raceContainer = new ViewCreator({
      tag: 'div',
      css: ['race-container'],
    });
    domElements.raceContainer = this.raceContainer;
    this.addInnerElement(this.raceContainer);
    this.raceButton = new ButtonsCreator({
      tag: 'button',
      css: ['button', 'race-button'],
      text: 'Race',
      callback: (): void => {
        void RaceControlActions.race(this);
      },
    }).getElement();
    this.raceContainer.addInnerElement(this.raceButton);
    this.resetButton = new ButtonsCreator({
      tag: 'button',
      css: ['button', 'race-button'],
      text: 'Reset',
      callback: (): void => {
        RaceControlActions.reset(this);
      },
    }).getElement();
    if (this.resetButton instanceof HTMLButtonElement)
      this.resetButton.disabled = true;
    this.raceContainer.addInnerElement(this.resetButton);
    this.generateCarsButton = new ButtonsCreator({
      tag: 'button',
      css: ['button', 'race-button'],
      text: 'Generate cars',
      callback: (): void => {
        void RaceControlActions.generateCars(this);
      },
    }).getElement();
    this.raceContainer.addInnerElement(this.generateCarsButton);
  }
}
