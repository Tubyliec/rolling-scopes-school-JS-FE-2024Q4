import { CreateOptions } from '../../models/interfaces/create-options.interface';
import { IsHtmlElement } from '../../models/types/is-html-element.type';
import { ButtonCreator } from '../../utils/buttons-creator/buttons-creator';
import { Name } from '../name/name';
import { ViewCreator } from '../view-creator';
import './main.scss';

const scssClasses = ['main-section'];

export class MainView extends ViewCreator {
  element: IsHtmlElement;
  nameElement: IsHtmlElement;
  addButton: IsHtmlElement;
  pastButton: IsHtmlElement;
  clearButton: IsHtmlElement;
  saveButton: IsHtmlElement;
  loadButton: IsHtmlElement;
  startButton: IsHtmlElement;

  constructor() {
    const options: CreateOptions = {
      tag: 'main',
      classes: [...scssClasses],
    };
    super(options);
    this.createElementView(options);
    this.nameElement = new Name().getElement();
    this.element = this.elementViewCreator.getHtmlElement();
    this.addButton = new ButtonCreator(options, 'Add option').getHtmlElement();
    this.pastButton = new ButtonCreator(options, 'Past list').getHtmlElement();
    this.clearButton = new ButtonCreator(
      options,
      'Clear list',
    ).getHtmlElement();
    this.saveButton = new ButtonCreator(
      options,
      'Save list to file',
    ).getHtmlElement();
    this.loadButton = new ButtonCreator(
      options,
      'Load list from file',
    ).getHtmlElement();
    this.startButton = new ButtonCreator(options, 'Start').getHtmlElement();
    this.elementViewCreator.appendElement(this.nameElement);
    this.elementViewCreator.appendElement(this.addButton);
    this.elementViewCreator.appendElement(this.pastButton);
    this.elementViewCreator.appendElement(this.clearButton);
    this.elementViewCreator.appendElement(this.saveButton);
    this.elementViewCreator.appendElement(this.loadButton);
    this.elementViewCreator.appendElement(this.startButton);
  }
}
