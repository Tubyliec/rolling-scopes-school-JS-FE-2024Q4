import type { EventFunction } from '../types/event-callback.type';
import type { Size } from './size.interface';

export interface CreateOptions {
  tag: keyof HTMLElementTagNameMap;
  classes: string[];
  text?: string;
  callback?: EventFunction;
  placeholder?: string;
  fieldSize?: Size;
}
