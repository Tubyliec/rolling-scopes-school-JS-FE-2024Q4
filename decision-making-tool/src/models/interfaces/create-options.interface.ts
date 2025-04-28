import type { Tags } from '../enums/tags.enum';
import type { EventFunction } from '../types/event-callback.type';

export interface CreateOptions {
  tag: Tags;
  classes: string[];
  text?: string;
  callback?: EventFunction;
}
