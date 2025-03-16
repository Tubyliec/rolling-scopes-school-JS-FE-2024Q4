import type { EventFunction } from '../types/event-callback.type';

export interface InputOptions {
  placeholder: string;
  role: string;
  callback?: EventFunction;
}
