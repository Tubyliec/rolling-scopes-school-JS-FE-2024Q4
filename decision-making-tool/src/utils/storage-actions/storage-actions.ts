import type { ListOptions } from '../../models/interfaces/list-options.interface';
import type { IsString } from '../../models/types/is-string.type';

export abstract class StorageActions {
  public static saveFaleToStorage(file: ListOptions[]): void {
    const savedFile: string = JSON.stringify(file);
    localStorage.setItem('optionsArray', savedFile);
  }

  public static loadFromStorage<T>(key: string): T[] {
    const importedArray: IsString = localStorage.getItem(key);
    return importedArray ? (JSON.parse(importedArray) as T[]) : [];
  }
}
