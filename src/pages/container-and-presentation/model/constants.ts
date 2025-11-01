export const PATTERN_SIGNATURE_CODE = `// Container Component Signature
// Manages logic, state, and data fetching.
// Renders the Presentational Component.
const SomeFeatureContainer = () => {
  const [data, setData] = useState(null);
  
  useEffect(() => {
    // fetch data, perform side effects...
  }, []);
  
  const handleAction = () => {
    // do something...
  };
  
  return <SomeFeatureView data={data} onAction={handleAction} />;
}

// Presentational Component Signature
// Receives data and callbacks via props.
// Renders UI, has no state of its own.
const SomeFeatureView = ({ data, onAction }) => {
  return (
    <div onClick={onAction}>
      {/* render data here */}
    </div>
  );
}`;

export const USER_PROFILE_CONTAINER_CODE = `import { FC, useCallback, useEffect, useState } from 'react';
import { UserProfileForm } from './user-profile-form';
import { notifications } from '@mantine/notifications';
import { IconCheck } from '@tabler/icons-react';

const fetchUser = (userId: number) => {
  return Promise.resolve({
    id: userId,
    name: 'Jane Doe',
    email: 'jane.doe@example.com',
    bio: 'A software developer specializing in React.',
  });
};

const saveUser = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true });
    }, 1500);
  });
};

export interface User {
  id: number;
  name: string;
  email: string;
  bio: string;
}

export const UserProfileContainer: FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setUser((prevUser) => (prevUser ? { ...prevUser, [name]: value } : null));
    },
    [],
  );

  const handleSave = useCallback(async () => {
    if (!user) return;

    setIsSaving(true);
    notifications.show({
      id: 'save-user',
      loading: true,
      title: 'Saving your profile',
      message: 'Please wait while we update your information.',
      autoClose: false,
      withCloseButton: false,
    });

    try {
      await saveUser(user);
      notifications.update({
        id: 'save-user',
        color: 'teal',
        loading: false,
        icon: <IconCheck size={16} />,
        title: 'Profile Saved!',
        message: 'Your profile has been successfully updated.',
        autoClose: 2000,
      });
    } catch {
      notifications.update({
        id: 'save-user',
        color: 'red',
        title: 'Error',
        message: 'Failed to save your profile. Please try again.',
        autoClose: 5000,
      });
    } finally {
      setIsSaving(false);
    }
  }, [user]);

  useEffect(() => {
    fetchUser(1)
      .then(setUser)
      .catch(() => setError('Failed to load user data.'));
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  if (!user) {
    return <div>Loading profile...</div>;
  }

  return (
    <UserProfileForm
      user={user}
      isSaving={isSaving}
      onInputChange={handleInputChange}
      onSave={handleSave}
    />
  );
};`;

export const USER_PROFILE_FORM_CODE = `
import { TextInput, Textarea, Button, Paper, Title, Group } from '@mantine/core';
import { User } from './user-profile-container';

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
};`;
