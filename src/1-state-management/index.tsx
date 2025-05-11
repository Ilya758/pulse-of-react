import { useCallback, useMemo, useReducer } from 'react';
import { appReducer, INITIAL_STATE } from './reducer';
import { Row } from './types';
import './index.css';

export const Table = () => {
  const [state, dispatch] = useReducer(appReducer, INITIAL_STATE);

  const handleAddRow = useCallback(() => {
    dispatch({
      type: state.selectedRow ? 'SAVE' : 'ADD',
    });
  }, [state.selectedRow]);

  const handleChangeInputValue = useCallback(
    ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
      dispatch({ type: 'INPUT', payload: { value } });
    },
    [],
  );

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

  const rows = useMemo(
    () =>
      state.rows.map(({ id, value }) => {
        return (
          <tr
            style={{
              cursor: 'pointer',
            }}
            className={state.selectedRow?.id === id ? 'selected' : ''}
            onClick={() => {
              handleEditRow({ id, value });
            }}
            key={id}
          >
            <td>{value}</td>
          </tr>
        );
      }),
    [state.rows, state.selectedRow?.id, handleEditRow],
  );

  return (
    <>
      <h1>Table editor</h1>
      <div>
        <h2>Instructions</h2>
        <ul>
          <li>Enter the value into an input box and hit `Add` to add the value to table</li>
          <li>
            Click for each table's row will let you to edit its content, where you can cancel, save
            or remove the row
          </li>
        </ul>
      </div>
      <div>
        <input
          type="text"
          onChange={handleChangeInputValue}
          value={state.value}
          placeholder="Enter row value"
        />{' '}
        <button onClick={handleAddRow}>{state.selectedRow ? 'Save' : 'Add'}</button>{' '}
        {state.selectedRow && (
          <>
            <button onClick={handleCancel}>Cancel edit</button>{' '}
            <button onClick={handleRemoveRow}>Remove</button>
          </>
        )}
        <br />
      </div>

      <table
        style={{
          border: '1px solid',
          borderCollapse: 'collapse',
        }}
      >
        <thead>
          <tr>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    </>
  );
};

