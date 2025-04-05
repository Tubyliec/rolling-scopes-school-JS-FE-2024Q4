import type { Position } from '../../models/interfaces/position.interface';

export class Animation {
  public static getPosition(element: HTMLElement): Position {
    const { top, left, width, height } = element.getBoundingClientRect();
    return {
      x: left + width / 2,
      y: top + height / 2,
    };
  }

  public static getDistance(
    firstElement: HTMLElement,
    secondElement: HTMLElement,
  ): number {
    const firstElementPosition = Animation.getPosition(firstElement);
    const secondElementPosition = Animation.getPosition(secondElement);

    return Math.hypot(
      firstElementPosition.x - secondElementPosition.x,
      firstElementPosition.y - secondElementPosition.y,
    );
  }

  public static animation(
    car: HTMLElement,
    distance: number,
    duration: number,
  ): { id: number } {
    const targetCar = car;
    let start: number | null;
    const state: {
      id: number;
    } = { id: 1 };

    const getStep = (timestamp: number): void => {
      if (!start) start = timestamp;
      const time = timestamp - start;
      const passedDistance = Math.round(time * (distance / duration));
      targetCar.style.transform = `translateX(${Math.min(passedDistance, distance)}px)`;
      if (passedDistance < distance) {
        state.id = globalThis.requestAnimationFrame(getStep);
      }
    };
    state.id = globalThis.requestAnimationFrame(getStep);
    return state;
  }
}
