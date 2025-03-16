import type { IsHtmlElement } from '../../models/types/is-html-element.type';

export abstract class ButtonsActions {
  public static clearList(element: IsHtmlElement): void {
    if (element) {
      while (element.firstChild) {
        element.firstChild?.remove();
      }
    }
  }
}
