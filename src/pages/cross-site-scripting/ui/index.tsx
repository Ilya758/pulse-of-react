import { FC, useEffect } from 'react';
import { Title, Text, List, Space, Code, Alert, Table, Anchor } from '@mantine/core';
import { IconFileTypeTs, IconInfoCircle } from '@tabler/icons-react';
import { CodeHighlightTabs } from '@mantine/code-highlight';

import { SectionBlock } from '@/shared';
import { useTocContent } from '@/widgets/layout';

import { Example } from './example';
import {
  DOM_XSS_CODE,
  REFLECTED_XSS_CODE,
  SAFE_DOM_MANIPULATION_CODE,
  STORED_XSS_CODE,
  DOM_PURIFY_EXAMPLE_CODE,
  ENCODE_URI_COMPONENT_EXAMPLE_CODE,
  SERVER_SIDE_HANDLING_CODE,
  HTML_ATTRIBUTE_ENCODING_CODE,
  JAVASCRIPT_CONTEXT_ENCODING_CODE,
  CSS_CONTEXT_ENCODING_CODE,
} from '../model';

export const CrossSiteScriptingPage: FC = () => {
  const { signalContentLoaded } = useTocContent();

  useEffect(signalContentLoaded, [signalContentLoaded]);

  return (
    <>
      <Space h={4} />
      <Title order={1} mb="lg">
        Cross-Site Scripting (XSS)
      </Title>

      <SectionBlock title="Core Concept" initialSpaceAfterDivider="xs">
        <Text>
          Cross-Site Scripting, or XSS, represents a significant security flaw found in many web
          applications. It allows malicious actors to inject client-side scripts into web pages that
          are then viewed by other users. This type of vulnerability can be exploited to circumvent
          security measures like the same-origin policy.
        </Text>
        <Text mt="md">
          The root cause of an XSS vulnerability is the application's failure to properly sanitize
          user-provided data before including it in the generated output. When a user's browser
          processes this output, any embedded malicious scripts are executed as if they were
          legitimate.
        </Text>
        <Text mt="md">
          For an XSS attack to succeed, the attacker must be able to inject and run harmful content
          within a webpage. The cornerstone of a strong defense is, therefore, to safeguard every
          variable within the application. This approach is termed{' '}
          <strong>perfect injection resistance</strong>, a principle that mandates that all
          variables are validated and then correctly escaped or sanitized prior to being rendered.
        </Text>
      </SectionBlock>

      <SectionBlock title="Varieties of XSS Attacks" initialSpaceAfterDivider="xs">
        <Text>XSS vulnerabilities are typically categorized into three main forms:</Text>
        <List spacing="xs" mt="md" type="ordered">
          <List.Item>
            <Text span fw={700}>
              Reflected (Non-Persistent) XSS
            </Text>
          </List.Item>
          <List.Item>
            <Text span fw={700}>
              Stored (Persistent) XSS
            </Text>
          </List.Item>
          <List.Item>
            <Text span fw={700}>
              DOM-based XSS
            </Text>
          </List.Item>
        </List>

        <Title order={4} mt="lg" mb="sm">
          Reflected XSS
        </Title>
        <Text>
          In this form of attack, a malicious script is bounced off a web server. This can happen in
          responses like error messages or search results, where user input is included in the
          output. The attacker delivers the script to the victim through a specially crafted link,
          which the victim must be persuaded to click.
        </Text>
        <CodeHighlightTabs
          withExpandButton
          defaultExpanded={false}
          radius="md"
          mt="lg"
          code={[
            {
              fileName: 'vulnerable-server.ts',
              language: 'ts',
              code: REFLECTED_XSS_CODE,
            },
          ]}
        />

        <Title order={4} mt="lg" mb="sm">
          Stored XSS
        </Title>
        <Text>
          This type of attack involves the injection of a script that gets permanently saved on the
          application's servers. This could be in a database, a comment section, a user forum, or
          any other place that stores user content. Unsuspecting users then retrieve and execute
          this script when they access the stored information.
        </Text>
        <CodeHighlightTabs
          withExpandButton
          defaultExpanded={false}
          radius="md"
          mt="lg"
          code={[
            {
              fileName: 'vulnerable-server.ts',
              language: 'ts',
              code: STORED_XSS_CODE,
            },
          ]}
        />

        <Title order={4} mt="lg" mb="sm">
          DOM-based XSS
        </Title>
        <Text>
          This is a sophisticated variant of the other two types. In a DOM-based attack, the
          malicious script never travels to the server. Instead, it is executed entirely on the
          client-side as a result of the application's own legitimate JavaScript manipulating the
          Document Object Model (DOM) with unsafe user input.
        </Text>
        <CodeHighlightTabs
          withExpandButton
          defaultExpanded={false}
          radius="md"
          mt="lg"
          code={[
            {
              fileName: 'vulnerable-component.tsx',
              language: 'tsx',
              code: DOM_XSS_CODE,
              icon: <IconFileTypeTs size={14} />,
            },
          ]}
        />
      </SectionBlock>

      <SectionBlock title="Key Prevention Strategies" initialSpaceAfterDivider="xs">
        <Text>
          To effectively counter XSS threats, it is essential to isolate untrusted data from the
          active content of the browser. This can be accomplished by employing a mix of output
          encoding, robust HTML sanitization, and secure coding habits.
        </Text>

        <Title order={4} mt="xl" mb="sm">
          Context-Aware Output Encoding
        </Title>
        <Text>
          Output encoding involves transforming untrusted data into a safe format, ensuring it is
          interpreted as text rather than executable instructions. A critical principle, as detailed
          in the{' '}
          <Anchor
            href="https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html"
            target="_blank"
          >
            OWASP XSS Prevention Guide
          </Anchor>
          , is that the encoding method must be tailored to the specific context in which the data
          is rendered.
        </Text>
        <Table mt="md">
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Context</Table.Th>
              <Table.Th>Description & Defense</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            <Table.Tr>
              <Table.Td>HTML Body</Table.Td>
              <Table.Td>
                For data placed between HTML tags (e.g., <Code>{`<span>{data}</span>`}</Code>),
                apply HTML entity encoding. Modern frameworks like React handle this automatically.
              </Table.Td>
            </Table.Tr>
            <Table.Tr>
              <Table.Td>HTML Attributes</Table.Td>
              <Table.Td>
                For data inserted into attribute values (e.g., <Code>{`<div title="{data}">`}</Code>
                ), a more stringent encoding is needed to prevent the data from escaping the
                attribute's confines.
              </Table.Td>
            </Table.Tr>
            <Table.Tr>
              <Table.Td>JavaScript Scopes</Table.Td>
              <Table.Td>
                When injecting data into JavaScript code, the safest method is to embed it within a
                hidden HTML element and then read it, or to serialize it as JSON and parse it in the
                script.
              </Table.Td>
            </Table.Tr>
            <Table.Tr>
              <Table.Td>URL Parameters</Table.Td>
              <Table.Td>
                For data that will be part of a URL query string, always use{' '}
                <Code>encodeURIComponent()</Code>.
              </Table.Td>
            </Table.Tr>
            <Table.Tr>
              <Table.Td>CSS Contexts</Table.Td>
              <Table.Td>
                Avoid placing user input in style contexts. If necessary, use strict validation to
                allow only safe values, or use a library designed for CSS sanitization.
              </Table.Td>
            </Table.Tr>
          </Table.Tbody>
        </Table>

        <CodeHighlightTabs
          withExpandButton
          defaultExpanded={false}
          radius="md"
          mt="lg"
          code={[
            {
              fileName: 'html-attribute-context.ts',
              language: 'ts',
              code: HTML_ATTRIBUTE_ENCODING_CODE,
            },
            {
              fileName: 'javascript-context.ts',
              language: 'ts',
              code: JAVASCRIPT_CONTEXT_ENCODING_CODE,
            },
            {
              fileName: 'css-context.ts',
              language: 'ts',
              code: CSS_CONTEXT_ENCODING_CODE,
            },
          ]}
        />

        <Title order={4} mt="lg" mb="sm">
          Secure DOM Updates in React
        </Title>
        <Alert
          mt="md"
          variant="light"
          color="blue"
          title="Safe DOM Manipulation"
          icon={<IconInfoCircle />}
        >
          When modifying the DOM with user-provided data, always opt for safe properties like{' '}
          <Code>textContent</Code>. Avoid dangerous methods such as <Code>innerHTML</Code> or{' '}
          <Code>document.write</Code>, as these can execute embedded scripts.
        </Alert>

        <CodeHighlightTabs
          withExpandButton
          defaultExpanded={false}
          radius="md"
          mt="lg"
          code={[
            {
              fileName: 'safe-component.tsx',
              language: 'tsx',
              code: SAFE_DOM_MANIPULATION_CODE,
              icon: <IconFileTypeTs size={14} />,
            },
          ]}
        />

        <Title order={4} mt="lg" mb="sm">
          Safe URL Parameter Handling
        </Title>
        <Text>
          To prevent XSS when including user input in a URL, it is imperative to encode it
          correctly. The standard JavaScript function for this is <Code>encodeURIComponent</Code>.
          It effectively neutralizes characters with special meaning in URLs (like <Code>&</Code>,{' '}
          <Code>?</Code>, <Code>=</Code>, and <Code>/</Code>), treating the input as a single,
          secure string.
        </Text>
        <CodeHighlightTabs
          withExpandButton
          defaultExpanded={false}
          radius="md"
          mt="lg"
          code={[
            {
              fileName: 'encode-uri-component-example.js',
              language: 'ts',
              code: ENCODE_URI_COMPONENT_EXAMPLE_CODE,
            },
          ]}
        />

        <Title order={4} mt="lg" mb="sm">
          Employing Security Libraries like DOMPurify
        </Title>
        <Text>
          In situations where you need to permit some HTML from users while still preventing XSS, a
          specialized library is the best solution. DOMPurify is a fast and robust XSS sanitizer for
          HTML, MathML, and SVG, making it an excellent choice for such complex cases.
        </Text>
        <CodeHighlightTabs
          withExpandButton
          defaultExpanded={false}
          radius="md"
          mt="lg"
          code={[
            {
              fileName: 'dompurify-example.ts',
              language: 'ts',
              code: DOM_PURIFY_EXAMPLE_CODE,
            },
          ]}
        />
      </SectionBlock>

      <SectionBlock title="Server-Side Considerations" initialSpaceAfterDivider="xs">
        <Text>
          When a client submits a request with URL-encoded data, most modern web frameworks (such as
          Express.js) will automatically decode these parameters. While this is convenient, it's
          vital to recognize that this decoded data remains untrusted.
        </Text>
        <Text mt="md">
          You must never send this decoded data back to the user without first sanitizing it. Doing
          so creates a classic Reflected XSS vulnerability. A sanitization library should always be
          used on the backend before incorporating user input into any response.
        </Text>
        <CodeHighlightTabs
          withExpandButton
          defaultExpanded={false}
          radius="md"
          mt="lg"
          code={[
            {
              fileName: 'server-side-handling.ts',
              language: 'ts',
              code: SERVER_SIDE_HANDLING_CODE,
            },
          ]}
        />
      </SectionBlock>

      <SectionBlock title="Practices to Avoid" initialSpaceAfterDivider="xs">
        <Text>
          Relying on inadequate or flawed security measures can lead to a false sense of protection.
          The OWASP guidelines highlight several common mistakes to avoid:
        </Text>
        <List spacing="xs" mt="md" type="ordered">
          <List.Item>
            <Text span fw={700}>
              Over-reliance on Content Security Policy (CSP)
            </Text>
            <Text size="sm">
              While CSP is a valuable layer of defense, it should not be your only one. It has
              limitations, such as potential bypasses, lack of support in older browsers, and
              difficulty of implementation in legacy systems.
            </Text>
          </List.Item>
          <List.Item>
            <Text span fw={700}>
              Using Generic HTTP Interceptors or Filters for Sanitization
            </Text>
            <Text size="sm">
              Applying output encoding in a generic middleware is not effective because it lacks the
              necessary context. Such a filter cannot determine if a variable is intended for the
              HTML body, an attribute, or a script, each of which requires a different encoding
              strategy. This can result in both security holes and broken content.
            </Text>
          </List.Item>
        </List>
      </SectionBlock>

      <SectionBlock title="Interactive XSS Simulation" initialSpaceAfterDivider="xs">
        <Text mb="md">
          This hands-on example illustrates how user input can be exploited in an unprotected
          application, and how correct output encoding can thwart XSS attacks.
        </Text>
        <Example />
      </SectionBlock>

      <Space h="xl" />
    </>
  );
};

