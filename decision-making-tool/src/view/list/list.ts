import { optionsArray } from '../../data/options';
import type { CreateOptions } from '../../models/interfaces/create-options.interface';
import type { ListOptions } from '../../models/interfaces/list-options.interface';
import type { IsHtmlElement } from '../../models/types/is-html-element.type';
import { OptionCreator } from '../../utils/input-creator/option-field-creator';
import { ViewCreator } from '../view-creator';
import './list.scss';

const cssClasses: string[] = ['list'];

export class List extends ViewCreator {
  public element: IsHtmlElement;
  constructor() {
    const options: CreateOptions = {
      tag: 'ul',
      classes: [...cssClasses],
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
    const optionItem = new OptionCreator(
      options,
      optionOptions,
      index,
    ).getHtmlElement();
    return optionItem;
  }

  public createOptionsList(options: CreateOptions): void {
    const optionsItems: ListOptions[] = optionsArray;
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
  }
}
