import { CodeHighlightTabs } from '@mantine/code-highlight';
import { Code, List, Space, Text, Title } from '@mantine/core';
import { IconFileTypeTs, IconInfoCircle } from '@tabler/icons-react';
import { FC, useEffect } from 'react';
import { SectionBlock } from '@/shared';
import { useTocContent } from '@/widgets/layout';
import { CSP_MIDDLEWARE_CODE } from '../model';
import { Example } from './example';

export const ContentSecurityPolicyPage: FC = () => {
  const { signalContentLoaded } = useTocContent();

  useEffect(signalContentLoaded, []);

  return (
    <>
      <Space h={4} />
      <Title mb="lg" order={1}>
        Content Security Policy (CSP)
      </Title>

      <SectionBlock initialSpaceAfterDivider="xs" title="Core Concept">
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

      <SectionBlock initialSpaceAfterDivider="xs" title="Key Benefits">
        <List spacing="xs">
          <List.Item>
            <Text fw={700} span>
              XSS Protection:
            </Text>{' '}
            Prevents execution of malicious scripts injected through user input or compromised
            third-party resources.
          </List.Item>
          <List.Item>
            <Text fw={700} span>
              Resource Control:
            </Text>{' '}
            Controls which domains can load resources like scripts, styles, images, and fonts.
          </List.Item>
          <List.Item>
            <Text fw={700} span>
              Data Injection Prevention:
            </Text>{' '}
            Blocks unauthorized data sources and prevents data exfiltration attacks.
          </List.Item>
          <List.Item>
            <Text fw={700} span>
              Compliance:
            </Text>{' '}
            Helps meet security compliance requirements and security audit standards.
          </List.Item>
        </List>
      </SectionBlock>

      <SectionBlock initialSpaceAfterDivider="xs" title="Directives Overview">
        <Text mb="md">
          CSP directives control different types of resources and behaviors. Here are the most
          commonly used directives:
        </Text>

        <List spacing="md">
          <List.Item>
            <Title mb="xs" mt="sm" order={5}>
              <Code>default-src</Code>:
            </Title>
            <Text>
              Fallback directive for other resource types. If a specific directive isn't set, this
              value is used as a fallback.
            </Text>
          </List.Item>

          <List.Item>
            <Title mb="xs" mt="sm" order={5}>
              <Code>script-src</Code>:
            </Title>
            <Text>
              Controls which scripts can execute. Critical for preventing XSS attacks by restricting
              JavaScript sources.
            </Text>
          </List.Item>

          <List.Item>
            <Title mb="xs" mt="sm" order={5}>
              <Code>style-src</Code>:
            </Title>
            <Text>
              Controls which stylesheets can be loaded. Prevents CSS-based attacks and unauthorized
              styling.
            </Text>
          </List.Item>

          <List.Item>
            <Title mb="xs" mt="sm" order={5}>
              <Code>img-src</Code>:
            </Title>
            <Text>
              Controls which images can be loaded. Prevents data exfiltration through image requests
              and malicious image sources.
            </Text>
          </List.Item>

          <List.Item>
            <Title mb="xs" mt="sm" order={5}>
              <Code>connect-src</Code>:
            </Title>
            <Text>
              Controls which URLs can be loaded via fetch, XHR, WebSocket, or EventSource. Critical
              for API security.
            </Text>
          </List.Item>

          <List.Item>
            <Title mb="xs" mt="sm" order={5}>
              <Code>font-src</Code>:
            </Title>
            <Text>
              Controls which fonts can be loaded. Prevents loading of malicious font files.
            </Text>
          </List.Item>

          <List.Item>
            <Title mb="xs" mt="sm" order={5}>
              <Code>object-src</Code>:
            </Title>
            <Text>Controls which plugins can be loaded. Often set to 'none' for security.</Text>
          </List.Item>

          <List.Item>
            <Title mb="xs" mt="sm" order={5}>
              <Code>frame-src</Code>:
            </Title>
            <Text>Controls which frames can be embedded. Prevents clickjacking attacks.</Text>
          </List.Item>
        </List>
      </SectionBlock>

      <SectionBlock initialSpaceAfterDivider="xs" title="Middleware Integration">
        <Text mb="md">
          In modern web applications, CSP headers are typically set at the server level. The
          following examples show how you can integrate CSP with Node.js backend middleware, such as
          Express.js or Nest.js:
        </Text>
        <CodeHighlightTabs
          code={[
            {
              code: CSP_MIDDLEWARE_CODE,
              fileName: 'csp-middleware.ts',
              icon: <IconFileTypeTs color="#2596be" size={14} />,
              language: 'ts',
            },
          ]}
          defaultExpanded={false}
          mt="md"
          radius="md"
          withExpandButton
        />
      </SectionBlock>

      <SectionBlock initialSpaceAfterDivider="xs" title="Best Practices">
        <List icon={<IconInfoCircle size={16} />} spacing="sm">
          <List.Item>
            <Title c="orange" mb="xs" mt="sm" order={5}>
              Start Strict, Relax Gradually
            </Title>
            <Text>
              Begin with a restrictive policy and gradually allow necessary resources. This approach
              ensures maximum security from the start.
            </Text>
          </List.Item>
          <List.Item>
            <Title c="orange" mb="xs" mt="sm" order={5}>
              Use Nonces and Hashes
            </Title>
            <Text>
              Instead of 'unsafe-inline', use nonces or hashes for inline scripts and styles. This
              provides better security while maintaining functionality.
            </Text>
          </List.Item>
          <List.Item>
            <Title c="orange" mb="xs" mt="sm" order={5}>
              Monitor Violations
            </Title>
            <Text>
              Set up violation reporting to monitor policy violations and identify potential
              security issues or policy misconfigurations.
            </Text>
          </List.Item>
          <List.Item>
            <Title c="orange" mb="xs" mt="sm" order={5}>
              Test in Staging
            </Title>
            <Text>
              Always test CSP policies in a staging environment before deploying to production to
              avoid breaking your application.
            </Text>
          </List.Item>
          <List.Item>
            <Title c="orange" mb="xs" mt="sm" order={5}>
              Regular Policy Reviews
            </Title>
            <Text>
              Regularly review and update your CSP policies to ensure they remain effective and
              don't become overly permissive over time.
            </Text>
          </List.Item>
          <List.Item>
            <Title c="orange" mb="xs" mt="sm" order={5}>
              Use Report-Only Mode
            </Title>
            <Text>
              Start with report-only mode to identify violations without breaking functionality,
              then gradually enforce the policy.
            </Text>
          </List.Item>
          <List.Item>
            <Title c="orange" mb="xs" mt="sm" order={5}>
              Consider Subresource Integrity
            </Title>
            <Text>
              Use Subresource Integrity (SRI) hashes for external resources to ensure they haven't
              been tampered with.
            </Text>
          </List.Item>
          <List.Item>
            <Title c="orange" mb="xs" mt="sm" order={5}>
              Environment-Specific Policies
            </Title>
            <Text>
              Use different CSP policies for different environments (development, staging,
              production) to balance security and functionality.
            </Text>
          </List.Item>
        </List>
      </SectionBlock>

      <SectionBlock initialSpaceAfterDivider="xs" title="Example: Interactive CSP Policy Builder">
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
