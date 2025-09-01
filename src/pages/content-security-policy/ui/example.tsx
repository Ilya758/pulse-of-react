import { useState, useEffect, useCallback } from 'react';
import {
  Paper,
  Text,
  Group,
  Badge,
  Button,
  Stack,
  MultiSelect,
  Alert,
  Title,
  Divider,
  SimpleGrid,
  Code,
  CopyButton,
  Tooltip,
  Tabs,
  List,
} from '@mantine/core';
import { IconShield, IconCopy, IconTestPipe, IconInfoCircle } from '@tabler/icons-react';
import { CSP_DIRECTIVES } from '../model';
import { getStatusIcon, updatePolicy, testPolicy, applyTemplate } from '../lib';

export const Example = () => {
  const [directives, setDirectives] = useState<Record<string, string[]>>({});
  const [currentPolicy, setCurrentPolicy] = useState<string>('');
  const [testResults, setTestResults] = useState<
    Array<{ directive: string; status: 'pass' | 'fail' | 'warning' }>
  >([]);
  const [reportOnly, setReportOnly] = useState(false);

  const handleUpdatePolicy = useCallback(() => {
    const policy = updatePolicy(directives, reportOnly);
    setCurrentPolicy(policy);
  }, [directives, reportOnly]);

  const updateDirective = (directiveName: string, sources: string[]) => {
    setDirectives((prev) => ({
      ...prev,
      [directiveName]: Array.isArray(sources) ? sources : [],
    }));
  };

  const handleTestPolicy = useCallback(() => {
    setTestResults(testPolicy(directives));
  }, [directives]);

  const handleApplyTemplate = (template: 'strict' | 'permissive' | 'ecommerce') => {
    setDirectives(applyTemplate(template));
    setReportOnly(false);
  };

  useEffect(() => {
    const initialDirectives: Record<string, string[]> = {};
    CSP_DIRECTIVES.forEach((directive) => {
      initialDirectives[directive.name] = [...directive.defaultValue];
    });
    setDirectives(initialDirectives);
  }, []);

  useEffect(() => {
    handleUpdatePolicy();
  }, [handleUpdatePolicy]);

  return (
    <Tabs defaultValue="policy-builder">
      <Tabs.List>
        <Tabs.Tab value="policy-builder" leftSection={<IconShield size={16} />}>
          Policy Builder
        </Tabs.Tab>
        <Tabs.Tab value="examples" leftSection={<IconInfoCircle size={16} />}>
          Examples
        </Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="policy-builder" pt="md">
        <Stack gap="xl">
          <Paper withBorder p="lg">
            <Group mb="md">
              <IconShield size={20} />
              <Title order={4}>CSP Policy Builder</Title>
              <Badge color={reportOnly ? 'yellow' : 'blue'}>
                {reportOnly ? 'Report Only' : 'Enforced'}
              </Badge>
            </Group>

            <Stack gap="lg">
              <Group>
                <Button variant="outline" onClick={() => handleApplyTemplate('strict')} size="sm">
                  Strict Template
                </Button>
                <Button
                  variant="outline"
                  onClick={() => handleApplyTemplate('permissive')}
                  size="sm"
                >
                  Permissive Template
                </Button>
                <Button
                  variant="outline"
                  onClick={() => handleApplyTemplate('ecommerce')}
                  size="sm"
                >
                  E-commerce Template
                </Button>
              </Group>

              <SimpleGrid cols={2} spacing="lg">
                {CSP_DIRECTIVES.map((directive) => {
                  const currentValue = directives[directive.name] || [];

                  return (
                    <div key={directive.name}>
                      <Text size="sm" fw={500} mb="xs">
                        {directive.name}
                      </Text>
                      <Text size="xs" c="dimmed" mb="xs">
                        {directive.description}
                      </Text>
                      <MultiSelect
                        value={currentValue}
                        onChange={(value) => {
                          updateDirective(directive.name, value);
                        }}
                        data={directive.options}
                        placeholder="Select sources"
                        size="sm"
                        searchable
                        clearable
                      />
                    </div>
                  );
                })}
              </SimpleGrid>

              <Divider />

              <Group>
                <Button
                  variant="outline"
                  onClick={() => setReportOnly(!reportOnly)}
                  color={reportOnly ? 'orange' : 'indigo'}
                >
                  {reportOnly ? 'Enforce Policy' : 'Report Only Mode'}
                </Button>
                <Button
                  leftSection={<IconTestPipe size={16} />}
                  onClick={handleTestPolicy}
                  variant="light"
                >
                  Test Policy
                </Button>
              </Group>

              {!!testResults.length && (
                <Alert title="Policy Test Results" variant="light">
                  <Stack gap="xs">
                    {testResults.map((result, index) => (
                      <Group key={index} gap="xs">
                        {getStatusIcon(result.status)}
                        <Text size="sm">
                          <Code>{result.directive}</Code>: {result.status}
                        </Text>
                      </Group>
                    ))}
                  </Stack>
                </Alert>
              )}
            </Stack>
          </Paper>

          <Paper withBorder p="lg">
            <Group mb="md">
              <Title order={4}>Generated Policy</Title>
              <CopyButton value={currentPolicy}>
                {({ copied, copy }) => (
                  <Tooltip label={copied ? 'Copied' : 'Copy policy'}>
                    <Button
                      variant="light"
                      size="sm"
                      onClick={copy}
                      leftSection={<IconCopy size={16} />}
                    >
                      {copied ? 'Copied' : 'Copy'}
                    </Button>
                  </Tooltip>
                )}
              </CopyButton>
            </Group>

            <Code block>{currentPolicy || 'No policy generated'}</Code>

            <Text size="xs" c="dimmed" mt="xs">
              Add this header to your server response:{' '}
              {reportOnly ? 'Content-Security-Policy-Report-Only' : 'Content-Security-Policy'}
            </Text>
          </Paper>
        </Stack>
      </Tabs.Panel>

      <Tabs.Panel value="examples" pt="md">
        <Stack gap="lg">
          <Paper withBorder p="lg">
            <Title order={4} mb="md">
              Common CSP Configurations
            </Title>

            <Tabs defaultValue="strict">
              <Tabs.List>
                <Tabs.Tab value="strict">Strict</Tabs.Tab>
                <Tabs.Tab value="strict-nonce">Strict with Nonces</Tabs.Tab>
                <Tabs.Tab value="strict-hash">Strict with Hashes</Tabs.Tab>
                <Tabs.Tab value="permissive">Permissive</Tabs.Tab>
                <Tabs.Tab value="ecommerce">E-commerce</Tabs.Tab>
                <Tabs.Tab value="development">Development</Tabs.Tab>
              </Tabs.List>

              <Tabs.Panel value="strict" pt="md">
                <Stack gap="md">
                  <Text>
                    <strong>Strict Configuration:</strong> High-security applications with minimal
                    external dependencies.
                  </Text>
                  <Code block>
                    default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self' data:
                    https:; connect-src 'self'; font-src 'self'; object-src 'none'; base-uri 'self';
                    form-action 'self'; frame-ancestors 'none'
                  </Code>

                  <Alert title="Why Strict CSPs Are Better" color="orange" variant="light">
                    <Text size="sm" mb="xs">
                      <strong>Allowlist-based CSPs</strong> (like{' '}
                      <code>script-src www.googleapis.com</code>) are often ineffective against XSS
                      because they can be bypassed by attackers. Strict CSPs based on nonces or
                      hashes avoid these pitfalls.
                    </Text>
                  </Alert>

                  <List size="sm">
                    <List.Item>Blocks all inline scripts and styles</List.Item>
                    <List.Item>Only allows resources from same origin</List.Item>
                    <List.Item>Prevents frame embedding</List.Item>
                    <List.Item>Blocks object/embed elements</List.Item>
                  </List>
                </Stack>
              </Tabs.Panel>

              <Tabs.Panel value="strict-nonce" pt="md">
                <Stack gap="md">
                  <Text>
                    <strong>Strict with Nonces:</strong> High-security applications that need to
                    allow specific inline scripts/styles.
                  </Text>
                  <Code block>
                    script-src 'nonce-abc123def456' 'strict-dynamic'; object-src 'none'; base-uri
                    'none'; default-src 'self'; style-src 'self' 'nonce-abc123def456'; img-src
                    'self' data: https:; connect-src 'self'; font-src 'self'; frame-ancestors
                    'none';
                  </Code>

                  <Alert title="About Nonces" color="blue" variant="light">
                    <Text size="sm" mb="xs">
                      <strong>Nonces</strong> are random numbers used only once that mark specific{' '}
                      <code>&lt;script&gt;</code> tags as trusted. They must be generated at runtime
                      for every response and be unpredictable.
                    </Text>
                    <List size="xs" mt="xs">
                      <List.Item>
                        <strong>How it works:</strong> Server generates a unique nonce per request,
                        includes it in the CSP header, and adds it to trusted script/style tags
                      </List.Item>
                      <List.Item>
                        <strong>Security benefit:</strong> Prevents XSS attacks because attackers
                        cannot guess the correct nonce for a given response
                      </List.Item>
                      <List.Item>
                        <strong>Best for:</strong> Server-rendered HTML pages where you can generate
                        a new nonce for each request
                      </List.Item>
                    </List>
                  </Alert>

                  <Alert title="strict-dynamic Directive" color="green" variant="light">
                    <Text size="sm" mb="xs">
                      The <Code>'strict-dynamic'</Code> directive automatically allows scripts
                      loaded by trusted scripts to execute, reducing deployment effort and enabling
                      dynamic script loading.
                    </Text>
                    <List size="xs" mt="xs">
                      <List.Item>
                        <strong>Trust propagation:</strong> Scripts loaded by nonce/hash-authorized
                        scripts are automatically trusted
                      </List.Item>
                      <List.Item>
                        <strong>Use case:</strong> Perfect for modern frameworks that dynamically
                        load components and third-party libraries
                      </List.Item>
                      <List.Item>
                        <strong>Security:</strong> Maintains the security model while enabling
                        dynamic functionality and reducing CSP configuration complexity
                      </List.Item>
                    </List>
                  </Alert>

                  <List size="sm">
                    <List.Item>
                      <strong>Nonce-based security:</strong> Only scripts with valid nonces can
                      execute
                    </List.Item>
                    <List.Item>
                      <strong>Strict-dynamic:</strong> Enables dynamic script loading from trusted
                      sources
                    </List.Item>
                    <List.Item>
                      <strong>Base URI restriction:</strong> Prevents base tag hijacking attacks
                    </List.Item>
                    <List.Item>
                      <strong>Object blocking:</strong> Completely blocks plugin execution
                    </List.Item>
                  </List>
                </Stack>
              </Tabs.Panel>

              <Tabs.Panel value="strict-hash" pt="md">
                <Stack gap="md">
                  <Text>
                    <strong>Strict with Hashes:</strong> High-security applications that need to
                    allow specific inline scripts/styles without server-side nonce generation.
                  </Text>
                  <Code block>
                    script-src 'sha256-abc123def456789...' 'strict-dynamic'; object-src 'none';
                    base-uri 'none';
                  </Code>

                  <Alert title="About Hash-based CSP" color="blue" variant="light">
                    <Text size="sm" mb="xs">
                      <strong>Hash-based CSP</strong> uses cryptographic hashes of inline script
                      content to determine which scripts are trusted, without requiring server-side
                      nonce generation.
                    </Text>
                    <List size="xs" mt="xs">
                      <List.Item>
                        <strong>How it works:</strong> Calculate SHA-256 hash of script content and
                        include it in the CSP header
                      </List.Item>
                      <List.Item>
                        <strong>Security benefit:</strong> Prevents XSS attacks while allowing
                        specific inline code
                      </List.Item>
                      <List.Item>
                        <strong>Best for:</strong> Static HTML pages or single-page applications
                        that don't use server-side rendering
                      </List.Item>
                    </List>
                  </Alert>

                  <Alert title="When to Use Hash vs Nonce" color="green" variant="light">
                    <Text size="sm" mb="xs">
                      Choose between hash-based and nonce-based CSP based on your application
                      architecture:
                    </Text>
                    <List size="xs" mt="xs">
                      <List.Item>
                        <strong>Use hashes for:</strong> Static pages, cached content, SPAs, or when
                        you can't generate nonces per request
                      </List.Item>
                      <List.Item>
                        <strong>Use nonces for:</strong> Server-rendered pages, dynamic content, or
                        when you need maximum flexibility
                      </List.Item>
                      <List.Item>
                        <strong>Both provide:</strong> Equal security protection against XSS attacks
                      </List.Item>
                    </List>
                  </Alert>

                  <List size="sm">
                    <List.Item>
                      <strong>Hash-based security:</strong> Only scripts with matching hashes can
                      execute
                    </List.Item>
                    <List.Item>
                      <strong>Strict-dynamic:</strong> Enables dynamic script loading from trusted
                      sources
                    </List.Item>
                    <List.Item>
                      <strong>Base URI restriction:</strong> Prevents base tag hijacking attacks
                    </List.Item>
                    <List.Item>
                      <strong>Object blocking:</strong> Completely blocks plugin execution
                    </List.Item>
                  </List>
                </Stack>
              </Tabs.Panel>

              <Tabs.Panel value="permissive" pt="md">
                <Stack gap="md">
                  <Text>
                    <strong>Permissive Configuration:</strong> Development environments or
                    applications requiring flexibility.
                  </Text>
                  <Code block>
                    default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src
                    'self' 'unsafe-inline'; img-src 'self' data: https: http:; connect-src 'self'
                    https: wss:; font-src 'self' data: https:
                  </Code>
                  <List size="sm">
                    <List.Item>Allows inline scripts and styles</List.Item>
                    <List.Item>Allows eval() for development tools</List.Item>
                    <List.Item>Permits external resources over HTTPS</List.Item>
                    <List.Item>Suitable for development and testing</List.Item>
                  </List>
                </Stack>
              </Tabs.Panel>

              <Tabs.Panel value="ecommerce" pt="md">
                <Stack gap="md">
                  <Text>
                    <strong>E-commerce Configuration:</strong> Applications with payment processing
                    and analytics.
                  </Text>
                  <Code block>
                    default-src 'self'; script-src 'self' https://js.stripe.com
                    https://www.google-analytics.com; style-src 'self' 'unsafe-inline'
                    https://fonts.googleapis.com; img-src 'self' data: https:
                    https://www.google-analytics.com; connect-src 'self' https://api.stripe.com
                    https://www.google-analytics.com; font-src 'self' https://fonts.googleapis.com
                    https://fonts.gstatic.com; frame-src 'self' https://js.stripe.com
                  </Code>
                  <List size="sm">
                    <List.Item>Allows Stripe payment processing</List.Item>
                    <List.Item>Permits Google Analytics</List.Item>
                    <List.Item>Includes external font sources</List.Item>
                    <List.Item>Balances security with functionality</List.Item>
                  </List>
                </Stack>
              </Tabs.Panel>

              <Tabs.Panel value="development" pt="md">
                <Stack gap="md">
                  <Text>
                    <strong>Development Configuration:</strong> Local development with hot reloading
                    and debugging.
                  </Text>
                  <Code block>
                    default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src
                    'self' 'unsafe-inline'; img-src 'self' data: https: http:; connect-src 'self'
                    https: wss: ws:; font-src 'self' data: https:; object-src 'none'
                  </Code>
                  <List size="sm">
                    <List.Item>Allows hot reloading and debugging</List.Item>
                    <List.Item>Permits WebSocket connections</List.Item>
                    <List.Item>Includes development tools support</List.Item>
                    <List.Item>Should not be used in production</List.Item>
                  </List>
                </Stack>
              </Tabs.Panel>
            </Tabs>
          </Paper>
        </Stack>
      </Tabs.Panel>
    </Tabs>
  );
};

