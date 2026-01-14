import { domElements } from '../../../core/states/dom-elements';
import { createElement } from '../../../shared/utils/elements/create-element';

export function createModalWindow() {
  domElements.modalWindow = createElement({
    tag: 'dialog',
    parent: domElements.bodyWrapper,
    classes: ['modal'],
  });
}