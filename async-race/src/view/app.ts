import type { IsHTMLElement } from '../models/types/is-html-element.type';
import type { PageName } from '../models/types/render-options.type';
import { router } from '../router/router';
import { ViewUtilities } from '../utils/accessory-utils/view-utilities';
import { GarageView } from './pages/garage/garage-view';
import { WinnersView } from './pages/winners/winners-wiev';
import './app.scss';
import './pages/pages.scss';

export class App {
  private container: HTMLElement;
  private garage: GarageView | undefined;
  private winners: WinnersView | undefined;
  private currentPage: IsHTMLElement;
  private router: router;

  constructor() {
    this.container = document.body;
    this.garage = undefined;
    this.winners = undefined;
    this.currentPage = undefined;
    this.init();
    this.router = new router(this);
    this.renderApp('garage');
    // this.render();
  }

  public render(): void {
    if (this.garage) {
      this.container.append(this.garage.getElement());
    }
  }

  public renderApp(pageName: PageName): void {
    ViewUtilities.clearElement(this.container);

    if (pageName === 'garage') {
      this.currentPage = this.garage?.getElement();
    } else if (pageName === 'winners') {
      this.currentPage = this.winners?.getElement();
    }

    if (this.currentPage) {
      this.container.append(this.currentPage);
      this.router.setHash(pageName);
    }
  }

  private init(): void {
    this.garage = new GarageView({ tag: 'div', css: ['page', 'garage'] });
    this.winners = new WinnersView({ tag: 'div', css: ['page', 'winners'] });
  }
}
