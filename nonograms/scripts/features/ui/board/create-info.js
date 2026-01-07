import { removeAllChildren } from '../../../shared/utils/elements/remove-all-children';
import { createElement } from '../../../shared/utils/elements/create-element';

export function createInfo(array, parentElement, elementClass) {
  let counter = 0;
  removeAllChildren(parentElement);

  array.forEach((element) => {
    counter += 1;
    const tempClass = `${elementClass}-${counter}`;
    const newItem = createElement({
      tag: 'div',
      parent: parentElement,
      classes: [elementClass, tempClass],
    });

    element.forEach((item) => {
      createElement({
        tag: 'div',
        parent: newItem,
        text: item,
        classes: ['info-nums'],
      });
    });
  });
}
