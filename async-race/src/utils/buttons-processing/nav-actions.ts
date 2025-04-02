import { app } from '../..';
import type { PageName } from '../../models/types/render-options.type';

export abstract class NavActions {
  public static navigateToPage(pageName: PageName): void {
    app.renderApp(pageName);
  }
}
