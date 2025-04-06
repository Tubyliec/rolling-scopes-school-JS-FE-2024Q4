import type { CarControlPanel } from '../../components/car-control-panel/car-control-panel';
import type { GarageContainer } from '../../components/garage-container/garage-container';
import type { ButtonsCreator } from '../../utils/view-creators/buttons-creator';
import type { InputCreator } from '../../utils/view-creators/input-creator';
import type { GarageView } from '../../view/pages/garage/garage-view';

export interface DomElements {
  garageView: GarageView | undefined;
  garageContainer: GarageContainer | undefined;
  prevButton: ButtonsCreator | undefined;
  nextButton: ButtonsCreator | undefined;
  carControlPanel: CarControlPanel | undefined;
  updateCarName: InputCreator | undefined;
  updateCarColor: InputCreator | undefined;
}
