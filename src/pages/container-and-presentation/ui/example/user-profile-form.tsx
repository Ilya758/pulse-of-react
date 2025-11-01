import { Button, Group, Paper, Textarea, TextInput, Title } from '@mantine/core';
import { User } from '../../model';

type Props = {
  isSaving: boolean;
  user: User;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onSave: () => void;
};

export const UserProfileForm = ({ user, isSaving, onInputChange, onSave }: Props) => (
  <Paper p="lg" radius="md" shadow="md" withBorder>
    <Title mb="md" order={4}>
      Edit Profile
    </Title>
    <TextInput
      disabled={isSaving}
      label="Name"
      mb="sm"
      name="name"
      onChange={onInputChange}
      value={user.name}
    />
    <TextInput
      disabled={isSaving}
      label="Email"
      mb="sm"
      name="email"
      onChange={onInputChange}
      type="email"
      value={user.email}
    />
    <Textarea
      disabled={isSaving}
      label="Bio"
      mb="lg"
      minRows={4}
      name="bio"
      onChange={onInputChange}
      value={user.bio}
    />
    <Group justify="flex-end">
      <Button loading={isSaving} onClick={onSave}>
        Save Profile
      </Button>
    </Group>
  </Paper>
);
