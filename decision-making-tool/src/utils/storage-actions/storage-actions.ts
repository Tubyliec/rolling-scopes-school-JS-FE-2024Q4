import type { ListOptions } from '../../models/interfaces/list-options.interface';

export abstract class StorageActions {
  public static saveFaleToStorage(file: ListOptions[]): void {
    const savedFile = JSON.stringify(file);
    localStorage.setItem('optionsArray', savedFile);
  }

  public static loadFromStorage<T>(key: string): T[] {
    const importedArray = localStorage.getItem(key);
    return importedArray ? (JSON.parse(importedArray) as T[]) : [];
  }
}
