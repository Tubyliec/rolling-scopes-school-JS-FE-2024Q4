import { IsHtmlElement } from './models/interfaces/types/is-html-element.type';
import { mainView } from './view/main/main';

export class App {
  constructor() {
    this.createAppView();
  }

  createAppView(): void {
    const main: IsHtmlElement = new mainView().getElement();
    if (main) {
      document.body.append(main);
    }
  }
}
