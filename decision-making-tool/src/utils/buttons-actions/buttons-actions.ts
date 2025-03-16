import { optionsArray } from '../../data/options';
import type { CreateOptions } from '../../models/interfaces/create-options.interface';
import type { ListOptions } from '../../models/interfaces/list-options.interface';
import type { IsHtmlElement } from '../../models/types/is-html-element.type';
import { OptionFieldCreator } from '../option-creator/option-field-creator';

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
  }

  public static deleteOption(
    index: number,
    currentElement: IsHtmlElement,
  ): void {
    optionsArray[index] = {};
    currentElement?.remove();
  }

  public static clearList(element: IsHtmlElement): void {
    if (element) {
      while (element.firstChild) {
        element.firstChild?.remove();
      }
    }
    optionsArray.length = 0;
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
}
