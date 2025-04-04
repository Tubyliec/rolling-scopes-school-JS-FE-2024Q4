import type { Car } from '../models/types/car.type';
import type { CarsList } from '../models/types/cars-list.type';

export class Api {
  public url = '';

  public static async getCars(page: number, limit = 7): Promise<CarsList> {
    const response = await fetch(
      `http://localhost:3000/garage?_page=${page}&_limit=${limit}`,
    );

    return {
      items: (await response.json()) as Awaited<CarsList>['items'],
      count: response.headers.get('X-Total-Count'),
    };
  }

  public static async getCarsCount(): Promise<string> {
    const response = await fetch(`http://localhost:3000/garage?_limit=5`);
    return response.headers.get('X-Total-Count') || '0';
  }

  public static async getDeleteCarById(id: number): Promise<Car> {
    const response = await fetch(`http://localhost:3000/garage/${id}`, {
      method: 'DELETE',
    });
    return response.json() as Promise<Car>;
  }
}
