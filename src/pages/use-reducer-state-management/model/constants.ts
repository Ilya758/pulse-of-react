export const REDUCER_CODE = `import { State, Action } from './types';

export const INITIAL_STATE: State = {
  rows: [
    {
      id: 1,
      value: 'Hello',
    },
    {
      id: 2,
      value: 'World',
    },
    {
      id: 3,
      value: 'React',
    },
    {
      id: 4,
      value: 'Design',
    },
    {
      id: 5,
      value: 'Patterns',
    },
  ],
  value: '',
  selectedRow: null,
};

export const appReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'ADD': {
      return {
        ...state,
        rows: [
          ...state.rows,
          {
            id: Math.random(),
            value: state.value,
          },
        ],
        value: '',
        selectedRow: null,
      };
    }

    case 'INPUT': {
      return {
        ...state,
        value: action.payload.value,
      };
    }

    case 'SELECT': {
      const { row } = action.payload;
      const prevSelected = state.selectedRow?.id === row.id;

      return {
        ...state,
        selectedRow: prevSelected ? null : row,
        value: prevSelected ? '' : row.value,
      };
    }

    case 'CANCEL': {
      return {
        ...state,
        selectedRow: null,
        value: '',
      };
    }

    case 'SAVE': {
      return {
        ...state,
        rows: state.rows.map(({ id, value }) => ({
          id,
          value: id === state.selectedRow?.id ? state.value : value,
        })),
        selectedRow: null,
        value: '',
      };
    }

    case 'REMOVE': {
      return {
        ...state,
        rows: state.rows.filter(({ id }) => id !== state.selectedRow?.id),
        selectedRow: null,
        value: '',
      };
    }

    default: {
      return state;
    }
  }
};`;

export const TYPES_CODE = `
export type Action =
  | {
      type: 'ADD';
    }
  | {
      type: 'INPUT';
      payload: {
        value: string;
      };
    }
  | {
      type: 'SELECT';
      payload: {
        row: Row;
      };
    }
  | {
      type: 'SAVE';
    }
  | {
      type: 'CANCEL';
    }
  | {
      type: 'REMOVE';
    };

export interface Row {
  id: number;
  value: string;
}

export interface State {
  rows: Row[];
  value: string;
  selectedRow: Row | null;
}
`;

export const EXAMPLE_CODE = `
import { useReducer, useCallback, useMemo } from 'react';
import { appReducer, INITIAL_STATE, Row } from '../../model';
import { Table, Button, TextInput, Group, Stack, Title, Text, List, Paper } from '@mantine/core';

export const Example = () => {
  const [state, dispatch] = useReducer(appReducer, INITIAL_STATE);

  const handleAddOrSaveRow = useCallback(() => {
    if (!state.value.trim()) return;
    dispatch({
      type: state.selectedRow ? 'SAVE' : 'ADD',
    });
  }, [state.selectedRow, state.value]);

  const handleChangeInputValue = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: 'INPUT', payload: { value: event.target.value } });
  }, []);

  const handleEditRow = useCallback((row: Row) => {
    dispatch({ type: 'SELECT', payload: { row } });
  }, []);

  const handleCancel = useCallback(() => {
    dispatch({ type: 'CANCEL' });
  }, []);

  const handleRemoveRow = useCallback(() => {
    dispatch({
      type: 'REMOVE',
    });
  }, []);

  const tableRows = useMemo(
    () =>
      state.rows.map((row) => {
        const isSelected = state.selectedRow?.id === row.id;
        return (
          <Table.Tr
            key={row.id}
            onClick={() => handleEditRow(row)}
            style={{
              cursor: 'pointer',
            }}
            bg={isSelected ? 'blue.1' : undefined}
          >
            <Table.Td>{row.value}</Table.Td>
          </Table.Tr>
        );
      }),
    [state.rows, state.selectedRow?.id, handleEditRow],
  );

  return (
    <Stack maw={720} mt={16} gap="xl">
      <div>
        <Title order={3} mb="xs">
          Instructions
        </Title>
        <List size="sm">
          <List.Item>
            Enter the value into an input box and hit '{state.selectedRow ? 'Save' : 'Add'}' to
            add/update the value in the table.
          </List.Item>
          <List.Item>
            Click on a table row to select it for editing. You can then cancel, save changes, or
            remove the row.
          </List.Item>
        </List>
      </div>
      <Group>
        <TextInput
          style={{ flexGrow: 1 }}
          placeholder="Enter row value"
          value={state.value}
          onChange={handleChangeInputValue}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              handleAddOrSaveRow();
            }
          }}
        />
        <Button onClick={handleAddOrSaveRow} disabled={!state.value.trim()}>
          {state.selectedRow ? 'Save' : 'Add'}
        </Button>

        {state.selectedRow && (
          <>
            <Button variant="outline" onClick={handleCancel}>
              Cancel Edit
            </Button>
            <Button color="red" onClick={handleRemoveRow}>
              Remove Row
            </Button>
          </>
        )}
      </Group>
      {state.rows.length > 0 ? (
        <Paper shadow="xs" withBorder>
          <Table striped highlightOnHover withTableBorder verticalSpacing="sm">
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Value</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>{tableRows}</Table.Tbody>
          </Table>
        </Paper>
      ) : (
        <Text c="dimmed" ta="center" mt="md">
          No data yet. Add some rows to get started!
        </Text>
      )}
    </Stack>
  );
};
`;
