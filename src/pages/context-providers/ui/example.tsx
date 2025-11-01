import {
  Box,
  Group,
  Paper,
  SegmentedControl,
  Select,
  Stack,
  Switch,
  Text,
  Title,
} from '@mantine/core';
import React, { createContext, useContext, useMemo, useReducer } from 'react';

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
  itemsPerPage: 10,
  notificationsEnabled: true,
  theme: 'system',
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
  const contextValue = useMemo(() => ({ dispatch, state }), [state]);

  return (
    <UserPreferencesContext.Provider value={contextValue}>
      {children}
    </UserPreferencesContext.Provider>
  );
};

const SettingsPanel: React.FC = () => {
  const { state, dispatch } = useUserPreferences();

  return (
    <Paper p="md" shadow="xs" withBorder>
      <Title mb="sm" order={5}>
        Settings Panel
      </Title>
      <Stack>
        <SegmentedControl
          data={[
            { label: 'Light', value: 'light' },
            { label: 'Dark', value: 'dark' },
            { label: 'System', value: 'system' },
          ]}
          onChange={(value) => dispatch({ payload: value as Theme, type: 'SET_THEME' })}
          value={state.theme}
        />
        <Switch
          checked={state.notificationsEnabled}
          label="Enable Notifications"
          onChange={() => dispatch({ type: 'TOGGLE_NOTIFICATIONS' })}
        />
        <Select
          data={['5', '10', '20', '50']}
          label="Items per page"
          onChange={(value) => dispatch({ payload: Number(value), type: 'SET_ITEMS_PER_PAGE' })}
          value={String(state.itemsPerPage)}
        />
      </Stack>
    </Paper>
  );
};

const DisplayPreferences: React.FC = () => {
  const { state } = useUserPreferences();

  return (
    <Paper p="md" shadow="xs" withBorder>
      <Title mb="sm" order={5}>
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
        border: '1px solid var(--mantine-color-gray-3)',
        borderRadius: 'var(--mantine-radius-sm)',
        color:
          state.theme === 'dark' ? 'var(--mantine-color-gray-0)' : 'var(--mantine-color-dark-6)',
      }}
    >
      <Title mb="xs" order={6}>
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

export const Example: React.FC = () => (
  <UserPreferencesProvider>
    <Title mb="lg" mt="lg" order={4}>
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
