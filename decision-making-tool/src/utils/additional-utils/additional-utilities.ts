import type { IsHtmlElement } from '../../models/types/is-html-element.type';

export abstract class AdditionalUtilities {
  public static getRandomColor(): string {
    const letters: string = '0123456789ABCDEF';
    let randomColor: string = '#';
    for (let index = 0; index < 6; index += 1) {
      randomColor += letters[Math.floor(Math.random() * 16)];
    }
    return randomColor;
  }

  public static degreesToRadians(deg: number): number {
    return deg * (Math.PI / 180);
  }

  public static clearElement(element: IsHtmlElement): void {
    if (element) {
      while (element.firstChild) {
        element.firstChild?.remove();
      }
    }
  }
}
