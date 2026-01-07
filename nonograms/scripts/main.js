import { createDom } from './create-dom.js';
import { domElements } from './core/states/dom-elements.js';
import '../styles/styles.scss';
import { createGame } from './features/game/create-game';
import { createList } from './features/ui/board/create-list';

createDom();
createGame();
createList(domElements.fieldset);
domElements.easyButton.classList.add('dif-btn--active');
document.getElementById('cross').checked = true;

window.addEventListener('resize', createGame);
