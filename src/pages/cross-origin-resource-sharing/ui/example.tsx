import { useReducer, useCallback } from 'react';
import {
  Paper,
  Group,
  Button,
  Stack,
  Select,
  TextInput,
  Switch,
  Code,
  Tabs,
  Title,
  Alert,
  SimpleGrid,
  MultiSelect,
  JsonInput,
} from '@mantine/core';
import {
  IconPlayerPlay,
  IconServer,
  IconCode,
  IconBrowser,
  IconAlertCircle,
} from '@tabler/icons-react';
import { initialState, corsExampleReducer } from '../model';
import { mockServer } from '../api';
import { If } from '@/shared';

export const Example = () => {
  const [{ serverConfig, clientRequest, logs, error }, dispatch] = useReducer(
    corsExampleReducer,
    initialState,
  );
  const { allowedOrigin, allowedMethods, allowedHeaders, allowCredentials, maxAge } = serverConfig;
  const { method, headers: requestHeaders, credentials: includeCredentials } = clientRequest;

  const handleRequest = useCallback(() => {
    dispatch({ type: 'RESET_SIMULATION' });

    let currentLogs: string[] = [];

    const addLog = (log: string) => {
      currentLogs = [...currentLogs, log];
    };

    const clientOrigin = 'http://client.example.com';
    let parsedHeaders: Record<string, string> = {};

    try {
      parsedHeaders = requestHeaders ? JSON.parse(requestHeaders) : {};
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (_: unknown) {
      dispatch({ type: 'SET_ERROR', payload: 'Invalid JSON in request headers.' });
      return;
    }

    const request = {
      origin: clientOrigin,
      method,
      headers: parsedHeaders,
      credentials: includeCredentials,
    };

    addLog(`Client at ${clientOrigin} is making a ${method} request.`);

    const isSimpleRequest =
      (method === 'GET' || method === 'HEAD' || method === 'POST') &&
      Object.keys(parsedHeaders).every((h) =>
        ['accept', 'accept-language', 'content-language', 'content-type'].includes(h.toLowerCase()),
      ) &&
      (!parsedHeaders['Content-Type'] ||
        ['application/x-www-form-urlencoded', 'multipart/form-data', 'text/plain'].includes(
          parsedHeaders['Content-Type'],
        ));

    if (!isSimpleRequest) {
      addLog('This is not a simple request. A preflight request is required.');
      addLog('Sending OPTIONS preflight request...');
      const preflightRequest = { ...request, method: 'OPTIONS' };
      const preflightResponse = mockServer(serverConfig, preflightRequest);

      if (preflightResponse.error) {
        addLog(`Preflight request failed: ${preflightResponse.error}`);
        dispatch({ type: 'SET_ERROR', payload: preflightResponse.error });
        currentLogs.forEach((log) => dispatch({ type: 'ADD_LOG', payload: log }));
        return;
      }

      addLog('Preflight request successful. Server responded with 204 No Content.');
      addLog('Preflight response headers: ' + JSON.stringify(preflightResponse.headers, null, 2));
    }

    addLog('Sending actual request...');
    const mainResponse = mockServer(serverConfig, request);

    if (mainResponse.error) {
      addLog(`Actual request failed: ${mainResponse.error}`);
      dispatch({ type: 'SET_ERROR', payload: mainResponse.error });
    } else {
      addLog('Actual request successful!');
      addLog('Response status: ' + mainResponse.status);
      addLog('Response headers: ' + JSON.stringify(mainResponse.headers, null, 2));
      addLog('Response body: ' + JSON.stringify(mainResponse.body, null, 2));
    }
    currentLogs.forEach((log) => dispatch({ type: 'ADD_LOG', payload: log }));
  }, [method, includeCredentials, serverConfig, requestHeaders]);

  return (
    <Paper withBorder p="lg">
      <SimpleGrid cols={2} spacing="xl">
        <Stack>
          <Group>
            <IconServer />
            <Title order={4}>Server Configuration</Title>
          </Group>
          <TextInput
            label="Access-Control-Allow-Origin"
            value={allowedOrigin}
            onChange={(e) =>
              dispatch({
                type: 'SET_SERVER_CONFIG',
                payload: { allowedOrigin: e.currentTarget.value },
              })
            }
          />
          <MultiSelect
            label="Access-Control-Allow-Methods"
            data={['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS']}
            value={allowedMethods}
            onChange={(payload) =>
              dispatch({ type: 'SET_SERVER_CONFIG', payload: { allowedMethods: payload } })
            }
            searchable
          />
          <MultiSelect
            label="Access-Control-Allow-Headers"
            data={['Content-Type', 'Authorization', 'X-Requested-With']}
            value={allowedHeaders}
            onChange={(payload) =>
              dispatch({ type: 'SET_SERVER_CONFIG', payload: { allowedHeaders: payload } })
            }
            searchable
          />
          <Switch
            label="Access-Control-Allow-Credentials"
            checked={allowCredentials}
            onChange={(e) =>
              dispatch({
                type: 'SET_SERVER_CONFIG',
                payload: { allowCredentials: e.currentTarget.checked },
              })
            }
          />
          <TextInput
            label="Access-Control-Max-Age"
            value={maxAge}
            onChange={(e) =>
              dispatch({ type: 'SET_SERVER_CONFIG', payload: { maxAge: e.currentTarget.value } })
            }
          />
        </Stack>

        <Stack>
          <Group>
            <IconBrowser />
            <Title order={4}>Client Request</Title>
          </Group>
          <Select
            label="Request Method"
            data={['GET', 'POST', 'PUT', 'DELETE']}
            value={method}
            onChange={(payload) =>
              dispatch({ type: 'SET_CLIENT_REQUEST', payload: { method: payload || 'GET' } })
            }
          />
          <JsonInput
            label="Request Headers"
            value={requestHeaders}
            onChange={(payload) =>
              dispatch({ type: 'SET_CLIENT_REQUEST', payload: { headers: payload } })
            }
            formatOnBlur
            autosize
          />
          <Switch
            label="Include Credentials (e.g., cookies, Authorization header)"
            checked={includeCredentials}
            onChange={(e) =>
              dispatch({
                type: 'SET_CLIENT_REQUEST',
                payload: { credentials: e.currentTarget.checked },
              })
            }
          />
          <Button leftSection={<IconPlayerPlay size={16} />} onClick={handleRequest} mt="md">
            Make Request
          </Button>
        </Stack>
      </SimpleGrid>

      <If condition={!!logs.length}>
        <Tabs defaultValue="logs" mt="xl">
          <Tabs.List>
            <Tabs.Tab value="logs" leftSection={<IconCode size={16} />}>
              Logs
            </Tabs.Tab>
          </Tabs.List>
          <Tabs.Panel value="logs" pt="md">
            {error && (
              <Alert
                icon={<IconAlertCircle size={16} />}
                title="CORS Error"
                color="red"
                variant="light"
                mb="md"
              >
                {error}
              </Alert>
            )}
            <Code block>{logs.join('\n')}</Code>
          </Tabs.Panel>
        </Tabs>
      </If>
    </Paper>
  );
};

