import { useThemeColorContext } from '@/shared';
import { Container, Title, Text, Paper, Button, Stack, Group } from '@mantine/core';
import { IconHome, IconArrowLeft } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import { GooseSVG } from './goose-svg';

export const NotFoundPage = () => {
  const { primaryColor } = useThemeColorContext();
  const navigate = useNavigate();

  return (
    <Container size="md" py="xl">
      <Paper shadow="md" p="xl" radius="md" withBorder>
        <Stack align="center" gap="xl">
          <Title order={1} ta="center" c={primaryColor}>
            Honk! 🦢 Page Not Found
          </Title>

          <div style={{ textAlign: 'center' }}>
            <GooseSVG />
          </div>

          <Text fz="lg" ta="center" c="dimmed">
            This confused goose can't find what you're looking for!
          </Text>

          <Group>
            <Button
              leftSection={<IconArrowLeft size="1rem" />}
              variant="outline"
              onClick={() => navigate(-1)}
            >
              Fly Back
            </Button>
            <Button
              leftSection={<IconHome size="1rem" />}
              color={primaryColor}
              onClick={() => navigate('/')}
            >
              Go Home
            </Button>
          </Group>
        </Stack>
      </Paper>
    </Container>
  );
};

