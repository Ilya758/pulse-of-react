import {
  Alert,
  Button,
  Checkbox,
  Divider,
  Group,
  Modal,
  Select,
  Stack,
  Stepper,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import {
  IconAlertCircle,
  IconCheck,
  IconFileText,
  IconSettings,
  IconUser,
} from '@tabler/icons-react';
import { useCallback, useReducer, useState } from 'react';
import {
  canProceed,
  getCurrentStep,
  isError,
  isPersonal,
  isPreferences,
  isReview,
  isSubmitting,
  isSuccess,
  submitForm,
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
    dispatch({ payload: { [field]: value }, type: 'UPDATE_PERSONAL' });
  }, []);

  const handlePreferencesUpdate = useCallback(
    (field: keyof PreferencesData, value: string | boolean) => {
      dispatch({ payload: { [field]: value }, type: 'UPDATE_PREFERENCES' });
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
            payload: { error: error instanceof Error ? error.message : 'Unknown error' },
            type: 'SUBMIT_ERROR',
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
            payload: { error: error instanceof Error ? error.message : 'Unknown error' },
            type: 'SUBMIT_ERROR',
          });
        });
    }
  }, [state]);

  return (
    <Stack gap="xl" maw={720} mt={16}>
      <div>
        <Title mb="xs" order={3}>
          Multi-Step Modal with State Machine
        </Title>
        <Text c="dimmed" size="sm">
          This example demonstrates how state machines can manage complex multi-step processes with
          form validation, navigation, and submission states.
        </Text>
      </div>

      <Button onClick={handleOpen}>Open Multi-Step Modal</Button>

      <Modal
        closeOnClickOutside={!isSubmitting(state)}
        closeOnEscape={!isSubmitting(state)}
        onClose={handleClose}
        opened={opened}
        size="lg"
        title="User Registration"
        withCloseButton={!isSubmitting(state)}
      >
        <Stack gap="xl">
          <Stepper active={getCurrentStep(state)} completedIcon={<IconCheck size={16} />} size="sm">
            <Stepper.Step icon={<IconUser size={16} />} label="Personal Info" />
            <Stepper.Step icon={<IconSettings size={16} />} label="Preferences" />
            <Stepper.Step icon={<IconFileText size={16} />} label="Review" />
          </Stepper>

          <Divider />

          {isPersonal(state) && (
            <Stack gap="md">
              <Title order={4}>Personal Information</Title>
              <TextInput
                label="First Name"
                onChange={(e) => handlePersonalUpdate('firstName', e.target.value)}
                placeholder="Enter your first name"
                required
                value={state.data.firstName}
              />
              <TextInput
                label="Last Name"
                onChange={(e) => handlePersonalUpdate('lastName', e.target.value)}
                placeholder="Enter your last name"
                required
                value={state.data.lastName}
              />
              <TextInput
                label="Phone Number"
                onChange={(e) => handlePersonalUpdate('phoneNumber', e.target.value)}
                placeholder="Enter your phone number"
                required
                value={state.data.phoneNumber}
              />
            </Stack>
          )}

          {isPreferences(state) && (
            <Stack gap="md">
              <Title order={4}>Preferences</Title>
              <Select
                data={[
                  { label: 'Light Theme', value: 'light' },
                  { label: 'Dark Theme', value: 'dark' },
                  { label: 'Auto (System)', value: 'auto' },
                ]}
                label="Theme"
                onChange={(value) => handlePreferencesUpdate('theme', value || 'light')}
                placeholder="Choose your theme"
                required
                value={state.preferences.theme}
              />
              <Checkbox
                checked={state.preferences.notifications}
                label="Enable notifications"
                onChange={(e) => handlePreferencesUpdate('notifications', e.target.checked)}
              />
              <Checkbox
                checked={state.preferences.newsletter}
                label="Subscribe to newsletter"
                onChange={(e) => handlePreferencesUpdate('newsletter', e.target.checked)}
              />
            </Stack>
          )}

          {isReview(state) && (
            <Stack gap="md">
              <Title order={4}>Review Your Information</Title>

              <div>
                <Title mb="xs" order={5}>
                  Personal Information
                </Title>
                <Text size="sm">
                  Name: {state.data.personal.firstName} {state.data.personal.lastName}
                </Text>
                <Text size="sm">Phone: {state.data.personal.phoneNumber}</Text>
              </div>

              <div>
                <Title mb="xs" order={5}>
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
            <Stack align="center" gap="md">
              <Title order={4}>Submitting...</Title>
              <Text c="dimmed" size="sm">
                Please wait while we process your information.
              </Text>
            </Stack>
          )}

          {isSuccess(state) && (
            <Stack align="center" gap="md">
              <IconCheck color="green" size={48} />
              <Title c="green" order={4}>
                Success!
              </Title>
              <Text c="dimmed" size="sm">
                Your information has been submitted successfully.
              </Text>
            </Stack>
          )}

          {isError(state) && (
            <Stack gap="md">
              <Alert color="red" icon={<IconAlertCircle size={16} />} title="Submission Failed">
                {state.error}
              </Alert>
            </Stack>
          )}

          <Divider />

          <Group justify="space-between">
            <Button
              disabled={
                isPersonal(state) || isSubmitting(state) || isSuccess(state) || isError(state)
              }
              onClick={handleBack}
              variant="subtle"
            >
              Back
            </Button>

            <Group>
              {(isPersonal(state) || isPreferences(state)) && (
                <Button disabled={!canProceed(state)} onClick={handleNext}>
                  Next
                </Button>
              )}

              {isReview(state) && (
                <Button loading={isSubmitting(state)} onClick={handleSubmit}>
                  Submit
                </Button>
              )}

              {isError(state) && (
                <Button color="red" onClick={handleRetry} variant="light">
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
