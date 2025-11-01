export interface BaseConfig {
  description?: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
}

export interface TextConfig extends BaseConfig {
  type: 'text' | 'password' | 'textarea';
}

export interface NumberConfig extends BaseConfig {
  type: 'number';
}

export interface SelectConfig extends BaseConfig {
  options: { value: string; label: string }[];
  type: 'select';
}

export interface CheckboxConfig extends BaseConfig {
  type: 'checkbox' | 'switch';
}

export type InputConfig = TextConfig | NumberConfig | SelectConfig | CheckboxConfig;

export type InputValue = string | number | boolean;
