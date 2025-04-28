import { Tags } from '../../models/enums/tags.enum';
import type { CreateOptions } from '../../models/interfaces/create-options.interface';
import type { Size } from '../../models/interfaces/size.interface';
import type { EventInputFunction } from '../../models/types/event-input.type';
import { HtmlElementCreator } from '../html-element-creator';
import './text-area.scss';

const cssClasses: string[] = ['text-area'];

export class TextAreaCreator extends HtmlElementCreator {
  constructor(callback: EventInputFunction) {
    const options: CreateOptions = {
      tag: Tags.TEXTAREA,
      classes: [...cssClasses],
      placeholder: 'Paste a list of new options in a CSV-like format',
      fieldSize: { rows: 15, cols: 50 },
    };
    super(options);
    if (options.placeholder) this.setPlaceholder(options.placeholder);
    if (options.fieldSize) this.setSize(options.fieldSize);
    this.setCallback(callback);
  }

  public setPlaceholder(text: string): void {
    if (this.element && this.element instanceof HTMLTextAreaElement)
      this.element.placeholder = text;
  }

  public setSize(size: Size): void {
    if (this.element && this.element instanceof HTMLTextAreaElement) {
      this.element.rows = size.rows;
      this.element.cols = size.cols;
    }
  }

  public setCallback(callback: EventInputFunction): void {
    if (typeof callback === 'function' && this.element) {
      this.element.addEventListener('change', (event) => callback(event));
    }
  }
}
