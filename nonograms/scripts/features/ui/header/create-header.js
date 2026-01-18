import { domElements } from '../../../core/states/dom-elements';
import { createElement } from '../../../shared/utils/elements/create-element';

export function createHeader() {
  domElements.header = createElement({
    tag: 'header',
    parent: domElements.bodyWrapper,
    classes: ['header'],
  });

  domElements.headerWrapper = createElement({
    tag: 'div',
    parent: domElements.header,
    classes: ['header-wrapper'],
  });

  domElements.name = createElement({
    tag: 'p',
    text: 'nonograms',
    parent: domElements.headerWrapper,
    classes: ['name'],
  });

  domElements.timer = createElement({
    tag: 'div',
    parent: domElements.headerWrapper,
    classes: ['timer'],
  });

  domElements.minutes = createElement({
    tag: 'span',
    parent: domElements.timer,
    text: '00',
    classes: ['time'],
  });
  domElements.timeSeparator = createElement({
    tag: 'span',
    parent: domElements.timer,
    text: ' : ',
    classes: ['time'],
  });
  domElements.seconds = createElement({
    tag: 'span',
    parent: domElements.timer,
    text: '00',
    classes: ['time'],
  });

  domElements.options = createElement({
    tag: 'div',
    parent: domElements.headerWrapper,
    classes: ['options'],
  });

  domElements.audioButton = createElement({
    tag: 'div',
    parent: domElements.options,
    classes: ['panel-btn'],
  });

  domElements.audioButtonWrapper = createElement({
    tag: 'div',
    parent: domElements.audioButton,
    classes: ['btn-wrapper'],
  });

  domElements.audioOnImg = createElement({
    tag: 'div',
    parent: domElements.audioButtonWrapper,
    classes: ['button-img', 'audio-on'],
  });

  domElements.audiotoggler = createElement({
    tag: 'input',
    type: 'checkbox',
    parent: domElements.audioButtonWrapper,
    id: ['audio-toggle'],
    classes: ['toggle-btn'],
  });
  domElements.audiotoggler.setAttribute('data-name', 'audio');
  domElements.audiotogglerLabel = createElement({
    tag: 'label',
    parent: domElements.audioButtonWrapper,
    classes: ['toggle-label'],
  });
  domElements.audiotogglerLabel.setAttribute('for', 'audio-toggle');
  domElements.audioOffImg = createElement({
    tag: 'div',
    parent: domElements.audioButtonWrapper,
    classes: ['button-img', 'audio-off'],
  });

  domElements.themeButton = createElement({
    tag: 'div',
    parent: domElements.options,
    classes: ['panel-btn'],
  });

  domElements.themeButtonWrapper = createElement({
    tag: 'div',
    parent: domElements.themeButton,
    classes: ['btn-wrapper'],
  });

  domElements.themeOnImg = createElement({
    tag: 'div',
    parent: domElements.themeButtonWrapper,
    classes: ['button-img', 'theme-on'],
  });

  domElements.themetoggler = createElement({
    tag: 'input',
    type: 'checkbox',
    parent: domElements.themeButtonWrapper,
    id: ['theme-toggle'],
    classes: ['toggle-btn'],
  });
  domElements.themetoggler.setAttribute('data-name', 'theme');
  domElements.themetogglerLabel = createElement({
    tag: 'label',
    parent: domElements.themeButtonWrapper,
    classes: ['toggle-label'],
  });
  domElements.themetogglerLabel.setAttribute('for', 'theme-toggle');
  domElements.themeOffImg = createElement({
    tag: 'div',
    parent: domElements.themeButtonWrapper,
    classes: ['button-img', 'theme-off'],
  });
}
