import { Tags } from '../../models/enums/tags.enum';
import type { CreateOptions } from '../../models/interfaces/create-options.interface';
import { AdditionalUtilities } from '../additional-utils/additional-utilities';
import { createButton } from '../buttons-creator/buttons-factory';
import { HtmlElementCreator } from '../html-element-creator';
import { InputActions } from '../input-actions/input-actions';
import { TextAreaCreator } from '../text-area-creator.ts/text-area';
import './dialog.scss';

const cssClasses: string[] = ['dialog'];

export class DialogCreator extends HtmlElementCreator {
  constructor() {
    const options: CreateOptions = {
      tag: Tags.DIALOG,
      classes: [...cssClasses],
    };
    super(options);
    this.backdropClose();
  }

  public backdropClickHandler = (event: MouseEvent): void => {
    if (this.element) {
      const backdropArea: DOMRect = this.element.getBoundingClientRect();
      const clickedInBackdrop: boolean =
        event.clientX >= backdropArea.left &&
        event.clientX <= backdropArea.right &&
        event.clientY >= backdropArea.top &&
        event.clientY <= backdropArea.bottom;

      if (!clickedInBackdrop) {
        this.cleanElement();
      }
    }
  };

  public backdropEcsHandler = (event: KeyboardEvent): void => {
    if (event.key === 'Escape') {
      this.cleanElement();
    }
  };

  public cleanElement(): void {
    if (this.element instanceof HTMLDialogElement) {
      this.element.close();
      this.element.remove();
      this.element.removeEventListener('click', this.backdropClickHandler);
      this.element.removeEventListener('keydown', this.backdropEcsHandler);
    }
  }

  public backdropClose(): void {
    if (this.element) {
      this.element.addEventListener('click', this.backdropClickHandler);
      this.element.addEventListener('keydown', this.backdropEcsHandler);
    }
  }

  public createValidOptions(): void {
    AdditionalUtilities.clearElement(this.element);
    const cssClasses: string[] = ['dialog__text'];
    const textOptions: CreateOptions = {
      tag: Tags.P,
      classes: [...cssClasses],
    };
    const text: HtmlElementCreator = new HtmlElementCreator(textOptions);
    text.setText(
      'Please add at least 2 valid options. An option is considered valid if its title is not empty and its weight is greater than 0',
    );
    const button: HTMLButtonElement = createButton({
      text: 'Close',
      classNames: ['button', 'dialog__button'],
      clickHandler: () => this.closeDialog(),
    });
    this.appendElement([text.element, button]);
  }

  public createPasteDialog(): void {
    AdditionalUtilities.clearElement(this.element);
    const textArea: TextAreaCreator = new TextAreaCreator(() =>
      InputActions.saveAreaValue(),
    );
    if (this.element && textArea.element) {
      this.element.append(textArea.element);
    }
    const button: HTMLButtonElement = createButton({
      text: 'Cancel',
      classNames: ['button', 'paste__button'],
      clickHandler: () => this.closeDialog(),
    });
    if (this.element) {
      this.element.append(button);
    }
  }

  public closeDialog(): void {
    this.cleanElement();
  }
}
