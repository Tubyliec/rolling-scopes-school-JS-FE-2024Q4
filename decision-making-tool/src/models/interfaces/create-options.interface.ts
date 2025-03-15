import type { EventFunction } from '../types/event-callback.type';

export interface CreateOptions {
  tag: string;
  classes: string[];
  text?: string;
  callback?: EventFunction;
}
