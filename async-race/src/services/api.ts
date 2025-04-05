import type { Car } from '../models/types/car.type';
import type { CarsList } from '../models/types/cars-list.type';
import type { Engine } from '../models/types/engine.type';

export class Api {
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

  public static async getStartEngine(id: number): Promise<Engine> {
    const response = await fetch(
      `http://localhost:3000/engine?id=${id}&status=started`,
      {
        method: 'PATCH',
      },
    );
    return response.json() as Promise<Engine>;
  }

  public static async getDriveStatus(
    id: number,
  ): Promise<{ success: boolean }> {
    const response = await fetch(
      `http://localhost:3000/engine?id=${id}&status=drive`,
      {
        method: 'PATCH',
      },
    ).catch();
    return response.status === 200
      ? { success: ((await response.json()) as { success: boolean }).success }
      : { success: false };
  }
}
