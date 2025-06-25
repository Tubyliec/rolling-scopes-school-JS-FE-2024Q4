import {
  createdCar,
  updatedCar,
  updatedId,
} from '../../data/creation-car-data';
import { domElements } from '../../data/dom-elements';
import type { ElementOptions } from '../../models/interfaces/element-options.interface';
import { createCarActions } from '../../utils/buttons-processing/create-actions';
import { InputActions } from '../../utils/buttons-processing/input-actions';
import { RaceControlActions } from '../../utils/buttons-processing/race-control-actions';
import { ButtonsCreator } from '../../utils/view-creators/buttons-creator';
import { HTMLElementCreator } from '../../utils/view-creators/html-element-creator';
import { InputCreator } from '../../utils/view-creators/input-creator';
import { ViewCreator } from '../../utils/view-creators/view-creator';
import { Placeholders } from '../../models/enums/placeholders.enum';
import { Styles } from '../../models/enums/styles.enum';
import './car-control-panel.scss';
import { ButtonText } from '../../models/enums/button-text.enum';

export class CarControlPanel extends HTMLElementCreator {
  private createContainer: ViewCreator | undefined;
  private createCarName: InputCreator | undefined;
  private createCarColor: InputCreator | undefined;
  private createCarButton: ButtonsCreator | undefined;
  private updateContainer: ViewCreator | undefined;
  private updateCarName: InputCreator | undefined;
  private updateCarColor: InputCreator | undefined;
  private updateCarButton: ButtonsCreator | undefined;
  private raceContainer: ViewCreator | undefined;
  public raceButton: ButtonsCreator | undefined;
  public resetButton: ButtonsCreator | undefined;
  public generateCarsButton: ButtonsCreator | undefined;

  constructor(options: ElementOptions) {
    super(options);
    this.init();
  }

  public init(): void {
    this.initCreateContainer();
    this.initUpdateContainer();
    this.initRaceContainer();
  }

  public createInput(
    type: string,
    css: string,
    placeholder?: string,
  ): InputCreator {
    return new InputCreator({
      tag: 'input',
      css: ['control-input', css],
      placeholder: placeholder || '',
      type: type,
      callback: (): void => {
        if (this.createCarName)
          InputActions.sendInput(this.createCarName, createdCar);
      },
    });
  }

  public createButton(
    text: string,
    css: string,
    callback: () => void,
  ): ButtonsCreator {
    return new ButtonsCreator({
      tag: 'button',
      css: ['button', css],
      text: text,
      callback: callback,
    });
  }

  public initCreateContainer(): void {
    this.createContainer = new ViewCreator({
      tag: 'div',
      css: ['create-container'],
    });
    this.addInnerElement(this.createContainer);
    this.createCarName = this.createInput(
      'text',
      Styles.Name,
      Placeholders.Name,
    );
    this.createContainer.addInnerElement(this.createCarName);
    this.createCarColor = this.createInput('color', Styles.Color);
    this.createContainer.addInnerElement(this.createCarColor);
    this.createCarButton = this.createButton(
      ButtonText.Create,
      Styles.Create,
      (): void => {
        createCarActions.createCar(createdCar);
      },
    );
    this.createContainer.addInnerElement(this.createCarButton);
  }

  public initUpdateContainer(): void {
    this.updateContainer = new ViewCreator({
      tag: 'div',
      css: ['create-container'],
    });
    this.addInnerElement(this.updateContainer);
    this.updateCarName = this.createCarColor = this.createInput(
      'text',
      Styles.Name,
      Placeholders.NewName,
    );
    domElements.updateCarName = this.updateCarName;
    this.updateContainer.addInnerElement(this.updateCarName);
    this.updateCarColor = this.createInput('color', Styles.Color);
    this.updateContainer.addInnerElement(this.updateCarColor);
    domElements.updateCarColor = this.updateCarColor;
    this.updateCarButton = this.createButton(
      ButtonText.Update,
      Styles.Create,
      (): void => {
        if (updatedId.id) createCarActions.updateCar(updatedId.id, updatedCar);
      },
    );
    this.updateContainer.addInnerElement(this.updateCarButton);
  }

  public initRaceContainer(): void {
    this.raceContainer = new ViewCreator({
      tag: 'div',
      css: ['race-container'],
    });
    domElements.raceContainer = this.raceContainer;
    this.addInnerElement(this.raceContainer);
    this.raceButton = this.createButton(
      ButtonText.Race,
      Styles.Race,
      (): void => {
        void RaceControlActions.race(this);
      },
    );
    this.raceContainer.addInnerElement(this.raceButton);
    this.resetButton = this.createButton(
      ButtonText.Reset,
      Styles.Race,
      (): void => {
        RaceControlActions.reset(this);
      },
    );
    if (this.resetButton instanceof HTMLButtonElement)
      this.resetButton.disabled = true;
    this.raceContainer.addInnerElement(this.resetButton);
    this.generateCarsButton = this.createButton(
      ButtonText.Generate,
      Styles.Race,
      (): void => {
        void RaceControlActions.generateCars(this);
      },
    );
    this.raceContainer.addInnerElement(this.generateCarsButton);
  }
}
