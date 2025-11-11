import { Alert, Box, Stack, Tabs } from '@mantine/core';
import { IconAlertTriangle } from '@tabler/icons-react';
import { FC, useState } from 'react';
import { Feed } from './feed';

export const Example: FC = () => {
  const [key, setKey] = useState(Date.now());

  const handleTabChange = () => {
    setKey(Date.now());
  };

  return (
    <Stack>
      <Alert color="blue" icon={<IconAlertTriangle size={16} />} title="Demonstration">
        Click the "Load new post" button. In the "Problematic" tab, the new post appears suddenly,
        pushing the button and existing content down. In the "Optimized" tab, a skeleton placeholder
        reserves space, preventing the layout shift.
      </Alert>
      <Tabs defaultValue="problematic" onChange={handleTabChange}>
        <Tabs.List>
          <Tabs.Tab value="problematic">Problematic Example</Tabs.Tab>
          <Tabs.Tab value="optimized">Optimized Example</Tabs.Tab>
        </Tabs.List>

        <Box mt="md">
          <Tabs.Panel value="problematic">
            <Feed isOptimized={false} key={key} />
          </Tabs.Panel>
          <Tabs.Panel value="optimized">
            <Feed isOptimized key={key} />
          </Tabs.Panel>
        </Box>
      </Tabs>
    </Stack>
  );
};
