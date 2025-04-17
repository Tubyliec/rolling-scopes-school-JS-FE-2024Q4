import type { Attribute } from '../../models/interfaces/attribute.interface';
import type { ElementOptions } from '../../models/interfaces/element-options.interface';

export class BaseElementCreator {
  public element;

  constructor(options: ElementOptions) {
    this.element = this.createElement(options.tag);
    if (options.css) this.setCssClasses(options.css);
    if (options.id) this.setId(options.id);
    if (options.text) this.setTextContent(options.text);
    if (options.attribute) this.setAttribute(options.attribute);
  }

  public createElement<K extends keyof HTMLElementTagNameMap>(
    tag: K,
  ): HTMLElementTagNameMap[K] {
    return document.createElement(tag);
  }

  public removeElement(): void {
    this.element.remove();
  }

  public getElement(): HTMLElement {
    if (!this.element) {
      throw new Error('Element not created');
    }
    return this.element;
  }

  public setCssClasses(cssClasses: string[]): void {
    for (const cssClass of cssClasses) {
      if (this.element) {
        this.element.classList.add(cssClass);
      }
    }
  }

  public setTextContent(text = ''): void {
    if (this.element) {
      this.element.textContent = text;
    }
  }

  public getTextContent(): string {
    if (!this.element.textContent) {
      throw new Error('Text content is missing');
    }
    return this.element.textContent;
  }

  public setId(id: number): void {
    if (this.element) {
      this.element.id = id.toString();
    }
  }

  public setAttribute(attribute: Attribute): void {
    if (attribute) {
      this.element.setAttribute(attribute.name, attribute.value);
    }
  }

  public addInnerElement(element: HTMLElement | BaseElementCreator): void {
    if (this.element && element instanceof BaseElementCreator) {
      this.element.append(element.getElement());
    } else if (this.element && element instanceof HTMLElement) {
      this.element.append(element);
    }
  }
}
