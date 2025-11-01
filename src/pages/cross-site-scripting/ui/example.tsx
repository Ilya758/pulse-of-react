import { Button, Card, Code, Group, Space, Text, TextInput } from '@mantine/core';
import { FC, useState } from 'react';

export const Example: FC = () => {
  const [name, setName] = useState('');
  const [submittedName, setSubmittedName] = useState('');

  const handleSubmit = () => {
    setSubmittedName(name);
  };

  return (
    <Card radius="md" withBorder>
      <Group>
        <TextInput
          label="Enter your name"
          onChange={(event) => setName(event.currentTarget.value)}
          placeholder="e.g., Alex"
          value={name}
        />
        <Button mt="xl" onClick={handleSubmit}>
          Submit
        </Button>
      </Group>

      {submittedName && (
        <>
          <Space h="md" />
          <Text>Your submitted name:</Text>
          <Code block>{submittedName}</Code>

          <Space h="md" />
          <Text>Rendered output (vulnerable):</Text>
          <Card mt="xs" p="sm" withBorder>
            {/** biome-ignore lint/security/noDangerouslySetInnerHtml: exists as example */}
            <div dangerouslySetInnerHTML={{ __html: `Hello, ${submittedName}!` }} />
          </Card>

          <Space h="md" />
          <Text>Rendered output (safe):</Text>
          <Card mt="xs" p="sm" withBorder>
            <div>Hello, {submittedName}!</div>
          </Card>
        </>
      )}

      <Space h="md" />
      <Text size="sm">
        Try entering <Code>{`<script>alert('XSS!')</script>`}</Code> or{' '}
        <Code>{`<img src="x" onerror="alert('XSS!')">`}</Code> to see the difference between
        vulnerable and safe rendering.
      </Text>
    </Card>
  );
};
