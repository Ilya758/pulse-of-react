import {
  Alert,
  Button,
  Code,
  Group,
  JsonInput,
  MultiSelect,
  Paper,
  Select,
  SimpleGrid,
  Stack,
  Switch,
  Tabs,
  TextInput,
  Title,
} from '@mantine/core';
import {
  IconAlertCircle,
  IconBrowser,
  IconCode,
  IconPlayerPlay,
  IconServer,
} from '@tabler/icons-react';
import { useCallback, useReducer } from 'react';
import { If } from '@/shared';
import { mockServer } from '../api';
import { corsExampleReducer, initialState } from '../model';

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
      // biome-ignore lint/nursery/noUselessCatchBinding: error isn't using at all
    } catch (_: unknown) {
      dispatch({ payload: 'Invalid JSON in request headers.', type: 'SET_ERROR' });
      return;
    }

    const request = {
      credentials: includeCredentials,
      headers: parsedHeaders,
      method,
      origin: clientOrigin,
    };

    addLog(`Client at ${clientOrigin} is making a ${method} request.`);

    const isSimpleRequest =
      (method === 'GET' || method === 'HEAD' || method === 'POST')
      && Object.keys(parsedHeaders).every((h) =>
        ['accept', 'accept-language', 'content-language', 'content-type'].includes(h.toLowerCase()),
      )
      && (!parsedHeaders['Content-Type']
        || ['application/x-www-form-urlencoded', 'multipart/form-data', 'text/plain'].includes(
          parsedHeaders['Content-Type'],
        ));

    if (!isSimpleRequest) {
      addLog('This is not a simple request. A preflight request is required.');
      addLog('Sending OPTIONS preflight request...');
      const preflightRequest = { ...request, method: 'OPTIONS' };
      const preflightResponse = mockServer(serverConfig, preflightRequest);

      if (preflightResponse.error) {
        addLog(`Preflight request failed: ${preflightResponse.error}`);
        dispatch({ payload: preflightResponse.error, type: 'SET_ERROR' });
        currentLogs.forEach((log) => {
          dispatch({ payload: log, type: 'ADD_LOG' });
        });
        return;
      }

      addLog('Preflight request successful. Server responded with 204 No Content.');
      addLog(`Preflight response headers: ${JSON.stringify(preflightResponse.headers, null, 2)}`);
    }

    addLog('Sending actual request...');
    const mainResponse = mockServer(serverConfig, request);

    if (mainResponse.error) {
      addLog(`Actual request failed: ${mainResponse.error}`);
      dispatch({ payload: mainResponse.error, type: 'SET_ERROR' });
    } else {
      addLog('Actual request successful!');
      addLog(`Response status: ${mainResponse.status}`);
      addLog(`Response headers: ${JSON.stringify(mainResponse.headers, null, 2)}`);
      addLog(`Response body: ${JSON.stringify(mainResponse.body, null, 2)}`);
    }
    currentLogs.forEach((log) => {
      dispatch({ payload: log, type: 'ADD_LOG' });
    });
  }, [method, includeCredentials, serverConfig, requestHeaders]);

  return (
    <Paper p="lg" withBorder>
      <SimpleGrid cols={2} spacing="xl">
        <Stack>
          <Group>
            <IconServer />
            <Title order={4}>Server Configuration</Title>
          </Group>
          <TextInput
            label="Access-Control-Allow-Origin"
            onChange={(e) =>
              dispatch({
                payload: { allowedOrigin: e.currentTarget.value },
                type: 'SET_SERVER_CONFIG',
              })
            }
            value={allowedOrigin}
          />
          <MultiSelect
            data={['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS']}
            label="Access-Control-Allow-Methods"
            onChange={(payload) =>
              dispatch({ payload: { allowedMethods: payload }, type: 'SET_SERVER_CONFIG' })
            }
            searchable
            value={allowedMethods}
          />
          <MultiSelect
            data={['Content-Type', 'Authorization', 'X-Requested-With']}
            label="Access-Control-Allow-Headers"
            onChange={(payload) =>
              dispatch({ payload: { allowedHeaders: payload }, type: 'SET_SERVER_CONFIG' })
            }
            searchable
            value={allowedHeaders}
          />
          <Switch
            checked={allowCredentials}
            label="Access-Control-Allow-Credentials"
            onChange={(e) =>
              dispatch({
                payload: { allowCredentials: e.currentTarget.checked },
                type: 'SET_SERVER_CONFIG',
              })
            }
          />
          <TextInput
            label="Access-Control-Max-Age"
            onChange={(e) =>
              dispatch({ payload: { maxAge: e.currentTarget.value }, type: 'SET_SERVER_CONFIG' })
            }
            value={maxAge}
          />
        </Stack>

        <Stack>
          <Group>
            <IconBrowser />
            <Title order={4}>Client Request</Title>
          </Group>
          <Select
            data={['GET', 'POST', 'PUT', 'DELETE']}
            label="Request Method"
            onChange={(payload) =>
              dispatch({ payload: { method: payload || 'GET' }, type: 'SET_CLIENT_REQUEST' })
            }
            value={method}
          />
          <JsonInput
            autosize
            formatOnBlur
            label="Request Headers"
            onChange={(payload) =>
              dispatch({ payload: { headers: payload }, type: 'SET_CLIENT_REQUEST' })
            }
            value={requestHeaders}
          />
          <Switch
            checked={includeCredentials}
            label="Include Credentials (e.g., cookies, Authorization header)"
            onChange={(e) =>
              dispatch({
                payload: { credentials: e.currentTarget.checked },
                type: 'SET_CLIENT_REQUEST',
              })
            }
          />
          <Button leftSection={<IconPlayerPlay size={16} />} mt="md" onClick={handleRequest}>
            Make Request
          </Button>
        </Stack>
      </SimpleGrid>

      <If condition={!!logs.length}>
        <Tabs defaultValue="logs" mt="xl">
          <Tabs.List>
            <Tabs.Tab leftSection={<IconCode size={16} />} value="logs">
              Logs
            </Tabs.Tab>
          </Tabs.List>
          <Tabs.Panel pt="md" value="logs">
            {error && (
              <Alert
                color="red"
                icon={<IconAlertCircle size={16} />}
                mb="md"
                title="CORS Error"
                variant="light"
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
