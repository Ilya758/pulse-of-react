import { InputConfig } from './types';

export const FACTORY_SIGNATURE_CODE = `// Factory Function Signature
// Returns a component or logic based on configuration
function createButtonFactory(config) {
  return function Button(props) {
    // ...use config and props
    return <button style={{ color: config.color }}>{props.children}</button>;
  };
}

// Usage
const PrimaryButton = createButtonFactory({ color: 'blue' });
const DangerButton = createButtonFactory({ color: 'red' });
`;

export const FACTORY_EXAMPLE_CODE = `import { Button, Group, Stack, Title, Text } from '@mantine/core';
import { FC } from 'react';

// Factory function that creates a styled button component
function createButtonFactory(config: { color: string; variant: 'filled' | 'outline' }) {
  return function FactoryButton({ children, ...props }: React.ComponentProps<typeof Button>) {
    return (
      <Button color={config.color} variant={config.variant} {...props}>
        {children}
      </Button>
    );
  };
}

// Create two button variants using the factory
const PrimaryButton = createButtonFactory({ color: 'blue', variant: 'filled' });
const DangerButton = createButtonFactory({ color: 'red', variant: 'outline' });

export const FactoryExample: FC = () => (
  <Stack maw={400} mt={16} gap="md">
    <Title order={4} mb="xs">Button Factory Example</Title>
    <Text size="sm" c="dimmed">
      This example demonstrates a factory function that generates pre-configured button components using Mantine UI.
    </Text>
    <Group>
      <PrimaryButton>Primary</PrimaryButton>
      <DangerButton>Danger</DangerButton>
    </Group>
  </Stack>
);
`;

export const SELECT_OPTIONS = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
];

export const INPUT_FACTORY_SELECT_OPTIONS = [
  { value: 'text', label: 'Text' },
  { value: 'number', label: 'Number' },
  { value: 'password', label: 'Password' },
  { value: 'textarea', label: 'Textarea' },
  { value: 'select', label: 'Select' },
  { value: 'checkbox', label: 'Checkbox' },
  { value: 'switch', label: 'Switch' },
];

export const DEFAULT_CONFIG: InputConfig = {
  type: 'text',
  label: 'Your input',
  placeholder: 'Type something...',
  required: false,
  description: '',
};

export const INPUT_FACTORY_TYPES_CODE = `export interface BaseConfig {
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
`;

export const INPUT_FACTORY_FUNCTION_CODE = `import { Checkbox, Switch } from '@mantine/core';
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
`;

export const INPUT_FACTORY_EXAMPLE_COMPONENT_CODE = `import { Group, Stack, Title, Text, Select, TextInput, Checkbox, Paper } from '@mantine/core';
import { FC, useState } from 'react';
import {
  InputConfig,
  InputValue,
  SelectConfig,
  INPUT_FACTORY_SELECT_OPTIONS,
  SELECT_OPTIONS,
  DEFAULT_CONFIG,
} from '../model';
import { InputFactory } from './input-factory';

export const Example: FC = () => {
  const [config, setConfig] = useState<InputConfig>(DEFAULT_CONFIG);
  const [value, setValue] = useState<InputValue>('');
  const [optionsInput, setOptionsInput] = useState(
    config.type === 'select' ? SELECT_OPTIONS.map((o) => o.label).join(', ') : '',
  );

  const handleTypeChange = (type: string | null) => {
    if (!type) return;
    
    switch (type) {
      case 'select': {
        setConfig({
          type: 'select',
          label: config.label,
          placeholder: config.placeholder,
          required: config.required,
          description: config.description,
          options: SELECT_OPTIONS,
        });
        setOptionsInput(SELECT_OPTIONS.map((o) => o.label).join(', '));
        break;
      }

      case 'checkbox':
      case 'switch': {
        setConfig({
          type: type as 'checkbox' | 'switch',
          label: config.label,
          required: config.required,
          description: config.description,
        });
        break;
      }

      case 'number': {
        setConfig({
          type: 'number',
          label: config.label,
          placeholder: config.placeholder,
          required: config.required,
          description: config.description,
        });
        break;
      }

      default: {
        setConfig({
          type: type as 'text' | 'password' | 'textarea',
          label: config.label,
          placeholder: config.placeholder,
          required: config.required,
          description: config.description,
        });
        break;
      }
    }
  };

  return (
    <Stack maw={500} mt={16} gap="xl">
      <Text size="sm" c="dimmed">
        Use the controls below to configure the input. The factory will generate the appropriate
        input component based on your selection.
      </Text>
      <Paper shadow="xs" p="md" withBorder>
        <Stack gap="md">
          <Group grow>
            <Select
              label="Input type"
              value={config.type}
              data={INPUT_FACTORY_SELECT_OPTIONS}
              onChange={handleTypeChange}
            />
            <TextInput
              label="Label"
              value={config.label || ''}
              onChange={(e) => setConfig((c) => ({ ...c, label: e.target.value }))}
            />
          </Group>
          <Group grow>
            {'placeholder' in config && (
              <TextInput
                label="Placeholder"
                value={config.placeholder || ''}
                onChange={(e) => setConfig((c) => ({ ...c, placeholder: e.target.value }))}
                disabled={config.type === 'checkbox' || config.type === 'switch'}
              />
            )}
            <TextInput
              label="Description"
              value={config.description || ''}
              onChange={(e) => setConfig((c) => ({ ...c, description: e.target.value }))}
            />
          </Group>
          <Group grow align="center">
            {config.type === 'select' && (
              <TextInput
                label="Options (comma separated)"
                value={optionsInput}
                onChange={(e) => setOptionsInput(e.target.value)}
                onBlur={() => {
                  const options = optionsInput
                    .split(',')
                    .map((s) => s.trim())
                    .filter(Boolean)
                    .map((label, i) => ({ value: \`option\${i + 1}\`, label }));
                  setConfig((c) => ({ ...c, options } as SelectConfig));
                }}
              />
            )}
            <Checkbox
              label="Required"
              checked={!!config.required}
              onChange={(e) => setConfig((c) => ({ ...c, required: e.target.checked }))}
            />
          </Group>
        </Stack>
      </Paper>
      <Paper shadow="xs" p="md" withBorder>
        <Title order={5} mb="sm">
          Live Input
        </Title>
        <InputFactory config={config} value={value} onChange={setValue} />
        <Text size="xs" mt="md" c="dimmed">
          Current value: {JSON.stringify(value)}
        </Text>
      </Paper>
    </Stack>
  );
};
`;

