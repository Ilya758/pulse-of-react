import { INITIAL_PERSONAL, INITIAL_PREFERENCES } from './constants';
import { ModalAction, ModalState } from './types';

export const modalReducer = (state: ModalState, action: ModalAction): ModalState => {
  switch (action.type) {
    case 'OPEN_PERSONAL': {
      return {
        type: 'personal',
        data: INITIAL_PERSONAL,
      };
    }

    case 'UPDATE_PERSONAL': {
      if (state.type === 'personal') {
        return {
          type: 'personal',
          data: { ...state.data, ...action.payload },
        };
      }

      return state;
    }

    case 'NEXT_TO_PREFERENCES': {
      if (state.type === 'personal') {
        return {
          type: 'preferences',
          data: state.data,
          preferences: INITIAL_PREFERENCES,
        };
      }

      return state;
    }

    case 'UPDATE_PREFERENCES': {
      if (state.type === 'preferences') {
        return {
          type: 'preferences',
          data: state.data,
          preferences: { ...state.preferences, ...action.payload },
        };
      }

      return state;
    }

    case 'NEXT_TO_REVIEW': {
      if (state.type === 'preferences') {
        return {
          type: 'review',
          data: {
            personal: state.data,
            preferences: state.preferences,
          },
        };
      }

      return state;
    }

    case 'SUBMIT': {
      if (state.type === 'review' || state.type === 'error') {
        return {
          type: 'submitting',
          data: state.data,
        };
      }

      return state;
    }

    case 'SUBMIT_SUCCESS': {
      if (state.type === 'submitting') {
        return {
          type: 'success',
          data: state.data,
        };
      }

      return state;
    }

    case 'SUBMIT_ERROR': {
      if (state.type === 'submitting') {
        return {
          type: 'error',
          data: state.data,
          error: action.payload.error,
        };
      }

      return state;
    }

    case 'GO_BACK': {
      switch (state.type) {
        case 'preferences': {
          return {
            type: 'personal',
            data: state.data,
          };
        }

        case 'review': {
          return {
            type: 'preferences',
            data: state.data.personal,
            preferences: state.data.preferences,
          };
        }

        case 'error': {
          return {
            type: 'review',
            data: state.data,
          };
        }

        default: {
          return state;
        }
      }
    }

    case 'CLOSE': {
      return { type: 'idle' };
    }

    default: {
      return state;
    }
  }
};

