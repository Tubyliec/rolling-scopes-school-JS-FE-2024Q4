import type { Car } from '../models/types/car.type';
import type { CarsList } from '../models/types/cars-list.type';
import type { Engine } from '../models/types/engine.type';
import type { Winner } from '../models/types/winner.type';

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

  public static async getStopEngine(id: number): Promise<Engine> {
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

  public static async getWinner(id: number): Promise<Winner> {
    const response = await fetch(`http://localhost:3000/winners/${id}`);
    return response.json() as Promise<Winner>;
  }

  public static async getWinnerStatus(id: number): Promise<number> {
    const response = await fetch(`http://localhost:3000/winners/${id}`);
    return response.status;
  }

  public static async createWinner(body: Winner): Promise<void> {
    await fetch(`http://localhost:3000/winners`, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  public static async updateWinner(id: number, body: Winner): Promise<void> {
    await fetch(`http://localhost:3000/winners/${id}`, {
      method: 'PUT',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  public static async sendWinner(winner: Winner): Promise<void> {
    const winnerStatus = await Api.getWinnerStatus(winner.id);

    if (winnerStatus === 404) {
      await Api.createWinner(winner);
    } else {
      const winnerState = await Api.getWinner(winner.id);
      await Api.updateWinner(winner.id, {
        id: winner.id,
        wins: winnerState.wins + 1,
        time: Math.min(winner.time, winnerState.time),
      });
    }
  }
}
