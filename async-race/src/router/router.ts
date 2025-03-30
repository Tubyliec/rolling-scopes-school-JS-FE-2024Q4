import { TypeCheckers } from '../utils/accessory-utils/type-checkers';
import type { App } from '../view/app';

export class router {
  private hash: string | undefined;

  constructor(app: App) {
    this.hash = undefined;
    this.enableRouter(app);
  }

  public setHash(pageName: string): void {
    this.hash = pageName;
    globalThis.location.href = `#${pageName}`;
  }

  private enableRouter(app: App): void {
    globalThis.addEventListener('hashchange', () => {
      this.hash = globalThis.location.hash.slice(1);
      if (TypeCheckers.isPageName(this.hash)) {
        app.renderApp(this.hash);
      } else {
        console.log('Page not found');
      }
    });
  }
}
