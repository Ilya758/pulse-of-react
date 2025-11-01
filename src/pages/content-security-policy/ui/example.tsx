import {
  Alert,
  Badge,
  Button,
  Code,
  CopyButton,
  Divider,
  Group,
  List,
  MultiSelect,
  Paper,
  SimpleGrid,
  Stack,
  Tabs,
  Text,
  Title,
  Tooltip,
} from '@mantine/core';
import { IconCopy, IconInfoCircle, IconShield, IconTestPipe } from '@tabler/icons-react';
import { useCallback, useEffect, useState } from 'react';
import { applyTemplate, getStatusIcon, testPolicy, updatePolicy } from '../lib';
import { CSP_DIRECTIVES } from '../model';

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
        <Tabs.Tab leftSection={<IconShield size={16} />} value="policy-builder">
          Policy Builder
        </Tabs.Tab>
        <Tabs.Tab leftSection={<IconInfoCircle size={16} />} value="examples">
          Examples
        </Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel pt="md" value="policy-builder">
        <Stack gap="xl">
          <Paper p="lg" withBorder>
            <Group mb="md">
              <IconShield size={20} />
              <Title order={4}>CSP Policy Builder</Title>
              <Badge color={reportOnly ? 'yellow' : 'blue'}>
                {reportOnly ? 'Report Only' : 'Enforced'}
              </Badge>
            </Group>

            <Stack gap="lg">
              <Group>
                <Button onClick={() => handleApplyTemplate('strict')} size="sm" variant="outline">
                  Strict Template
                </Button>
                <Button
                  onClick={() => handleApplyTemplate('permissive')}
                  size="sm"
                  variant="outline"
                >
                  Permissive Template
                </Button>
                <Button
                  onClick={() => handleApplyTemplate('ecommerce')}
                  size="sm"
                  variant="outline"
                >
                  E-commerce Template
                </Button>
              </Group>

              <SimpleGrid cols={2} spacing="lg">
                {CSP_DIRECTIVES.map((directive) => {
                  const currentValue = directives[directive.name] || [];

                  return (
                    <div key={directive.name}>
                      <Text fw={500} mb="xs" size="sm">
                        {directive.name}
                      </Text>
                      <Text c="dimmed" mb="xs" size="xs">
                        {directive.description}
                      </Text>
                      <MultiSelect
                        clearable
                        data={directive.options}
                        onChange={(value) => {
                          updateDirective(directive.name, value);
                        }}
                        placeholder="Select sources"
                        searchable
                        size="sm"
                        value={currentValue}
                      />
                    </div>
                  );
                })}
              </SimpleGrid>

              <Divider />

              <Group>
                <Button
                  color={reportOnly ? 'orange' : 'indigo'}
                  onClick={() => setReportOnly(!reportOnly)}
                  variant="outline"
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
                    {testResults.map((result) => (
                      <Group gap="xs" key={result.directive}>
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

          <Paper p="lg" withBorder>
            <Group mb="md">
              <Title order={4}>Generated Policy</Title>
              <CopyButton value={currentPolicy}>
                {({ copied, copy }) => (
                  <Tooltip label={copied ? 'Copied' : 'Copy policy'}>
                    <Button
                      leftSection={<IconCopy size={16} />}
                      onClick={copy}
                      size="sm"
                      variant="light"
                    >
                      {copied ? 'Copied' : 'Copy'}
                    </Button>
                  </Tooltip>
                )}
              </CopyButton>
            </Group>

            <Code block>{currentPolicy || 'No policy generated'}</Code>

            <Text c="dimmed" mt="xs" size="xs">
              Add this header to your server response:{' '}
              {reportOnly ? 'Content-Security-Policy-Report-Only' : 'Content-Security-Policy'}
            </Text>
          </Paper>
        </Stack>
      </Tabs.Panel>

      <Tabs.Panel pt="md" value="examples">
        <Stack gap="lg">
          <Paper p="lg" withBorder>
            <Title mb="md" order={4}>
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

              <Tabs.Panel pt="md" value="strict">
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

                  <Alert color="orange" title="Why Strict CSPs Are Better" variant="light">
                    <Text mb="xs" size="sm">
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

              <Tabs.Panel pt="md" value="strict-nonce">
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

                  <Alert color="blue" title="About Nonces" variant="light">
                    <Text mb="xs" size="sm">
                      <strong>Nonces</strong> are random numbers used only once that mark specific{' '}
                      <code>&lt;script&gt;</code> tags as trusted. They must be generated at runtime
                      for every response and be unpredictable.
                    </Text>
                    <List mt="xs" size="xs">
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

                  <Alert color="green" title="strict-dynamic Directive" variant="light">
                    <Text mb="xs" size="sm">
                      The <Code>'strict-dynamic'</Code> directive automatically allows scripts
                      loaded by trusted scripts to execute, reducing deployment effort and enabling
                      dynamic script loading.
                    </Text>
                    <List mt="xs" size="xs">
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

              <Tabs.Panel pt="md" value="strict-hash">
                <Stack gap="md">
                  <Text>
                    <strong>Strict with Hashes:</strong> High-security applications that need to
                    allow specific inline scripts/styles without server-side nonce generation.
                  </Text>
                  <Code block>
                    script-src 'sha256-abc123def456789...' 'strict-dynamic'; object-src 'none';
                    base-uri 'none';
                  </Code>

                  <Alert color="blue" title="About Hash-based CSP" variant="light">
                    <Text mb="xs" size="sm">
                      <strong>Hash-based CSP</strong> uses cryptographic hashes of inline script
                      content to determine which scripts are trusted, without requiring server-side
                      nonce generation.
                    </Text>
                    <List mt="xs" size="xs">
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

                  <Alert color="green" title="When to Use Hash vs Nonce" variant="light">
                    <Text mb="xs" size="sm">
                      Choose between hash-based and nonce-based CSP based on your application
                      architecture:
                    </Text>
                    <List mt="xs" size="xs">
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

              <Tabs.Panel pt="md" value="permissive">
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

              <Tabs.Panel pt="md" value="ecommerce">
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

              <Tabs.Panel pt="md" value="development">
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
