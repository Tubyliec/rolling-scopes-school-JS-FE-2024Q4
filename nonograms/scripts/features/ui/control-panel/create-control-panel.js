import { domElements } from '../../../core/states/dom-elements';
import { createElement } from '../../../shared/utils/elements/create-element';

export function createControlPanel() {
  domElements.controlPanel = createElement({
    tag: 'section',
    parent: domElements.mainWrapper,
    classes: ['control-panel'],
  });
}