import { gameState } from '../../core/states/game-state';
import { domElements } from '../../core/states/dom-elements';

export function processTogglers() {
  if (this.dataset.name === 'audio') {
    this.checked === true
      ? (gameState.isSoundOn = false)
      : (gameState.isSoundOn = true);
  }
  if (this.dataset.name === 'theme') {
    if (this.checked === true) {
      document.body.style.setProperty('--background-color', '#121212');
      document.body.style.setProperty('--primary-color', '#333333');
      document.body.style.setProperty('--border-color', '#f9f6f4');
      document.body.style.setProperty('--active-color', '#308eaf');
      document.body.style.setProperty('--dark-color', '#f9f6f4');
      document.body.style.setProperty('--panel-color', '#308eaf');
      document.body.style.setProperty('--light-color', '#121212');
      document.body.style.setProperty('--neutral-color', '#308eaf');
      document.body.style.setProperty(
        '--cross',
        `url("/icons/cross-pr.png")`,
      );
      domElements.audioOnImg.style.setProperty(
        'background-image',
        `url("/icons/volume-pr.png")`,
      );
      domElements.audioOffImg.style.setProperty(
        'background-image',
        `url("/icons/volume-muted-pr.png")`,
      );
      domElements.themeOnImg.style.setProperty(
        'background-image',
        `url("/icons/sun-icon-pr.png")`,
      );
      domElements.themeOffImg.style.setProperty(
        'background-image',
        `url("/icons/moon-icon-pr.png")`,
      );
    } else {
      document.body.style.setProperty(
        '--background-color',
        'linear-gradient(90deg, rgba(249,246,244,1) 0%, rgba(249,244,246,1) 100%)',
      );
      document.body.style.removeProperty('--primary-color');
      document.body.style.removeProperty('--border-color');
      document.body.style.removeProperty('--dark-color');
      document.body.style.removeProperty('--active-color');
      document.body.style.removeProperty('--panel-color');
      document.body.style.removeProperty('--light-color');
      document.body.style.removeProperty('--neutral-color');
      domElements.audioOnImg.style.removeProperty('background-image');
      domElements.audioOffImg.style.removeProperty('background-image');
      domElements.themeOnImg.style.removeProperty('background-image');
      domElements.themeOffImg.style.removeProperty('background-image');
      document.body.style.removeProperty('--cross');
    }
  }
}
