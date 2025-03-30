export class App {
  private container: HTMLElement;

  constructor() {
    this.container = document.body;
    this.init();
  }

  private init(): void {
    this.container.textContent = 'spa';
  }
}
