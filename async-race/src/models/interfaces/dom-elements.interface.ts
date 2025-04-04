import type { GarageContainer } from '../../components/garage-container/garage-container';
import type { ButtonsCreator } from '../../utils/view-creators/buttons-creator';
import type { GarageView } from '../../view/pages/garage/garage-view';

export interface DomElements {
  garageView: GarageView | undefined;
  garageContainer: GarageContainer | undefined;
  prevButton: ButtonsCreator | undefined;
  nextButton: ButtonsCreator | undefined;
}
