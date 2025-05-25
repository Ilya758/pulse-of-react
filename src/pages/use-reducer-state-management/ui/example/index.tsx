import { useReducer, useCallback, useMemo } from 'react';
import { appReducer, INITIAL_STATE, Row } from '../../model';
import { Table, Button, TextInput, Group, Stack, Title, Text, List, Paper } from '@mantine/core';
import { Choose, If, Otherwise } from '@/shared';

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
        return (
          <Table.Tr
            key={row.id}
            onClick={() => handleEditRow(row)}
            style={{
              cursor: 'pointer',
            }}
            bg={state.selectedRow?.id === row.id ? 'blue.1' : undefined}
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

        <If condition={!!state.selectedRow}>
          <Button variant="outline" onClick={handleCancel}>
            Cancel Edit
          </Button>
          <Button color="red" onClick={handleRemoveRow}>
            Remove Row
          </Button>
        </If>
      </Group>

      <Choose>
        <If condition={!!state.rows.length}>
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
        </If>
        <Otherwise>
          <Text c="dimmed" ta="center" mt="md">
            No data yet. Add some rows to get started!
          </Text>
        </Otherwise>
      </Choose>
    </Stack>
  );
};

