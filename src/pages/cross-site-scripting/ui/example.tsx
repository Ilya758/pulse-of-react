import { FC, useState } from 'react';
import { TextInput, Button, Card, Group, Text, Code, Space } from '@mantine/core';

export const Example: FC = () => {
  const [name, setName] = useState('');
  const [submittedName, setSubmittedName] = useState('');

  const handleSubmit = () => {
    setSubmittedName(name);
  };

  return (
    <Card withBorder radius="md">
      <Group>
        <TextInput
          label="Enter your name"
          placeholder="e.g., Alex"
          value={name}
          onChange={(event) => setName(event.currentTarget.value)}
        />
        <Button onClick={handleSubmit} mt="xl">
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
          <Card withBorder p="sm" mt="xs">
            <div dangerouslySetInnerHTML={{ __html: `Hello, ${submittedName}!` }} />
          </Card>

          <Space h="md" />
          <Text>Rendered output (safe):</Text>
          <Card withBorder p="sm" mt="xs">
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

