import type { EventInputFunction } from '../types/event-input.type';

export interface InputOptions {
  placeholder: string;
  role: 'primary-input' | 'secondary-input';
  callback?: EventInputFunction;
}
