import { GarageView } from './pages/garage/garage-view';

export class App {
  private container: HTMLElement;
  private garage: GarageView | undefined;

  constructor() {
    this.container = document.body;
    this.garage = undefined;
    this.init();
    this.addInnerElements();
  }

  private init(): void {
    this.garage = new GarageView({ tag: 'section' });
  }

  private addInnerElements(): void {
    const garage = this.garage?.getElement();
    if (garage) {
      this.container.append(garage);
    }
  }
}
