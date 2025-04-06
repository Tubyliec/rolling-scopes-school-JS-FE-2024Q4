import { brands, models } from '../../data/cars-data';
import type { CreatedCar } from '../../models/types/created-car.type';
import { AdditionalUtilities } from '../accessory-utils/additionaly-utilities';

export class RandomCarGenerator {
  public static getRandomName(): string {
    const brand = brands[Math.floor(Math.random() * brands.length)];
    const model = models[Math.floor(Math.random() * models.length)];
    return `${brand} ${model}`;
  }

  public static generateRandomCars(count = 100): Array<CreatedCar> {
    return Array.from({ length: count })
      .fill(1)
      .map(() => ({
        name: RandomCarGenerator.getRandomName(),
        color: AdditionalUtilities.getRandomColor(),
      }));
  }
}
