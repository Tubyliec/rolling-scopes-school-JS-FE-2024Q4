import { optionsArray } from '../../data/options';
import { StorageActions } from '../storage-actions/storage-actions';

export abstract class InputActions {
  public static saveValue(index: number, role: string): void {
    if (event && event.target instanceof HTMLInputElement) {
      if (role === 'primary') {
        optionsArray[index].title = event.target.value;
      } else if (role === 'secondary') {
        optionsArray[index].weight = event.target.value;
      }
    }
    StorageActions.saveFaleToStorage(optionsArray);
  }
}
