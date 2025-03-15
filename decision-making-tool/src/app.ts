import { IsHtmlElement } from './models/types/is-html-element.type';
import { MainView } from './view/main/main';
import { Name } from './view/name/name';

export class App {
  constructor() {
    this.createAppView();
  }

  createAppView(): void {
    const main: IsHtmlElement = new MainView().getElement();
    if (main) {
      document.body.append(main);
    }
  }
}
