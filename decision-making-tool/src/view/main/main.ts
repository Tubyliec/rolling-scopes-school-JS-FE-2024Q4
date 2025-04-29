import { optionsArray } from '../../data/options';
import { Tags } from '../../models/enums/tags.enum';
import type { CreateOptions } from '../../models/interfaces/create-options.interface';
import type { ListOptions } from '../../models/interfaces/list-options.interface';
import type { IsHtmlElement } from '../../models/types/is-html-element.type';
import { AdditionalUtilities } from '../../utils/additional-utils/additional-utilities';
import { ButtonsActions } from '../../utils/buttons-actions/buttons-actions';
import { ButtonCreator } from '../../utils/buttons-creator/buttons-creator';
import { StorageActions } from '../../utils/storage-actions/storage-actions';
import { CanvasCreator } from '../canvas/canvas-creator';
import { PastDialogCreator } from '../dialogs/past-dialog-creator';
import { WarningDialogCreator } from '../dialogs/warning-dialog-creator';
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
  public dialog: IsHtmlElement;
  public pasteDialog: IsHtmlElement;
  public usefulOptionsCount: number = 0;
  public nullCount: number = 0;
  public startPickerButton: IsHtmlElement;

  constructor() {
    const options: CreateOptions = {
      tag: Tags.MAIN,
      classes: cssClasses,
    };
    super(options);
    this.createElementView(options);
    this.nameElement = new Name().getElement();
    this.list = new List().getElement();
    this.addButtons();
    this.appendMainItems();
  }

  public addButtons(): void {
    const mainButtonClasses: string[] = ['button', 'main__button'];
    const pickerButtonClasses: string[] = ['button', 'picker__button'];
    this.addButton = new ButtonCreator(mainButtonClasses, 'Add option', () =>
      ButtonsActions.addOption(this.list),
    ).getHtmlElement();
    this.pastButton = new ButtonCreator(mainButtonClasses, 'Past list', () =>
      this.pasteDialogCreator(),
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
      async () => {
        await this.loadDataFromJson();
      },
    ).getHtmlElement();
    this.startButton = new ButtonCreator(mainButtonClasses, 'Start', () =>
      this.NavigateToPicker(this.getElement()),
    ).getHtmlElement();
    this.backButton = new ButtonCreator(pickerButtonClasses, 'Back', () =>
      this.NavigateToMain(this.getElement()),
    ).getHtmlElement();
    this.startPickerButton = new ButtonCreator(
      pickerButtonClasses,
      'Start',
    ).getHtmlElement();
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
    this.canvas = new CanvasCreator(400, 400).getHtmlElement();
    this.elementViewCreator.appendElement([
      this.nameElement,
      this.backButton,
      this.startPickerButton,
      this.canvas,
    ]);
  }

  public NavigateToPicker(element: IsHtmlElement): void {
    const items: ListOptions[] = [...optionsArray].filter(function (element) {
      return Object.keys(element).length > 0;
    });
    for (const item of items) {
      if (item.weight || item.title) {
        this.usefulOptionsCount += 1;
        if (Number(item.weight) <= 0) {
          this.nullCount += 1;
        }
      }
    }
    if (
      this.usefulOptionsCount < 2 ||
      this.usefulOptionsCount - this.nullCount < 2
    ) {
      this.dialog = new WarningDialogCreator().getHtmlElement();
      if (this.dialog && this.dialog instanceof HTMLDialogElement) {
        document.body.append(this.dialog);
        this.dialog.showModal();
      }
      this.usefulOptionsCount = 0;
      this.nullCount = 0;
    } else {
      AdditionalUtilities.clearElement(element);
      this.appendPickerItems();
      this.usefulOptionsCount = 0;
    }
  }

  public NavigateToMain(element: IsHtmlElement): void {
    AdditionalUtilities.clearElement(element);
    this.appendMainItems();
  }

  public async loadDataFromJson(): Promise<void> {
    try {
      const loadedOptions: ListOptions[] = await ButtonsActions.loadFile();
      optionsArray.length = 0;
      for (const option of loadedOptions) {
        optionsArray.push(option);
      }
      StorageActions.saveFileToStorage(optionsArray);
      if (this.list) {
        this.list = new List().getElement();
        if (this.list && this.getElement()) {
          AdditionalUtilities.clearElement(this.getElement());
          this.appendMainItems();
        }
      }
    } catch (error) {
      console.error(error);
    }
  }

  public pasteDialogCreator(): void {
    this.pasteDialog = new PastDialogCreator().getHtmlElement();
    if (this.pasteDialog && this.pasteDialog instanceof HTMLDialogElement) {
      document.body.append(this.pasteDialog);
      this.pasteDialog.showModal();
      this.pasteDialog.classList.add('dialog__paste');
      const buttonClasses: string[] = ['button', 'paste__button'];
      const confirmButton: IsHtmlElement = new ButtonCreator(
        buttonClasses,
        'Confirm',
        () => this.pasteText(),
      ).getHtmlElement();
      if (confirmButton) {
        this.pasteDialog.append(confirmButton);
      }
    }
  }

  public pasteText(): void {
    ButtonsActions.parseStringToArrays();
    StorageActions.saveFileToStorage(optionsArray);
    if (this.list) {
      this.list = new List().getElement();
      if (this.list && this.getElement()) {
        AdditionalUtilities.clearElement(this.getElement());
        this.appendMainItems();
      }
    }
    if (this.pasteDialog instanceof HTMLDialogElement) {
      this.pasteDialog.close();
      this.pasteDialog.remove();
    }
  }
}
