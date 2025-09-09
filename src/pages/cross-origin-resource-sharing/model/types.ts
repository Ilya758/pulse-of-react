export interface MockServerConfig {
  allowCredentials: boolean;
  allowedOrigin: string;
  allowedMethods: string[];
  allowedHeaders: string[];
  maxAge: string;
}

export interface MockServerRequest {
  credentials?: boolean;
  headers: Record<string, string>;
  method: string;
  origin: string;
}

export type MockServerResponse = {
  body?: { message: string; data: string } | null;
  error?: string;
  headers?: Record<string, string>;
  status?: number;
  statusText?: string;
};

export interface CorsExampleState {
  clientRequest: Omit<MockServerRequest, 'origin' | 'headers'> & { headers: string };
  error: string | null;
  logs: string[];
  serverConfig: MockServerConfig;
}

export type CorsExampleAction =
  | { type: 'ADD_LOG'; payload: string }
  | { type: 'RESET_SIMULATION' }
  | {
      type: 'SET_CLIENT_REQUEST';
      payload: Partial<CorsExampleState['clientRequest']>;
    }
  | {
      type: 'SET_SERVER_CONFIG';
      payload: Partial<MockServerConfig>;
    }
  | { type: 'SET_ERROR'; payload: string | null };

