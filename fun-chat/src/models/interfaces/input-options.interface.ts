export interface InputOptions {
  type?: string;
  placeholder?: string;
  required?: boolean;
  pattern?: string;
  inputCallback?: (value: string) => void;
}
