import { CorsExampleState, CorsExampleAction } from './types';

export const initialState: CorsExampleState = {
  serverConfig: {
    allowedOrigin: 'http://client.example.com',
    allowedMethods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    allowCredentials: false,
    maxAge: '600',
  },
  clientRequest: {
    method: 'GET',
    headers: '{\n  "Authorization": "Bearer token"\n}',
    credentials: false,
  },
  logs: [],
  error: null,
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
        logs: [],
        error: null,
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

