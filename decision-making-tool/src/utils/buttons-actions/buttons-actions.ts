import type { CreateOptions } from '../../models/interfaces/create-options.interface';
import type { ListOptions } from '../../models/interfaces/list-options.interface';
import type { IsFile } from '../../models/types/is-file.type';
import type { IsHtmlElement } from '../../models/types/is-html-element.type';
import { PastDialogCreator } from '../../view/dialogs/past-dialog-creator';
import { AdditionalUtilities } from '../additional-utils/additional-utilities';
import { OptionFieldCreator } from '../option-creator/option-field-creator';
import { StorageActions } from '../storage-actions/storage-actions';
import {
  objectsArray,
  optionsArray,
  parsedValue,
  textAreaValue,
} from '../../data/options';

export abstract class ButtonsActions {
  public static addOption(parentElement: IsHtmlElement): void {
    const cssClasses: string[] = ['option'];
    const optionsItems: ListOptions[] = optionsArray;
    const index: number = optionsItems.length;
    const newItem: ListOptions = {
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
    const newOption: IsHtmlElement = new OptionFieldCreator(
      options,
      optionOptions,
      index,
    ).getHtmlElement();
    if (newOption) {
      parentElement?.append(newOption);
    }
    StorageActions.saveFileToStorage(optionsArray);
  }

  public static deleteOption(
    index: number,
    currentElement: IsHtmlElement,
  ): void {
    optionsArray[index] = {};
    currentElement?.remove();
    StorageActions.saveFileToStorage(optionsArray);
  }

  public static clearList(element: IsHtmlElement): void {
    AdditionalUtilities.clearElement(element);
    optionsArray.length = 0;
    StorageActions.saveFileToStorage(optionsArray);
  }

  public static saveToFile(fileName: string = 'options.json'): void {
    const fileInJson: string = JSON.stringify(optionsArray);
    const blob: Blob = new Blob([fileInJson], { type: 'application/json' });
    const fakeUrl: string = URL.createObjectURL(blob);
    const fakeLink: HTMLAnchorElement = document.createElement('a');
    fakeLink.href = fakeUrl;
    fakeLink.download = fileName;
    document.body.append(fakeLink);
    fakeLink.click();
    fakeLink.remove();
    URL.revokeObjectURL(fakeUrl);
  }

  public static pasteList(): void {
    const pasteDialog: IsHtmlElement = new PastDialogCreator().getHtmlElement();
    if (pasteDialog && pasteDialog instanceof HTMLDialogElement) {
      document.body.append(pasteDialog);
      pasteDialog.showModal();
      pasteDialog.classList.add('dialog__paste');
    }
  }

  public static async loadFile(): Promise<ListOptions[]> {
    return new Promise((resolve, reject) => {
      const fakeInput: HTMLInputElement = document.createElement('input');
      fakeInput.type = 'file';
      fakeInput.accept = '.json';

      fakeInput.addEventListener('change', () => {
        const file: IsFile = fakeInput.files?.[0];

        if (!file) {
          return;
        }

        file
          .text()
          .then((fileContent) => {
            try {
              const dataFromJson: ListOptions[] = JSON.parse(
                fileContent,
              ) as ListOptions[];
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
    });
  }

  public static parseStringToArrays(): void {
    objectsArray.length = 0;
    if (textAreaValue[0]) {
      parsedValue.length = 0;
      const lines: string[] = textAreaValue[0].trim().split('\n');
      for (const line of lines) {
        const values: string[] = line.split(',').map((value) => value.trim());
        parsedValue.push(values);
      }
      for (
        let valueIndex: number = 0;
        valueIndex <= parsedValue.length;
        valueIndex += 1
      ) {
        const optionId: number = valueIndex + 1 + optionsArray.length;
        const value: string[] = parsedValue[valueIndex];
        if (value) {
          const newObject: ListOptions = {
            id: `#${optionId}`,
            title: value[0],
            weight: value[1],
          };
          objectsArray.push(newObject);
        }
      }
    }
    optionsArray.push(...objectsArray);
  }
}
