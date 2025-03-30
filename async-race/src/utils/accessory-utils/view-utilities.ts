import type { IsHTMLElement } from '../../models/types/is-html-element.type';

export abstract class ViewUtilities {
  public static clearElement(element: IsHTMLElement): void {
    if (element) {
      while (element.firstChild) {
        element.firstChild?.remove();
      }
    }
  }
}
