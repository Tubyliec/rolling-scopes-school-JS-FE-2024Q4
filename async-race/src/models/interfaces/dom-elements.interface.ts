import type { CarControlPanel } from '../../components/car-control-panel/car-control-panel';
import type { GarageContainer } from '../../components/garage-container/garage-container';
import type { ButtonsCreator } from '../../utils/view-creators/buttons-creator';
import type { InputCreator } from '../../utils/view-creators/input-creator';
import type { ViewCreator } from '../../utils/view-creators/view-creator';
import type { GarageView } from '../../view/pages/garage/garage-view';
import type { WinnersView } from '../../view/pages/winners/winners-wiev';

export interface DomElements {
  garageView: GarageView | null;
  winnersView: WinnersView | null;
  garageContainer: GarageContainer | null;
  prevButton: ButtonsCreator | null;
  nextButton: ButtonsCreator | null;
  carControlPanel: CarControlPanel | null;
  updateCarName: InputCreator | null;
  updateCarColor: InputCreator | null;
  raceContainer: ViewCreator | null;
  winnerText: ViewCreator | null;
}
