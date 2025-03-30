import type { IsHTMLElement } from '../models/types/is-html-element.type';
import type { RenderOptions } from '../models/types/render-options.type';
import { GarageView } from './pages/garage/garage-view';
import { WinnersView } from './pages/winners/winners-wiev';

export class App {
  private container: HTMLElement;
  private garage: GarageView | undefined;
  private winners: WinnersView | undefined;
  private currentPage: IsHTMLElement;

  constructor() {
    this.container = document.body;
    this.garage = undefined;
    this.winners = undefined;
    this.currentPage = undefined;
    this.init();
    this.renderApp('garage');
  }

  private init(): void {
    this.garage = new GarageView({ tag: 'section' });
    this.winners = new WinnersView({ tag: 'section' });
  }

  private renderApp(pageName: RenderOptions): void {
    if (pageName === 'garage') {
      this.currentPage = this.garage?.getElement();
    } else if (pageName === 'winners') {
      this.currentPage = this.winners?.getElement();
    }

    if (this.currentPage) {
      this.container.append(this.currentPage);
    }
  }
}
