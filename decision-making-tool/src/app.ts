import type { IsHtmlElement } from './models/types/is-html-element.type';
import { MainView } from './view/main/main';

export class App {
  constructor() {
    this.createAppView();
  }

  public createAppView(): void {
    const main: IsHtmlElement = new MainView().getElement();
    if (main) {
      document.body.append(main);
    }
  }
}
