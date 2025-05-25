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

