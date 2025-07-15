import { Checkbox, Switch } from '@mantine/core';
import { TextInput } from '@mantine/core';
import { PasswordInput } from '@mantine/core';
import { Textarea } from '@mantine/core';
import { NumberInput } from '@mantine/core';
import { Select } from '@mantine/core';
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
          value={typeof value === 'string' ? value : ''}
          onChange={(e) => onChange(e.target.value)}
        />
      );
    }

    case 'password': {
      return (
        <PasswordInput
          {...config}
          value={typeof value === 'string' ? value : ''}
          onChange={(e) => onChange(e.target.value)}
        />
      );
    }

    case 'textarea': {
      return (
        <Textarea
          {...config}
          value={typeof value === 'string' ? value : ''}
          onChange={(e) => onChange(e.target.value)}
        />
      );
    }
    case 'number': {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { type: _, ...rest } = config;
      const numberProps: Omit<NumberConfig, 'type'> = rest;

      return (
        <NumberInput
          {...numberProps}
          value={typeof value === 'number' ? value : undefined}
          onChange={(val) => onChange(typeof val === 'number' ? val : 0)}
        />
      );
    }

    case 'select': {
      return (
        <Select
          {...config}
          value={typeof value === 'string' ? value : ''}
          onChange={(val) => onChange(val || '')}
          data={config.options}
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

