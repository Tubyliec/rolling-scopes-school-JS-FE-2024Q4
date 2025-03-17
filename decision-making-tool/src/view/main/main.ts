import type { CreateOptions } from '../../models/interfaces/create-options.interface';
import type { IsHtmlElement } from '../../models/types/is-html-element.type';
import { ButtonsActions } from '../../utils/buttons-actions/buttons-actions';
import { ButtonCreator } from '../../utils/buttons-creator/buttons-creator';
import { CanvasCreator } from '../canvas/canvas-creator';
import { List } from '../list/list';
import { Name } from '../name/name';
import { ViewCreator } from '../view-creator';
import './main.scss';

const cssClasses: string[] = ['main-section'];

export class MainView extends ViewCreator {
  public list: IsHtmlElement;
  public nameElement: IsHtmlElement;
  public addButton: IsHtmlElement;
  public pastButton: IsHtmlElement;
  public clearButton: IsHtmlElement;
  public saveButton: IsHtmlElement;
  public loadButton: IsHtmlElement;
  public startButton: IsHtmlElement;
  public canvas: IsHtmlElement;
  public backButton: IsHtmlElement;

  constructor() {
    const options: CreateOptions = {
      tag: 'main',
      classes: [...cssClasses],
    };

    const mainButtonClasses: string[] = ['button', 'main__button'];
    const pickerButtonClasses: string[] = ['button', 'picker__button'];

    super(options);
    this.createElementView(options);
    this.nameElement = new Name().getElement();
    this.list = new List().getElement();
    this.addButton = new ButtonCreator(mainButtonClasses, 'Add option', () =>
      ButtonsActions.addOption(this.list),
    ).getHtmlElement();
    this.pastButton = new ButtonCreator(
      mainButtonClasses,
      'Past list',
    ).getHtmlElement();
    this.clearButton = new ButtonCreator(mainButtonClasses, 'Clear list', () =>
      ButtonsActions.clearList(this.list),
    ).getHtmlElement();
    this.saveButton = new ButtonCreator(
      mainButtonClasses,
      'Save list to file',
      () => ButtonsActions.saveToFile(),
    ).getHtmlElement();
    this.loadButton = new ButtonCreator(
      mainButtonClasses,
      'Load list from file',
    ).getHtmlElement();
    this.startButton = new ButtonCreator(mainButtonClasses, 'Start', () =>
      this.NavigateToPicker(this.getElement()),
    ).getHtmlElement();
    this.canvas = new CanvasCreator(400, 400).getHtmlElement();
    this.backButton = new ButtonCreator(pickerButtonClasses, 'Back', () =>
      this.NavigateToMain(this.getElement()),
    ).getHtmlElement();
    this.appendMainItems();
  }

  public appendMainItems(): void {
    this.elementViewCreator.appendElement([
      this.nameElement,
      this.list,
      this.addButton,
      this.pastButton,
      this.clearButton,
      this.saveButton,
      this.loadButton,
      this.startButton,
    ]);
  }

  public appendPickerItems(): void {
    this.elementViewCreator.appendElement([
      this.nameElement,
      this.backButton,
      this.canvas,
    ]);
  }

  public NavigateToPicker(element: IsHtmlElement): void {
    ButtonsActions.clearList(element);
    this.appendPickerItems();
  }

  public NavigateToMain(element: IsHtmlElement): void {
    ButtonsActions.clearList(element);
    this.appendMainItems();
  }
}
