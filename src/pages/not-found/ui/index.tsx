import { useThemeColorContext } from '@/shared';
import {
  Container,
  Title,
  Text,
  Paper,
  Button,
  Stack,
  Group,
  useMantineTheme,
} from '@mantine/core';
import { IconHome, IconArrowLeft } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import { GooseSVG } from './goose-svg';

export const NotFoundPage = () => {
  const { primaryColor } = useThemeColorContext();
  const { colors } = useMantineTheme();
  const bgColor = colors[primaryColor]?.[6];
  const navigate = useNavigate();

  return (
    <Container size="md" py="xl">
      <Paper shadow="md" p="xl" radius="md" withBorder>
        <Stack align="center" gap="xl">
          <Title order={1} ta="center" c={bgColor}>
            Honk! 🦢 Page Not Found
          </Title>

          <div style={{ textAlign: 'center' }}>
            <GooseSVG />
          </div>

          <Text fz="lg" ta="center" c={bgColor}>
            This confused goose can't find what you're looking for!
          </Text>

          <Group>
            <Button
              leftSection={<IconArrowLeft size="1rem" />}
              variant="outline"
              onClick={() => navigate(-1)}
              color={bgColor}
            >
              Fly Back
            </Button>
            <Button
              leftSection={<IconHome size="1rem" />}
              color={bgColor}
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

