import { CreateOptions } from '../models/interfaces/create-options.interface';
import { IsHtmlElement } from '../models/interfaces/types/is-html-element.type';
import { HtmlElementCreator } from '../utils/html-element-creator';

export class ViewCreator {
  elementViewCreator: HtmlElementCreator;
  constructor(options: CreateOptions) {
    this.elementViewCreator = this.createElementView(options);
  }

  getElement(): IsHtmlElement {
    return this.elementViewCreator.getHtmlElement();
  }

  createElementView(options: CreateOptions) {
    const elementOptions: CreateOptions = {
      tag: options.tag,
      classes: options.classes,
    };
    this.elementViewCreator = new HtmlElementCreator(elementOptions);
    return this.elementViewCreator;
  }
}
