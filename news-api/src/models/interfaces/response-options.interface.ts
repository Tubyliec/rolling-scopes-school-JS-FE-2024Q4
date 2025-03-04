import { RequestOptions } from '../types/request-options.type';

export interface ResponseOptions {
    endpoint: string;
    options?: RequestOptions;
}
