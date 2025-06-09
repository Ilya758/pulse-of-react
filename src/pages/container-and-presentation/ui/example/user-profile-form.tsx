import { TextInput, Textarea, Button, Paper, Title, Group } from '@mantine/core';
import { User } from '../../model';

type Props = {
  isSaving: boolean;
  user: User;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onSave: () => void;
};

export const UserProfileForm = ({ user, isSaving, onInputChange, onSave }: Props) => {
  return (
    <Paper withBorder shadow="md" p="lg" radius="md">
      <Title order={4} mb="md">
        Edit Profile
      </Title>
      <TextInput
        label="Name"
        name="name"
        value={user.name}
        onChange={onInputChange}
        disabled={isSaving}
        mb="sm"
      />
      <TextInput
        label="Email"
        name="email"
        type="email"
        value={user.email}
        onChange={onInputChange}
        disabled={isSaving}
        mb="sm"
      />
      <Textarea
        label="Bio"
        name="bio"
        value={user.bio}
        onChange={onInputChange}
        disabled={isSaving}
        minRows={4}
        mb="lg"
      />
      <Group justify="flex-end">
        <Button onClick={onSave} loading={isSaving}>
          Save Profile
        </Button>
      </Group>
    </Paper>
  );
};

