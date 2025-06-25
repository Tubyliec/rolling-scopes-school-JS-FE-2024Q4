import type { ElementOptions } from '../../models/interfaces/element-options.interface';
import { Api } from '../../services/api';
import { ViewUtilities } from '../../utils/accessory-utils/view-utilities';
import { HTMLElementCreator } from '../../utils/view-creators/html-element-creator';
import { ViewCreator } from '../../utils/view-creators/view-creator';
import { WinnersHeader } from '../../utils/view-creators/winners-header';
import { WinnersRow } from '../../utils/view-creators/winners-row';
import { Winners } from '../../models/interfaces/winners.interface';

export class WinnersContainer extends HTMLElementCreator {
  public winnersHeader: WinnersHeader | undefined;
  public winnersTable: ViewCreator | undefined;
  public pageNumber = 1;
  public winnersCount = 0;

  constructor(options: ElementOptions) {
    super(options);
    void this.addWinners();
  }

  public init(): void {
    this.addWinnersCount();
    this.addPageNumber();
    this.winnersHeader = new WinnersHeader({
      tag: 'li',
      css: ['winners-header'],
    });
    this.addInnerElement(this.winnersHeader);
    this.winnersTable = new ViewCreator({
      tag: 'div',
      css: ['winners-table'],
    });
    this.addInnerElement(this.winnersTable);
  }

  public addPageNumber(): void {
    const pageNumberElement = document.createElement('h2');
    pageNumberElement.classList.add('page-number');
    pageNumberElement.textContent = `Page #${this.pageNumber}`;
    this.addInnerElement(pageNumberElement);
  }

  public addWinnersCount(): void {
    const winnersCountElement = document.createElement('h2');
    winnersCountElement.classList.add('page-header');
    winnersCountElement.textContent = `Winners (${this.winnersCount})`;
    this.addInnerElement(winnersCountElement);
  }

  public async addWinners(): Promise<void> {
    try {
      const item: Winners = await Api.getWinners({ page: 1 });
      ViewUtilities.clearElement(this.element);
      this.winnersCount = Number(item.count);
      this.init();
      for (let index = 0; index < item.winners.length; index += 1) {
        const Car = await Api.getCar(item.winners[index].id.toString());
        const row = new WinnersRow({
          winner: item.winners[index],
          winnerData: Car,
          WinnerNumber: index + 1,
        });
        this.winnersTable?.addInnerElement(row);
      }
    } catch (error) {
      throw error;
    }
  }
}
