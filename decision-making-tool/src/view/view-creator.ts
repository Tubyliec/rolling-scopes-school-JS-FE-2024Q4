import type { CreateOptions } from '../models/interfaces/create-options.interface';
import type { IsHtmlElement } from '../models/types/is-html-element.type';
import { HtmlElementCreator } from '../utils/html-element-creator';

export class ViewCreator {
  public elementViewCreator: HtmlElementCreator;
  constructor(options: CreateOptions) {
    this.elementViewCreator = this.createElementView(options);
  }

  public getElement(): IsHtmlElement {
    return this.elementViewCreator.getHtmlElement();
  }

  public createElementView(options: CreateOptions): HtmlElementCreator {
    const elementOptions: CreateOptions = {
      tag: options.tag,
      classes: options.classes,
      text: options.text,
    };
    this.elementViewCreator = new HtmlElementCreator(elementOptions);
    return this.elementViewCreator;
  }
}
