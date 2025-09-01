import { FC, useEffect } from 'react';
import { Title, Text, List, Space, Code } from '@mantine/core';
import { IconFileTypeTs, IconInfoCircle } from '@tabler/icons-react';
import { SectionBlock } from '@/shared';
import { useTocContent } from '@/widgets/layout';
import { Example } from './example';
import { CodeHighlightTabs } from '@mantine/code-highlight';
import { CSP_MIDDLEWARE_CODE } from '../model';

export const ContentSecurityPolicyPage: FC = () => {
  const { signalContentLoaded } = useTocContent();

  useEffect(signalContentLoaded, [signalContentLoaded]);

  return (
    <>
      <Space h={4} />
      <Title order={1} mb="lg">
        Content Security Policy (CSP)
      </Title>

      <SectionBlock title="Core Concept" initialSpaceAfterDivider="xs">
        <Text>
          Content Security Policy (CSP) is a security standard that helps prevent various types of
          attacks, particularly Cross-Site Scripting (XSS) and data injection attacks. It works by
          allowing you to specify which sources of content are trusted and allowed to execute in
          your web application.
        </Text>
        <Text mt="md">
          CSP operates on a "deny by default" principle - it blocks all resources that aren't
          explicitly allowed by the policy. This makes it an effective defense-in-depth mechanism
          that works alongside other security measures to protect your React applications.
        </Text>
      </SectionBlock>

      <SectionBlock title="Key Benefits" initialSpaceAfterDivider="xs">
        <List spacing="xs">
          <List.Item>
            <Text span fw={700}>
              XSS Protection:
            </Text>{' '}
            Prevents execution of malicious scripts injected through user input or compromised
            third-party resources.
          </List.Item>
          <List.Item>
            <Text span fw={700}>
              Resource Control:
            </Text>{' '}
            Controls which domains can load resources like scripts, styles, images, and fonts.
          </List.Item>
          <List.Item>
            <Text span fw={700}>
              Data Injection Prevention:
            </Text>{' '}
            Blocks unauthorized data sources and prevents data exfiltration attacks.
          </List.Item>
          <List.Item>
            <Text span fw={700}>
              Compliance:
            </Text>{' '}
            Helps meet security compliance requirements and security audit standards.
          </List.Item>
        </List>
      </SectionBlock>

      <SectionBlock title="Directives Overview" initialSpaceAfterDivider="xs">
        <Text mb="md">
          CSP directives control different types of resources and behaviors. Here are the most
          commonly used directives:
        </Text>

        <List spacing="md">
          <List.Item>
            <Title order={5} mt="sm" mb="xs">
              <Code>default-src</Code>:
            </Title>
            <Text>
              Fallback directive for other resource types. If a specific directive isn't set, this
              value is used as a fallback.
            </Text>
          </List.Item>

          <List.Item>
            <Title order={5} mt="sm" mb="xs">
              <Code>script-src</Code>:
            </Title>
            <Text>
              Controls which scripts can execute. Critical for preventing XSS attacks by restricting
              JavaScript sources.
            </Text>
          </List.Item>

          <List.Item>
            <Title order={5} mt="sm" mb="xs">
              <Code>style-src</Code>:
            </Title>
            <Text>
              Controls which stylesheets can be loaded. Prevents CSS-based attacks and unauthorized
              styling.
            </Text>
          </List.Item>

          <List.Item>
            <Title order={5} mt="sm" mb="xs">
              <Code>img-src</Code>:
            </Title>
            <Text>
              Controls which images can be loaded. Prevents data exfiltration through image requests
              and malicious image sources.
            </Text>
          </List.Item>

          <List.Item>
            <Title order={5} mt="sm" mb="xs">
              <Code>connect-src</Code>:
            </Title>
            <Text>
              Controls which URLs can be loaded via fetch, XHR, WebSocket, or EventSource. Critical
              for API security.
            </Text>
          </List.Item>

          <List.Item>
            <Title order={5} mt="sm" mb="xs">
              <Code>font-src</Code>:
            </Title>
            <Text>
              Controls which fonts can be loaded. Prevents loading of malicious font files.
            </Text>
          </List.Item>

          <List.Item>
            <Title order={5} mt="sm" mb="xs">
              <Code>object-src</Code>:
            </Title>
            <Text>Controls which plugins can be loaded. Often set to 'none' for security.</Text>
          </List.Item>

          <List.Item>
            <Title order={5} mt="sm" mb="xs">
              <Code>frame-src</Code>:
            </Title>
            <Text>Controls which frames can be embedded. Prevents clickjacking attacks.</Text>
          </List.Item>
        </List>
      </SectionBlock>

      <SectionBlock title="Middleware Integration" initialSpaceAfterDivider="xs">
        <Text mb="md">
          In modern web applications, CSP headers are typically set at the server level. The
          following examples show how you can integrate CSP with Node.js backend middleware, such as
          Express.js or Nest.js:
        </Text>
        <CodeHighlightTabs
          withExpandButton
          defaultExpanded={false}
          radius="md"
          mt="md"
          code={[
            {
              fileName: 'csp-middleware.ts',
              language: 'ts',
              code: CSP_MIDDLEWARE_CODE,
              icon: <IconFileTypeTs size={14} color="#2596be" />,
            },
          ]}
        />
      </SectionBlock>

      <SectionBlock title="Best Practices" initialSpaceAfterDivider="xs">
        <List spacing="sm" icon={<IconInfoCircle size={16} />}>
          <List.Item>
            <Title order={5} c="orange" mt="sm" mb="xs">
              Start Strict, Relax Gradually
            </Title>
            <Text>
              Begin with a restrictive policy and gradually allow necessary resources. This approach
              ensures maximum security from the start.
            </Text>
          </List.Item>
          <List.Item>
            <Title order={5} c="orange" mt="sm" mb="xs">
              Use Nonces and Hashes
            </Title>
            <Text>
              Instead of 'unsafe-inline', use nonces or hashes for inline scripts and styles. This
              provides better security while maintaining functionality.
            </Text>
          </List.Item>
          <List.Item>
            <Title order={5} c="orange" mt="sm" mb="xs">
              Monitor Violations
            </Title>
            <Text>
              Set up violation reporting to monitor policy violations and identify potential
              security issues or policy misconfigurations.
            </Text>
          </List.Item>
          <List.Item>
            <Title order={5} c="orange" mt="sm" mb="xs">
              Test in Staging
            </Title>
            <Text>
              Always test CSP policies in a staging environment before deploying to production to
              avoid breaking your application.
            </Text>
          </List.Item>
          <List.Item>
            <Title order={5} c="orange" mt="sm" mb="xs">
              Regular Policy Reviews
            </Title>
            <Text>
              Regularly review and update your CSP policies to ensure they remain effective and
              don't become overly permissive over time.
            </Text>
          </List.Item>
          <List.Item>
            <Title order={5} c="orange" mt="sm" mb="xs">
              Use Report-Only Mode
            </Title>
            <Text>
              Start with report-only mode to identify violations without breaking functionality,
              then gradually enforce the policy.
            </Text>
          </List.Item>
          <List.Item>
            <Title order={5} c="orange" mt="sm" mb="xs">
              Consider Subresource Integrity
            </Title>
            <Text>
              Use Subresource Integrity (SRI) hashes for external resources to ensure they haven't
              been tampered with.
            </Text>
          </List.Item>
          <List.Item>
            <Title order={5} c="orange" mt="sm" mb="xs">
              Environment-Specific Policies
            </Title>
            <Text>
              Use different CSP policies for different environments (development, staging,
              production) to balance security and functionality.
            </Text>
          </List.Item>
        </List>
      </SectionBlock>

      <SectionBlock title="Example: Interactive CSP Policy Builder" initialSpaceAfterDivider="xs">
        <Text mb="md">
          This interactive example demonstrates how to build, test, and validate Content Security
          Policies. You can experiment with different directives and see how they affect resource
          loading and security.
        </Text>
        <Example />
      </SectionBlock>

      <Space h="xl" />
    </>
  );
};

