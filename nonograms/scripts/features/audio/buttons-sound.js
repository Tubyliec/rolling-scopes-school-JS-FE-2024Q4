import { sounds } from '../../core/data/sounds';
import { playSound } from './play-sound';

export function buttonsSound() {
  if (this.classList.contains('dif-btn')) {
    playSound(sounds.button);
  }
  if (this.classList.contains('toggle-btn')) {
    playSound(sounds.switch);
  }
}
