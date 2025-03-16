import { optionsArray } from '../../data/options';
import type { IsHtmlElement } from '../../models/types/is-html-element.type';

export abstract class ButtonsActions {
  public static deleteOption(
    index: number,
    currentElement: IsHtmlElement,
  ): void {
    optionsArray[index] = {};
    currentElement?.remove();
  }

  public static clearList(element: IsHtmlElement): void {
    if (element) {
      while (element.firstChild) {
        element.firstChild?.remove();
      }
    }
  }
}
