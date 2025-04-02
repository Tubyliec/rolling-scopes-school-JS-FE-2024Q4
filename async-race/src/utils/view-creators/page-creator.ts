import type { ElementOptions } from '../../models/interfaces/element-options.interface';
import type { IsHTMLElement } from '../../models/types/is-html-element.type';
import { HTMLElementCreator } from './html-element-creator';
import { ViewCreator } from './view-creator';

export class PageCreator extends HTMLElementCreator {
  public header: IsHTMLElement;
  constructor(options: ElementOptions) {
    super(options);
    this.header = undefined;
  }

  public addHeader(parent: IsHTMLElement, options: ElementOptions): void {
    this.header = new ViewCreator({
      tag: options.tag,
      css: options.css,
      text: options.text,
    }).getElement();
    if (parent) {
      parent.append(this.header);
    }
  }
}
