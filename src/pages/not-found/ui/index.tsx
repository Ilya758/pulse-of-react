import {
  Button,
  Container,
  Group,
  Paper,
  Stack,
  Text,
  Title,
  useMantineTheme,
} from '@mantine/core';
import { IconArrowLeft, IconHome } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import { useThemeColorContext } from '@/shared';
import { GooseSVG } from './goose-svg';

export const NotFoundPage = () => {
  const { primaryColor } = useThemeColorContext();
  const { colors } = useMantineTheme();
  const bgColor = colors[primaryColor]?.[6];
  const navigate = useNavigate();

  return (
    <Container py="xl" size="md">
      <Paper p="xl" radius="md" shadow="md" withBorder>
        <Stack align="center" gap="xl">
          <Title c={bgColor} order={1} ta="center">
            Honk! 🦢 Page Not Found
          </Title>

          <div style={{ textAlign: 'center' }}>
            <GooseSVG />
          </div>

          <Text c={bgColor} fz="lg" ta="center">
            This confused goose can't find what you're looking for!
          </Text>

          <Group>
            <Button
              color={bgColor}
              leftSection={<IconArrowLeft size="1rem" />}
              onClick={() => navigate(-1)}
              variant="outline"
            >
              Fly Back
            </Button>
            <Button
              color={bgColor}
              leftSection={<IconHome size="1rem" />}
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
