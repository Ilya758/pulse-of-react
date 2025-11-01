import {
  Checkbox,
  NumberInput,
  PasswordInput,
  Select,
  Switch,
  Textarea,
  TextInput,
} from '@mantine/core';
import { InputConfig, InputValue, NumberConfig } from '../model';

type Props = {
  config: InputConfig;
  value: InputValue;
  onChange: (value: InputValue) => void;
};

export const InputFactory = ({ config, value, onChange }: Props) => {
  switch (config.type) {
    case 'text': {
      return (
        <TextInput
          {...config}
          onChange={(e) => onChange(e.target.value)}
          value={typeof value === 'string' ? value : ''}
        />
      );
    }

    case 'password': {
      return (
        <PasswordInput
          {...config}
          onChange={(e) => onChange(e.target.value)}
          value={typeof value === 'string' ? value : ''}
        />
      );
    }

    case 'textarea': {
      return (
        <Textarea
          {...config}
          onChange={(e) => onChange(e.target.value)}
          value={typeof value === 'string' ? value : ''}
        />
      );
    }
    case 'number': {
      const { type: _, ...rest } = config;
      const numberProps: Omit<NumberConfig, 'type'> = rest;

      return (
        <NumberInput
          {...numberProps}
          onChange={(val) => onChange(typeof val === 'number' ? val : 0)}
          value={typeof value === 'number' ? value : undefined}
        />
      );
    }

    case 'select': {
      return (
        <Select
          {...config}
          data={config.options}
          onChange={(val) => onChange(val || '')}
          value={typeof value === 'string' ? value : ''}
        />
      );
    }

    case 'checkbox': {
      return (
        <Checkbox
          {...config}
          checked={!!value}
          onChange={(e) => onChange(e.currentTarget.checked)}
          required={!!config.required}
        />
      );
    }

    case 'switch': {
      return (
        <Switch {...config} checked={!!value} onChange={(e) => onChange(e.currentTarget.checked)} />
      );
    }

    default: {
      return null;
    }
  }
};
