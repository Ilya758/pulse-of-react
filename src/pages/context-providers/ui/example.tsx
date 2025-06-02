import React, { createContext, useContext, useReducer, useMemo } from 'react';
import {
  Text,
  Paper,
  Title,
  Stack,
  Group,
  Select,
  Switch,
  SegmentedControl,
  Box,
} from '@mantine/core';

type Theme = 'light' | 'dark' | 'system';

interface UserPreferencesState {
  theme: Theme;
  notificationsEnabled: boolean;
  itemsPerPage: number;
}

type Action =
  | { type: 'SET_THEME'; payload: Theme }
  | { type: 'TOGGLE_NOTIFICATIONS' }
  | { type: 'SET_ITEMS_PER_PAGE'; payload: number };

interface UserPreferencesContextType {
  state: UserPreferencesState;
  dispatch: React.Dispatch<Action>;
}

const initialState: UserPreferencesState = {
  theme: 'system',
  notificationsEnabled: true,
  itemsPerPage: 10,
};

const userPreferencesReducer = (
  state: UserPreferencesState,
  action: Action,
): UserPreferencesState => {
  switch (action.type) {
    case 'SET_THEME': {
      return { ...state, theme: action.payload };
    }

    case 'TOGGLE_NOTIFICATIONS': {
      return { ...state, notificationsEnabled: !state.notificationsEnabled };
    }

    case 'SET_ITEMS_PER_PAGE': {
      return { ...state, itemsPerPage: action.payload };
    }

    default:
      return state;
  }
};

const UserPreferencesContext = createContext<UserPreferencesContextType | undefined>(undefined);

const useUserPreferences = () => {
  const context = useContext(UserPreferencesContext);

  if (!context) {
    throw new Error('useUserPreferences must be used within a UserPreferencesProvider');
  }

  return context;
};

export const UserPreferencesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(userPreferencesReducer, initialState);
  const contextValue = useMemo(() => ({ state, dispatch }), [state, dispatch]);

  return (
    <UserPreferencesContext.Provider value={contextValue}>
      {children}
    </UserPreferencesContext.Provider>
  );
};

const SettingsPanel: React.FC = () => {
  const { state, dispatch } = useUserPreferences();

  return (
    <Paper shadow="xs" p="md" withBorder>
      <Title order={5} mb="sm">
        Settings Panel
      </Title>
      <Stack>
        <SegmentedControl
          value={state.theme}
          onChange={(value) => dispatch({ type: 'SET_THEME', payload: value as Theme })}
          data={[
            { label: 'Light', value: 'light' },
            { label: 'Dark', value: 'dark' },
            { label: 'System', value: 'system' },
          ]}
        />
        <Switch
          label="Enable Notifications"
          checked={state.notificationsEnabled}
          onChange={() => dispatch({ type: 'TOGGLE_NOTIFICATIONS' })}
        />
        <Select
          label="Items per page"
          value={String(state.itemsPerPage)}
          onChange={(value) => dispatch({ type: 'SET_ITEMS_PER_PAGE', payload: Number(value) })}
          data={['5', '10', '20', '50']}
        />
      </Stack>
    </Paper>
  );
};

const DisplayPreferences: React.FC = () => {
  const { state } = useUserPreferences();

  return (
    <Paper shadow="xs" p="md" withBorder>
      <Title order={5} mb="sm">
        Current Preferences
      </Title>
      <Text>Theme: {state.theme}</Text>
      <Text>Notifications: {state.notificationsEnabled ? 'Enabled' : 'Disabled'}</Text>
      <Text>Items per page: {state.itemsPerPage}</Text>
    </Paper>
  );
};

const MockContent: React.FC = () => {
  const { state } = useUserPreferences();
  const items = Array.from({ length: state.itemsPerPage }, (_, i) => `Item ${i + 1}`);

  return (
    <Box
      mt="md"
      p="md"
      style={{
        backgroundColor:
          state.theme === 'dark' ? 'var(--mantine-color-dark-6)' : 'var(--mantine-color-gray-0)',
        color:
          state.theme === 'dark' ? 'var(--mantine-color-gray-0)' : 'var(--mantine-color-dark-6)',
        border: '1px solid var(--mantine-color-gray-3)',
        borderRadius: 'var(--mantine-radius-sm)',
      }}
    >
      <Title order={6} mb="xs">
        Mock Content (displaying {state.itemsPerPage} items)
      </Title>
      <Text>Current theme for this box: {state.theme}</Text>
      {state.notificationsEnabled && (
        <Text c="green" size="sm">
          Notifications are ON for this section.
        </Text>
      )}
      <Stack mt="xs">
        {items.map((item) => (
          <Text key={item} size="sm">
            {item}
          </Text>
        ))}
      </Stack>
    </Box>
  );
};

export const Example: React.FC = () => {
  return (
    <UserPreferencesProvider>
      <Title order={4} mt="lg" mb="lg">
        User Preferences Context Example
      </Title>
      <Group align="flex-start">
        <Stack style={{ flex: 1 }}>
          <SettingsPanel />
        </Stack>
        <Stack style={{ flex: 2 }}>
          <DisplayPreferences />
          <MockContent />
        </Stack>
      </Group>
    </UserPreferencesProvider>
  );
};

