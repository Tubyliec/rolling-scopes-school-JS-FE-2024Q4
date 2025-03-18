import type { CreateOptions } from '../../models/interfaces/create-options.interface';
import { HtmlElementCreator } from '../html-element-creator';
import './text-area.scss';

const cssClasses: string[] = ['text-area'];

export class TextAreaCreator extends HtmlElementCreator {
  constructor() {
    const options: CreateOptions = {
      tag: 'textarea',
      classes: [...cssClasses],
    };
    super(options);
    this.setPlaceholder('Paste a list of new options in a CSV-like format');
    this.setSize(15, 50);
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
}
