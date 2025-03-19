import type { EventInputFunction } from '../types/event-input.type';

export interface InputOptions {
  placeholder: string;
  role: string;
  callback?: EventInputFunction;
}
