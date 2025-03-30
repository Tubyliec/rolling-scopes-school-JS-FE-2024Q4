import type { PageName } from '../../models/types/render-options.type';

export abstract class TypeCheckers {
  public static isPageName(value: string): value is PageName {
    return value === 'garage' || value === 'winners';
  }
}
