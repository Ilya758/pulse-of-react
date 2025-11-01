import { INITIAL_PERSONAL, INITIAL_PREFERENCES } from './constants';
import { ModalAction, ModalState } from './types';

export const modalReducer = (state: ModalState, action: ModalAction): ModalState => {
  switch (action.type) {
    case 'OPEN_PERSONAL': {
      return {
        data: INITIAL_PERSONAL,
        type: 'personal',
      };
    }

    case 'UPDATE_PERSONAL': {
      if (state.type === 'personal') {
        return {
          data: { ...state.data, ...action.payload },
          type: 'personal',
        };
      }

      return state;
    }

    case 'NEXT_TO_PREFERENCES': {
      if (state.type === 'personal') {
        return {
          data: state.data,
          preferences: INITIAL_PREFERENCES,
          type: 'preferences',
        };
      }

      return state;
    }

    case 'UPDATE_PREFERENCES': {
      if (state.type === 'preferences') {
        return {
          data: state.data,
          preferences: { ...state.preferences, ...action.payload },
          type: 'preferences',
        };
      }

      return state;
    }

    case 'NEXT_TO_REVIEW': {
      if (state.type === 'preferences') {
        return {
          data: {
            personal: state.data,
            preferences: state.preferences,
          },
          type: 'review',
        };
      }

      return state;
    }

    case 'SUBMIT': {
      if (state.type === 'review' || state.type === 'error') {
        return {
          data: state.data,
          type: 'submitting',
        };
      }

      return state;
    }

    case 'SUBMIT_SUCCESS': {
      if (state.type === 'submitting') {
        return {
          data: state.data,
          type: 'success',
        };
      }

      return state;
    }

    case 'SUBMIT_ERROR': {
      if (state.type === 'submitting') {
        return {
          data: state.data,
          error: action.payload.error,
          type: 'error',
        };
      }

      return state;
    }

    case 'GO_BACK': {
      switch (state.type) {
        case 'preferences': {
          return {
            data: state.data,
            type: 'personal',
          };
        }

        case 'review': {
          return {
            data: state.data.personal,
            preferences: state.data.preferences,
            type: 'preferences',
          };
        }

        case 'error': {
          return {
            data: state.data,
            type: 'review',
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
