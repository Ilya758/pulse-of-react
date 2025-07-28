import { useReducer, useCallback, useState } from 'react';
import {
  Modal,
  Button,
  Group,
  Stack,
  Title,
  Text,
  TextInput,
  Select,
  Checkbox,
  Stepper,
  Alert,
  Divider,
} from '@mantine/core';
import {
  IconAlertCircle,
  IconCheck,
  IconUser,
  IconSettings,
  IconFileText,
} from '@tabler/icons-react';
import {
  isError,
  isPersonal,
  isPreferences,
  isReview,
  isSubmitting,
  isSuccess,
  submitForm,
  getCurrentStep,
  canProceed,
} from '../../lib';
import { modalReducer, PersonalData, PreferencesData } from '../../model';

export const Example = () => {
  const [state, dispatch] = useReducer(modalReducer, { type: 'idle' });
  const [opened, setOpened] = useState(false);

  const handleOpen = useCallback(() => {
    dispatch({ type: 'OPEN_PERSONAL' });
    setOpened(true);
  }, []);

  const handleClose = useCallback(() => {
    dispatch({ type: 'CLOSE' });
    setOpened(false);
  }, []);

  const handlePersonalUpdate = useCallback((field: keyof PersonalData, value: string) => {
    dispatch({ type: 'UPDATE_PERSONAL', payload: { [field]: value } });
  }, []);

  const handlePreferencesUpdate = useCallback(
    (field: keyof PreferencesData, value: string | boolean) => {
      dispatch({ type: 'UPDATE_PREFERENCES', payload: { [field]: value } });
    },
    [],
  );

  const handleNext = useCallback(() => {
    if (isPersonal(state)) {
      dispatch({ type: 'NEXT_TO_PREFERENCES' });
    } else if (isPreferences(state)) {
      dispatch({ type: 'NEXT_TO_REVIEW' });
    }
  }, [state]);

  const handleBack = useCallback(() => {
    dispatch({ type: 'GO_BACK' });
  }, []);

  const handleSubmit = useCallback(async () => {
    if (isReview(state)) {
      dispatch({ type: 'SUBMIT' });

      await submitForm(state.data)
        .then(() => {
          dispatch({ type: 'SUBMIT_SUCCESS' });
        })
        .catch((error) => {
          dispatch({
            type: 'SUBMIT_ERROR',
            payload: { error: error instanceof Error ? error.message : 'Unknown error' },
          });
        });
    }
  }, [state]);

  const handleRetry = useCallback(async () => {
    if (isError(state)) {
      dispatch({ type: 'SUBMIT' });

      await submitForm(state.data)
        .then(() => {
          dispatch({ type: 'SUBMIT_SUCCESS' });
        })
        .catch((error) => {
          dispatch({
            type: 'SUBMIT_ERROR',
            payload: { error: error instanceof Error ? error.message : 'Unknown error' },
          });
        });
    }
  }, [state]);

  return (
    <Stack maw={720} mt={16} gap="xl">
      <div>
        <Title order={3} mb="xs">
          Multi-Step Modal with State Machine
        </Title>
        <Text size="sm" c="dimmed">
          This example demonstrates how state machines can manage complex multi-step processes with
          form validation, navigation, and submission states.
        </Text>
      </div>

      <Button onClick={handleOpen}>Open Multi-Step Modal</Button>

      <Modal
        opened={opened}
        onClose={handleClose}
        size="lg"
        title="User Registration"
        closeOnClickOutside={!isSubmitting(state)}
        closeOnEscape={!isSubmitting(state)}
        withCloseButton={!isSubmitting(state)}
      >
        <Stack gap="xl">
          <Stepper active={getCurrentStep(state)} size="sm" completedIcon={<IconCheck size={16} />}>
            <Stepper.Step label="Personal Info" icon={<IconUser size={16} />} />
            <Stepper.Step label="Preferences" icon={<IconSettings size={16} />} />
            <Stepper.Step label="Review" icon={<IconFileText size={16} />} />
          </Stepper>

          <Divider />

          {isPersonal(state) && (
            <Stack gap="md">
              <Title order={4}>Personal Information</Title>
              <TextInput
                label="First Name"
                placeholder="Enter your first name"
                value={state.data.firstName}
                onChange={(e) => handlePersonalUpdate('firstName', e.target.value)}
                required
              />
              <TextInput
                label="Last Name"
                placeholder="Enter your last name"
                value={state.data.lastName}
                onChange={(e) => handlePersonalUpdate('lastName', e.target.value)}
                required
              />
              <TextInput
                label="Phone Number"
                placeholder="Enter your phone number"
                value={state.data.phoneNumber}
                onChange={(e) => handlePersonalUpdate('phoneNumber', e.target.value)}
                required
              />
            </Stack>
          )}

          {isPreferences(state) && (
            <Stack gap="md">
              <Title order={4}>Preferences</Title>
              <Select
                label="Theme"
                placeholder="Choose your theme"
                data={[
                  { value: 'light', label: 'Light Theme' },
                  { value: 'dark', label: 'Dark Theme' },
                  { value: 'auto', label: 'Auto (System)' },
                ]}
                value={state.preferences.theme}
                onChange={(value) => handlePreferencesUpdate('theme', value || 'light')}
                required
              />
              <Checkbox
                label="Enable notifications"
                checked={state.preferences.notifications}
                onChange={(e) => handlePreferencesUpdate('notifications', e.target.checked)}
              />
              <Checkbox
                label="Subscribe to newsletter"
                checked={state.preferences.newsletter}
                onChange={(e) => handlePreferencesUpdate('newsletter', e.target.checked)}
              />
            </Stack>
          )}

          {isReview(state) && (
            <Stack gap="md">
              <Title order={4}>Review Your Information</Title>

              <div>
                <Title order={5} mb="xs">
                  Personal Information
                </Title>
                <Text size="sm">
                  Name: {state.data.personal.firstName} {state.data.personal.lastName}
                </Text>
                <Text size="sm">Phone: {state.data.personal.phoneNumber}</Text>
              </div>

              <div>
                <Title order={5} mb="xs">
                  Preferences
                </Title>
                <Text size="sm">Theme: {state.data.preferences.theme}</Text>
                <Text size="sm">
                  Notifications: {state.data.preferences.notifications ? 'Enabled' : 'Disabled'}
                </Text>
                <Text size="sm">
                  Newsletter: {state.data.preferences.newsletter ? 'Subscribed' : 'Not subscribed'}
                </Text>
              </div>
            </Stack>
          )}

          {isSubmitting(state) && (
            <Stack gap="md" align="center">
              <Title order={4}>Submitting...</Title>
              <Text size="sm" c="dimmed">
                Please wait while we process your information.
              </Text>
            </Stack>
          )}

          {isSuccess(state) && (
            <Stack gap="md" align="center">
              <IconCheck size={48} color="green" />
              <Title order={4} c="green">
                Success!
              </Title>
              <Text size="sm" c="dimmed">
                Your information has been submitted successfully.
              </Text>
            </Stack>
          )}

          {isError(state) && (
            <Stack gap="md">
              <Alert icon={<IconAlertCircle size={16} />} title="Submission Failed" color="red">
                {state.error}
              </Alert>
            </Stack>
          )}

          <Divider />

          <Group justify="space-between">
            <Button
              variant="subtle"
              onClick={handleBack}
              disabled={
                isPersonal(state) || isSubmitting(state) || isSuccess(state) || isError(state)
              }
            >
              Back
            </Button>

            <Group>
              {(isPersonal(state) || isPreferences(state)) && (
                <Button onClick={handleNext} disabled={!canProceed(state)}>
                  Next
                </Button>
              )}

              {isReview(state) && (
                <Button onClick={handleSubmit} loading={isSubmitting(state)}>
                  Submit
                </Button>
              )}

              {isError(state) && (
                <Button onClick={handleRetry} color="red" variant="light">
                  Retry
                </Button>
              )}

              {isSuccess(state) && <Button onClick={handleClose}>Close</Button>}
            </Group>
          </Group>
        </Stack>
      </Modal>
    </Stack>
  );
};

