export const CONTEXT_CODE = `
import React from 'react';

interface MyContextType {
  someValue: string;
  // Add other shared data or functions here
}

const MyContext = React.createContext<MyContextType | undefined>(undefined);

export default MyContext;
`;

export const EXAMPLE_CODE = `
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

// 1. Define State, Actions, and Types
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

// 2. Define Initial State and Reducer
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
    case 'SET_THEME':
      return { ...state, theme: action.payload };
    case 'TOGGLE_NOTIFICATIONS':
      return { ...state, notificationsEnabled: !state.notificationsEnabled };
    case 'SET_ITEMS_PER_PAGE':
      return { ...state, itemsPerPage: action.payload };
    default:
      return state;
  }
};

// 3. Create Context
const UserPreferencesContext = createContext<UserPreferencesContextType | undefined>(undefined);

// Custom hook to use the context
const useUserPreferences = () => {
  const context = useContext(UserPreferencesContext);
  if (!context) {
    throw new Error('useUserPreferences must be used within a UserPreferencesProvider');
  }
  return context;
};

// 4. Create Provider Component
export const UserPreferencesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(userPreferencesReducer, initialState);

  // Memoize the context value to prevent unnecessary re-renders
  const contextValue = useMemo(() => ({ state, dispatch }), [state, dispatch]);

  return (
    <UserPreferencesContext.Provider value={contextValue}>
      {children}
    </UserPreferencesContext.Provider>
  );
};

// 5. Create Consumer Components

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
    <Paper shadow="xs" p="md" mt="md" withBorder>
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

  // Simulate content that changes based on preferences
  const items = Array.from({ length: state.itemsPerPage }, (_, i) => Item ${'i' + 1});

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

// 6. Main Example Component
export const Example: React.FC = () => {
  return (
    <UserPreferencesProvider>
      <Title order={4} mb="lg">
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
`;

export const PROVIDER_CODE = `
import React, { createContext, useState, useMemo, useContext } from 'react';

// 1. Define Context Type
interface SimpleContextType {
  message: string;
  setMessage: (message: string) => void;
}

// 2. Create Context with a default value
const SimpleContext = createContext<SimpleContextType | undefined>(undefined);

// 3. Create Provider Component
export const SimpleProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [message, setMessage] = useState('Hello from Context!');

  // Memoize the context value to prevent unnecessary re-renders
  const contextValue = useMemo(() => ({ message, setMessage }), [message]);

  return (
    <SimpleContext.Provider value={contextValue}>
      {children}
    </SimpleContext.Provider>
  );
};

// 4. Custom hook to use the context (optional, but good practice)
export const useSimpleContext = () => {
  const context = useContext(SimpleContext);
  if (!context) {
    throw new Error('useSimpleContext must be used within a SimpleProvider');
  }
  return context;
};`;

export const CONSUMER_CODE = `
import React, { useContext } from 'react';

import SimpleContext from './SimpleContext'; 

const MySimpleComponent: React.FC = () => {
  const context = useContext(SimpleContext);

  // Fallback if context is not yet available or for display purposes
  const message = context?.message || 'Context not available'; 
  const setMessage = context?.setMessage || (() => console.warn('SetMessage not available'));

  return (
    <div>
      <p>The message from context is: {message}</p>
      <button onClick={() => setMessage('New message from component!')}>
        Update Message
      </button>
    </div>
  );
};

export default MySimpleComponent;`;

export const ANOTHER_CODE_BLOCK = ''; // Placeholder for any other constants

