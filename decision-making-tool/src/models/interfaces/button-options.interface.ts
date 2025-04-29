export interface ButtonOptions {
  text: string;
  classNames?: string[];
  type?: 'button' | 'submit';
  clickHandler?: (event: MouseEvent) => void;
}
