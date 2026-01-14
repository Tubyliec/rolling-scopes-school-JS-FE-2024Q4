import { domElements } from '../../../core/states/dom-elements';
import { createElement } from '../../../shared/utils/elements/create-element';

export function createMainElement() {
  domElements.mainPanel = createElement({
    tag: 'main',
    parent: domElements.bodyWrapper,
    classes: ['main-panel'],
  });
  domElements.mainWrapper = createElement({
    tag: 'div',
    parent: domElements.mainPanel,
    classes: ['main-wrapper'],
  });
}