import type { CallbackNav } from '../types/callback-nav.type';

export interface ElementOptions {
  tag: string;
  css: string[];
  text?: string;
  callback?: CallbackNav;
  id?: number;
}
