import { FC, useCallback, useEffect, useState } from 'react';
import { UserProfileForm } from './user-profile-form';
import { notifications } from '@mantine/notifications';
import { IconCheck } from '@tabler/icons-react';
import { User } from '../../model';
import { fetchUser, saveUser } from '../../lib';

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
      await saveUser();
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
};

