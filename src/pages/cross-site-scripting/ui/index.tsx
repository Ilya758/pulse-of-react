import { CodeHighlightTabs } from '@mantine/code-highlight';
import { Alert, Anchor, Code, List, Space, Table, Text, Title } from '@mantine/core';
import { IconFileTypeTs, IconInfoCircle } from '@tabler/icons-react';
import { FC, useEffect } from 'react';

import { SectionBlock } from '@/shared';
import { useTocContent } from '@/widgets/layout';
import {
  CSS_CONTEXT_ENCODING_CODE,
  DOM_PURIFY_EXAMPLE_CODE,
  DOM_XSS_CODE,
  ENCODE_URI_COMPONENT_EXAMPLE_CODE,
  HTML_ATTRIBUTE_ENCODING_CODE,
  JAVASCRIPT_CONTEXT_ENCODING_CODE,
  REFLECTED_XSS_CODE,
  SAFE_DOM_MANIPULATION_CODE,
  SERVER_SIDE_HANDLING_CODE,
  STORED_XSS_CODE,
} from '../model';
import { Example } from './example';

export const CrossSiteScriptingPage: FC = () => {
  const { signalContentLoaded } = useTocContent();

  useEffect(signalContentLoaded, []);

  return (
    <>
      <Space h={4} />
      <Title mb="lg" order={1}>
        Cross-Site Scripting (XSS)
      </Title>

      <SectionBlock initialSpaceAfterDivider="xs" title="Core Concept">
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

      <SectionBlock initialSpaceAfterDivider="xs" title="Varieties of XSS Attacks">
        <Text>XSS vulnerabilities are typically categorized into three main forms:</Text>
        <List mt="md" spacing="xs" type="ordered">
          <List.Item>
            <Text fw={700} span>
              Reflected (Non-Persistent) XSS
            </Text>
          </List.Item>
          <List.Item>
            <Text fw={700} span>
              Stored (Persistent) XSS
            </Text>
          </List.Item>
          <List.Item>
            <Text fw={700} span>
              DOM-based XSS
            </Text>
          </List.Item>
        </List>

        <Title mb="sm" mt="lg" order={4}>
          Reflected XSS
        </Title>
        <Text>
          In this form of attack, a malicious script is bounced off a web server. This can happen in
          responses like error messages or search results, where user input is included in the
          output. The attacker delivers the script to the victim through a specially crafted link,
          which the victim must be persuaded to click.
        </Text>
        <CodeHighlightTabs
          code={[
            {
              code: REFLECTED_XSS_CODE,
              fileName: 'vulnerable-server.ts',
              language: 'ts',
            },
          ]}
          defaultExpanded={false}
          mt="lg"
          radius="md"
          withExpandButton
        />

        <Title mb="sm" mt="lg" order={4}>
          Stored XSS
        </Title>
        <Text>
          This type of attack involves the injection of a script that gets permanently saved on the
          application's servers. This could be in a database, a comment section, a user forum, or
          any other place that stores user content. Unsuspecting users then retrieve and execute
          this script when they access the stored information.
        </Text>
        <CodeHighlightTabs
          code={[
            {
              code: STORED_XSS_CODE,
              fileName: 'vulnerable-server.ts',
              language: 'ts',
            },
          ]}
          defaultExpanded={false}
          mt="lg"
          radius="md"
          withExpandButton
        />

        <Title mb="sm" mt="lg" order={4}>
          DOM-based XSS
        </Title>
        <Text>
          This is a sophisticated variant of the other two types. In a DOM-based attack, the
          malicious script never travels to the server. Instead, it is executed entirely on the
          client-side as a result of the application's own legitimate JavaScript manipulating the
          Document Object Model (DOM) with unsafe user input.
        </Text>
        <CodeHighlightTabs
          code={[
            {
              code: DOM_XSS_CODE,
              fileName: 'vulnerable-component.tsx',
              icon: <IconFileTypeTs size={14} />,
              language: 'tsx',
            },
          ]}
          defaultExpanded={false}
          mt="lg"
          radius="md"
          withExpandButton
        />
      </SectionBlock>

      <SectionBlock initialSpaceAfterDivider="xs" title="Key Prevention Strategies">
        <Text>
          To effectively counter XSS threats, it is essential to isolate untrusted data from the
          active content of the browser. This can be accomplished by employing a mix of output
          encoding, robust HTML sanitization, and secure coding habits.
        </Text>

        <Title mb="sm" mt="xl" order={4}>
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
          code={[
            {
              code: HTML_ATTRIBUTE_ENCODING_CODE,
              fileName: 'html-attribute-context.ts',
              language: 'ts',
            },
            {
              code: JAVASCRIPT_CONTEXT_ENCODING_CODE,
              fileName: 'javascript-context.ts',
              language: 'ts',
            },
            {
              code: CSS_CONTEXT_ENCODING_CODE,
              fileName: 'css-context.ts',
              language: 'ts',
            },
          ]}
          defaultExpanded={false}
          mt="lg"
          radius="md"
          withExpandButton
        />

        <Title mb="sm" mt="lg" order={4}>
          Secure DOM Updates in React
        </Title>
        <Alert
          color="blue"
          icon={<IconInfoCircle />}
          mt="md"
          title="Safe DOM Manipulation"
          variant="light"
        >
          When modifying the DOM with user-provided data, always opt for safe properties like{' '}
          <Code>textContent</Code>. Avoid dangerous methods such as <Code>innerHTML</Code> or{' '}
          <Code>document.write</Code>, as these can execute embedded scripts.
        </Alert>

        <CodeHighlightTabs
          code={[
            {
              code: SAFE_DOM_MANIPULATION_CODE,
              fileName: 'safe-component.tsx',
              icon: <IconFileTypeTs size={14} />,
              language: 'tsx',
            },
          ]}
          defaultExpanded={false}
          mt="lg"
          radius="md"
          withExpandButton
        />

        <Title mb="sm" mt="lg" order={4}>
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
          code={[
            {
              code: ENCODE_URI_COMPONENT_EXAMPLE_CODE,
              fileName: 'encode-uri-component-example.js',
              language: 'ts',
            },
          ]}
          defaultExpanded={false}
          mt="lg"
          radius="md"
          withExpandButton
        />

        <Title mb="sm" mt="lg" order={4}>
          Employing Security Libraries like DOMPurify
        </Title>
        <Text>
          In situations where you need to permit some HTML from users while still preventing XSS, a
          specialized library is the best solution. DOMPurify is a fast and robust XSS sanitizer for
          HTML, MathML, and SVG, making it an excellent choice for such complex cases.
        </Text>
        <CodeHighlightTabs
          code={[
            {
              code: DOM_PURIFY_EXAMPLE_CODE,
              fileName: 'dompurify-example.ts',
              language: 'ts',
            },
          ]}
          defaultExpanded={false}
          mt="lg"
          radius="md"
          withExpandButton
        />
      </SectionBlock>

      <SectionBlock initialSpaceAfterDivider="xs" title="Server-Side Considerations">
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
          code={[
            {
              code: SERVER_SIDE_HANDLING_CODE,
              fileName: 'server-side-handling.ts',
              language: 'ts',
            },
          ]}
          defaultExpanded={false}
          mt="lg"
          radius="md"
          withExpandButton
        />
      </SectionBlock>

      <SectionBlock initialSpaceAfterDivider="xs" title="Practices to Avoid">
        <Text>
          Relying on inadequate or flawed security measures can lead to a false sense of protection.
          The OWASP guidelines highlight several common mistakes to avoid:
        </Text>
        <List mt="md" spacing="xs" type="ordered">
          <List.Item>
            <Text fw={700} span>
              Over-reliance on Content Security Policy (CSP)
            </Text>
            <Text size="sm">
              While CSP is a valuable layer of defense, it should not be your only one. It has
              limitations, such as potential bypasses, lack of support in older browsers, and
              difficulty of implementation in legacy systems.
            </Text>
          </List.Item>
          <List.Item>
            <Text fw={700} span>
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

      <SectionBlock initialSpaceAfterDivider="xs" title="Interactive XSS Simulation">
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
