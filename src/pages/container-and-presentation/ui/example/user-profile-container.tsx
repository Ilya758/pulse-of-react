import { notifications } from '@mantine/notifications';
import { IconCheck } from '@tabler/icons-react';
import { FC, useCallback, useEffect, useState } from 'react';
import { fetchUser, saveUser } from '../../lib';
import { User } from '../../model';
import { UserProfileForm } from './user-profile-form';

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
      autoClose: false,
      id: 'save-user',
      loading: true,
      message: 'Please wait while we update your information.',
      title: 'Saving your profile',
      withCloseButton: false,
    });

    try {
      await saveUser();
      notifications.update({
        autoClose: 2000,
        color: 'teal',
        icon: <IconCheck size={16} />,
        id: 'save-user',
        loading: false,
        message: 'Your profile has been successfully updated.',
        title: 'Profile Saved!',
      });
    } catch {
      notifications.update({
        autoClose: 5000,
        color: 'red',
        id: 'save-user',
        message: 'Failed to save your profile. Please try again.',
        title: 'Error',
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
      isSaving={isSaving}
      onInputChange={handleInputChange}
      onSave={handleSave}
      user={user}
    />
  );
};
