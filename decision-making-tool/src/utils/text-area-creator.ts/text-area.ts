import { Tags } from '../../models/enums/tags.enum';
import type { CreateOptions } from '../../models/interfaces/create-options.interface';
import type { EventInputFunction } from '../../models/types/event-input.type';
import { HtmlElementCreator } from '../html-element-creator';
import './text-area.scss';

const cssClasses: string[] = ['text-area'];

export class TextAreaCreator extends HtmlElementCreator {
  constructor(callback: EventInputFunction) {
    const options: CreateOptions = {
      tag: Tags.TEXTAREA,
      classes: [...cssClasses],
    };
    super(options);
    this.setPlaceholder('Paste a list of new options in a CSV-like format');
    this.setSize(15, 50);
    this.setCallback(callback);
  }

  public setPlaceholder(text: string): void {
    if (this.element && this.element instanceof HTMLTextAreaElement)
      this.element.placeholder = text;
  }

  public setSize(rows: number, cols: number): void {
    if (this.element && this.element instanceof HTMLTextAreaElement) {
      this.element.rows = rows;
      this.element.cols = cols;
    }
  }

  public setCallback(callback: EventInputFunction): void {
    if (typeof callback === 'function' && this.element) {
      this.element.addEventListener('change', (event) => callback(event));
    }
  }
}
