import { optionsArray } from '../../data/options';

export abstract class InputActions {
  public static saveValue(index: number, role: string): void {
    if (event && event.target instanceof HTMLInputElement) {
      if (role === 'primary') {
        optionsArray[index].title = event.target.value;
      } else if (role === 'secondary') {
        optionsArray[index].weight = event.target.value;
      }
    }
  }
}
