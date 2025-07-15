import { Group, Stack, Title, Text, Select, TextInput, Checkbox, Paper } from '@mantine/core';
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
                    .map((label, i) => ({ value: `option${i + 1}`, label }));
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

