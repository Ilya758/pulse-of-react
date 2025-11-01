import { Checkbox, Group, Paper, Select, Stack, Text, TextInput, Title } from '@mantine/core';
import { FC, useState } from 'react';
import {
  DEFAULT_CONFIG,
  INPUT_FACTORY_SELECT_OPTIONS,
  InputConfig,
  InputValue,
  SELECT_OPTIONS,
  SelectConfig,
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
          description: config.description,
          label: config.label,
          options: SELECT_OPTIONS,
          placeholder: config.placeholder,
          required: config.required,
          type: 'select',
        });
        setOptionsInput(SELECT_OPTIONS.map((o) => o.label).join(', '));
        break;
      }

      case 'checkbox':
      case 'switch': {
        setConfig({
          description: config.description,
          label: config.label,
          required: config.required,
          type: type as 'checkbox' | 'switch',
        });
        break;
      }

      case 'number': {
        setConfig({
          description: config.description,
          label: config.label,
          placeholder: config.placeholder,
          required: config.required,
          type: 'number',
        });
        break;
      }

      default: {
        setConfig({
          description: config.description,
          label: config.label,
          placeholder: config.placeholder,
          required: config.required,
          type: type as 'text' | 'password' | 'textarea',
        });
        break;
      }
    }
  };

  return (
    <Stack gap="xl" maw={500} mt={16}>
      <Text c="dimmed" size="sm">
        Use the controls below to configure the input. The factory will generate the appropriate
        input component based on your selection.
      </Text>

      <Paper p="md" shadow="xs" withBorder>
        <Stack gap="md">
          <Group grow>
            <Select
              data={INPUT_FACTORY_SELECT_OPTIONS}
              label="Input type"
              onChange={handleTypeChange}
              value={config.type}
            />
            <TextInput
              label="Label"
              onChange={(e) => setConfig((c) => ({ ...c, label: e.target.value }))}
              value={config.label || ''}
            />
          </Group>
          <Group grow>
            {'placeholder' in config && (
              <TextInput
                disabled={config.type === 'checkbox' || config.type === 'switch'}
                label="Placeholder"
                onChange={(e) => setConfig((c) => ({ ...c, placeholder: e.target.value }))}
                value={config.placeholder || ''}
              />
            )}
            <TextInput
              label="Description"
              onChange={(e) => setConfig((c) => ({ ...c, description: e.target.value }))}
              value={config.description || ''}
            />
          </Group>
          <Group align="center" grow>
            {config.type === 'select' && (
              <TextInput
                label="Options (comma separated)"
                onBlur={() => {
                  const options = optionsInput
                    .split(',')
                    .map((s) => s.trim())
                    .filter(Boolean)
                    .map((label, i) => ({ label, value: `option${i + 1}` }));
                  setConfig((c) => ({ ...c, options }) as SelectConfig);
                }}
                onChange={(e) => setOptionsInput(e.target.value)}
                value={optionsInput}
              />
            )}
            <Checkbox
              checked={!!config.required}
              label="Required"
              onChange={(e) => setConfig((c) => ({ ...c, required: e.target.checked }))}
            />
          </Group>
        </Stack>
      </Paper>
      <Paper p="md" shadow="xs" withBorder>
        <Title mb="sm" order={5}>
          Live Input
        </Title>
        <InputFactory config={config} onChange={setValue} value={value} />
        <Text c="dimmed" mt="md" size="xs">
          Current value: {JSON.stringify(value)}
        </Text>
      </Paper>
    </Stack>
  );
};
