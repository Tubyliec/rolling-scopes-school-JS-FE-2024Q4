import {
  objectsArray,
  optionsArray,
  parsedValue,
  textAreaValue,
} from '../../data/options';
import type { CreateOptions } from '../../models/interfaces/create-options.interface';
import type { ListOptions } from '../../models/interfaces/list-options.interface';
import type { IsHtmlElement } from '../../models/types/is-html-element.type';
import { PastDialogCreator } from '../../view/dialogs/past-dialog-creator';
import { AdditionalUtilities } from '../additional-utils/additional-utilities';
import { OptionFieldCreator } from '../option-creator/option-field-creator';
import { StorageActions } from '../storage-actions/storage-actions';

export abstract class ButtonsActions {
  public static addOption(parentElement: IsHtmlElement): void {
    const cssClasses: string[] = ['option'];
    const optionsItems: ListOptions[] = optionsArray;
    const index = optionsItems.length;
    const newItem = {
      id: `#${index + 1}`,
    };
    optionsItems.push(newItem);
    const options: CreateOptions = {
      tag: 'li',
      classes: [...cssClasses],
    };
    const optionOptions: ListOptions = {
      id: newItem.id,
    };
    const newOption = new OptionFieldCreator(
      options,
      optionOptions,
      index,
    ).getHtmlElement();
    if (newOption) {
      parentElement?.append(newOption);
    }
    StorageActions.saveFaleToStorage(optionsArray);
  }

  public static deleteOption(
    index: number,
    currentElement: IsHtmlElement,
  ): void {
    optionsArray[index] = {};
    currentElement?.remove();
    StorageActions.saveFaleToStorage(optionsArray);
  }

  public static clearList(element: IsHtmlElement): void {
    AdditionalUtilities.clearElement(element);
    optionsArray.length = 0;
    StorageActions.saveFaleToStorage(optionsArray);
  }

  public static saveToFile(fileName: string = 'options.json'): void {
    const fileInJson = JSON.stringify(optionsArray);
    const blob = new Blob([fileInJson], { type: 'application/json' });
    const fakeUrl = URL.createObjectURL(blob);
    const fakeLink = document.createElement('a');
    fakeLink.href = fakeUrl;
    fakeLink.download = fileName;
    document.body.append(fakeLink);
    fakeLink.click();
    fakeLink.remove();
    URL.revokeObjectURL(fakeUrl);
  }

  public static pasteList(): void {
    const pasteDialog = new PastDialogCreator().getHtmlElement();
    if (pasteDialog && pasteDialog instanceof HTMLDialogElement) {
      document.body.append(pasteDialog);
      pasteDialog.showModal();
      pasteDialog.classList.add('dialog__paste');
    }
  }

  public static async loadFile(): Promise<ListOptions[]> {
    return new Promise((resolve, reject) => {
      const fakeInput = document.createElement('input');
      fakeInput.type = 'file';
      fakeInput.accept = '.json';

      fakeInput.addEventListener('change', () => {
        const file = fakeInput.files?.[0];

        if (!file) {
          return;
        }

        file
          .text()
          .then((fileContent) => {
            try {
              const dataFromJson = JSON.parse(fileContent) as ListOptions[];
              resolve(dataFromJson);
            } catch (error) {
              reject(new Error(String(error)));
            }
          })
          .catch((error) => {
            reject(new Error(String(error)));
          });
      });

      fakeInput.click();
      console.log();
    });
  }

  public static parseStringToArrays(): void {
    objectsArray.length = 0;
    if (textAreaValue[0]) {
      parsedValue.length = 0;
      const lines = textAreaValue[0].trim().split('\n');
      for (const line of lines) {
        const values = line.split(',').map((value) => value.trim());
        parsedValue.push(values);
      }
      for (
        let valueIndex = 0;
        valueIndex <= parsedValue.length;
        valueIndex += 1
      ) {
        const optionId: number = valueIndex + 1 + optionsArray.length;
        const value = parsedValue[valueIndex];
        if (value) {
          const newObject = {
            id: `#${optionId}`,
            title: value[0],
            weight: value[1],
          };
          objectsArray.push(newObject);
        }
      }
    }
    for (const object of objectsArray) {
      optionsArray.push(object);
    }
  }
}
