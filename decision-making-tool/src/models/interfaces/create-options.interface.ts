import type { Tags } from '../enums/tags.enum';
import type { EventFunction } from '../types/event-callback.type';
import type { Size } from './size.interface';

export interface CreateOptions {
  tag: Tags;
  classes: string[];
  text?: string;
  callback?: EventFunction;
  placeholder?: string;
  fieldSize?: Size;
}
