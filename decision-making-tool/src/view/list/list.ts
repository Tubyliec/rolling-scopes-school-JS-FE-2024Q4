import { Tags } from '../../models/enums/tags.enum';
import type { CreateOptions } from '../../models/interfaces/create-options.interface';
import type { ListOptions } from '../../models/interfaces/list-options.interface';
import type { IsHtmlElement } from '../../models/types/is-html-element.type';
import { ButtonsActions } from '../../utils/buttons-actions/buttons-actions';
import { OptionFieldCreator } from '../../utils/option-creator/option-field-creator';
import { StorageActions } from '../../utils/storage-actions/storage-actions';
import { ViewCreator } from '../view-creator';
import { optionsArray } from '../../data/options';
import './list.scss';

const cssClasses: string[] = ['list'];

export class List extends ViewCreator {
  public element: IsHtmlElement;
  constructor() {
    const options: CreateOptions = {
      tag: Tags.UL,
      classes: cssClasses,
    };
    super(options);
    this.element = this.createElementView(options).getHtmlElement();
    this.createOptionsList(options);
  }

  public static createOption(
    options: CreateOptions,
    optionOptions: ListOptions,
    index: number,
  ): IsHtmlElement {
    const optionItem = new OptionFieldCreator(
      options,
      optionOptions,
      index,
    ).getHtmlElement();
    return optionItem;
  }

  public createOptionsList(options: CreateOptions): void {
    const importedArray: ListOptions[] =
      StorageActions.loadFromStorage('optionsArray');
    optionsArray.length = 0;
    for (const option of importedArray) {
      optionsArray.push(option);
    }
    const optionsItems: ListOptions[] = optionsArray;
    console.log(importedArray);
    if (optionsArray.length > 0) {
      for (const optionsItem of optionsItems) {
        if (Object.keys(optionsItem).length > 0) {
          const optionOptions: ListOptions = {
            id: `#${optionsItems.indexOf(optionsItem) + 1}`,
            title: optionsItem.title,
            weight: optionsItem.weight,
          };
          const optionElement: IsHtmlElement = List.createOption(
            options,
            optionOptions,
            optionsItems.indexOf(optionsItem),
          );
          const ulElement: IsHtmlElement = this.element;

          if (ulElement && optionElement) {
            ulElement.append(optionElement);
          }
        }
      }
    } else {
      ButtonsActions.addOption(this.element);
    }
  }
}
