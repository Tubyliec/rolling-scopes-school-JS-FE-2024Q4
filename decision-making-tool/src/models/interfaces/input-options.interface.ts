import type { EventInputFunction } from '../types/event-input.type';

export interface InputOptions {
  placeholder: 'Title' | 'Weight';
  role: 'primary-input' | 'secondary-input';
  callback?: EventInputFunction;
  type?: 'number' | 'text';
}
