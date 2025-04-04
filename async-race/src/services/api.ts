import type { CarsList } from '../models/types/cars-list.type';

export class Api {
  public url = '';

  public static getCars = async (
    page: number,
    limit = 7,
  ): Promise<CarsList> => {
    const response = await fetch(
      `http://localhost:3000/garage?_page=${page}&_limit=${limit}`,
    );

    return {
      items: (await response.json()) as Awaited<CarsList>['items'],
      count: response.headers.get('X-Total-Count'),
    };
  };
}
