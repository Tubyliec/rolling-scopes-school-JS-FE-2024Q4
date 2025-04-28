import { Tags } from '../../models/enums/tags.enum';
import type { CreateOptions } from '../../models/interfaces/create-options.interface';
import { AdditionalUtilities } from '../additional-utils/additional-utilities';
import { ButtonCreator } from '../buttons-creator/buttons-creator';
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

  public backdropClose(): void {
    if (this.element) {
      this.element.addEventListener('click', (event) => {
        if (this.element instanceof HTMLDialogElement) {
          const backdropArea: DOMRect = this.element.getBoundingClientRect();
          const clickedInBackdrop: boolean =
            event.clientX >= backdropArea.left &&
            event.clientX <= backdropArea.right &&
            event.clientY >= backdropArea.top &&
            event.clientY <= backdropArea.bottom;

          if (!clickedInBackdrop) {
            this.element.close();
            this.element.remove();
          }
        }
      });
      this.element.addEventListener('keydown', (event) => {
        if (
          this.element instanceof HTMLDialogElement &&
          event.key === 'Escape'
        ) {
          this.element.close();
          this.element.remove();
          event.stopPropagation();
        }
      });
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
    const buttonClasses: string[] = ['button', 'dialog__button'];
    const button: ButtonCreator = new ButtonCreator(
      buttonClasses,
      'Close',
      () => this.closeDialog(),
    );
    if (this.element && text.element && button.element) {
      this.element.append(text.element);
      this.element.append(button.element);
    }
  }

  public createPasteDialog(): void {
    AdditionalUtilities.clearElement(this.element);
    const textArea: TextAreaCreator = new TextAreaCreator(() =>
      InputActions.saveAreaValue(),
    );
    if (this.element && textArea.element) {
      this.element.append(textArea.element);
    }
    const buttonClasses: string[] = ['button', 'paste__button'];
    const cancelButton: ButtonCreator = new ButtonCreator(
      buttonClasses,
      'Cancel',
      () => this.closeDialog(),
    );

    if (this.element && cancelButton.element) {
      this.element.append(cancelButton.element);
    }
  }

  public closeDialog(): void {
    if (this.element instanceof HTMLDialogElement) {
      this.element.close();
      this.element.remove();
    }
  }
}
