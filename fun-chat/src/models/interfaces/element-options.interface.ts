import type { Attribute } from './attribute.interface';

export interface ElementOptions {
  tag: keyof HTMLElementTagNameMap;
  css?: string[];
  text?: string;
  id?: number;
  placeholder?: string;
  attribute?: Attribute;
}
