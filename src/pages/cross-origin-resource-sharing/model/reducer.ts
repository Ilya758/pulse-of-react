import { CorsExampleAction, CorsExampleState } from './types';

export const initialState: CorsExampleState = {
  clientRequest: {
    credentials: false,
    headers: '{\n  "Authorization": "Bearer token"\n}',
    method: 'GET',
  },
  error: null,
  logs: [],
  serverConfig: {
    allowCredentials: false,
    allowedHeaders: ['Content-Type', 'Authorization'],
    allowedMethods: ['GET', 'POST', 'OPTIONS'],
    allowedOrigin: 'http://client.example.com',
    maxAge: '600',
  },
};

export function corsExampleReducer(
  state: CorsExampleState,
  action: CorsExampleAction,
): CorsExampleState {
  switch (action.type) {
    case 'SET_SERVER_CONFIG': {
      return {
        ...state,
        serverConfig: { ...state.serverConfig, ...action.payload },
      };
    }

    case 'SET_CLIENT_REQUEST': {
      return {
        ...state,
        clientRequest: { ...state.clientRequest, ...action.payload },
      };
    }

    case 'ADD_LOG': {
      return {
        ...state,
        logs: [...state.logs, action.payload],
      };
    }

    case 'RESET_SIMULATION': {
      return {
        ...state,
        error: null,
        logs: [],
      };
    }

    case 'SET_ERROR': {
      return {
        ...state,
        error: action.payload,
      };
    }

    default: {
      return state;
    }
  }
}
