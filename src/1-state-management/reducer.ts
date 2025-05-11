import { Action, State } from './types';

export const INITIAL_STATE: State = {
  rows: [],
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
};

