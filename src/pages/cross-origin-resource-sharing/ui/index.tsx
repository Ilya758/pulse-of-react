import { CodeHighlightTabs } from '@mantine/code-highlight';
import { Alert, Code, List, Space, Table, Text, Title } from '@mantine/core';
import { IconFileTypeTs, IconInfoCircle } from '@tabler/icons-react';
import { FC, useEffect } from 'react';

import { SectionBlock } from '@/shared';
import { useTocContent } from '@/widgets/layout';
import { CORS_EXPRESS_MIDDLEWARE_CODE, CORS_NESTJS_MIDDLEWARE_CODE } from '../model';
import { Example } from './example';

export const CrossOriginResourceSharingPage: FC = () => {
  const { signalContentLoaded } = useTocContent();

  useEffect(signalContentLoaded, []);

  return (
    <>
      <Space h={4} />
      <Title mb="lg" order={1}>
        Cross-Origin Resource Sharing (CORS)
      </Title>

      <SectionBlock initialSpaceAfterDivider="xs" title="Core Concept">
        <Text>
          Cross-Origin Resource Sharing (CORS) is a security mechanism that allows a web page from
          one origin (domain, protocol, or port) to request resources from a different origin. It is
          a critical part of the modern web, enabling secure communication between different
          domains, which is essential for building complex, distributed applications.
        </Text>
        <Text mt="md">
          CORS works by adding new HTTP headers to the standard set of headers. These headers allow
          servers to specify which origins are permitted to read information from a web browser.
          Without CORS, the browser's Same-Origin Policy (SOP) would block such requests, protecting
          users from malicious websites that might try to steal their data.
        </Text>
      </SectionBlock>

      <SectionBlock initialSpaceAfterDivider="xs" title="Why CORS is Necessary">
        <Text>
          The Same-Origin Policy is a strict security measure that prevents scripts on one page from
          accessing data on another page with a different origin. While this is crucial for
          security, it is too restrictive for many legitimate use cases, such as:
        </Text>
        <List mt="md" spacing="xs">
          <List.Item>
            <Text fw={700} span>
              APIs on Different Domains:
            </Text>{' '}
            A single-page application (SPA) hosted on `app.example.com` might need to fetch data
            from an API at `api.example.com`.
          </List.Item>
          <List.Item>
            <Text fw={700} span>
              Third-Party Services:
            </Text>{' '}
            Applications often rely on external services for things like analytics, payments, or
            weather data, which are hosted on different origins.
          </List.Item>
          <List.Item>
            <Text fw={700} span>
              Content Delivery Networks (CDNs):
            </Text>{' '}
            Serving assets like images, scripts, and stylesheets from a CDN improves performance but
            involves cross-origin requests.
          </List.Item>
        </List>
        <Text mt="md">
          CORS provides a standardized, flexible way to relax the Same-Origin Policy, allowing these
          legitimate cross-origin requests while still protecting against malicious ones.
        </Text>
      </SectionBlock>

      <SectionBlock initialSpaceAfterDivider="xs" title="How CORS Works">
        <Text>
          CORS categorizes cross-origin requests into two main types: "simple requests" and
          "preflighted requests."
        </Text>

        <Title mb="sm" mt="lg" order={4}>
          Simple Requests
        </Title>
        <Text>A request is considered "simple" if it meets all of the following conditions:</Text>
        <List mt="md" spacing="xs">
          <List.Item>
            The method is one of <Code>GET</Code>, <Code>HEAD</Code>, or <Code>POST</Code>.
          </List.Item>
          <List.Item>
            Apart from headers set by the user agent (e.g., <Code>User-Agent</Code>,{' '}
            <Code>Connection</Code>), the only allowed headers are <Code>Accept</Code>,{' '}
            <Code>Accept-Language</Code>, <Code>Content-Language</Code>, and{' '}
            <Code>Content-Type</Code>.
          </List.Item>
          <List.Item>
            The <Code>Content-Type</Code> header is one of{' '}
            <Code>application/x-www-form-urlencoded</Code>, <Code>multipart/form-data</Code>, or{' '}
            <Code>text/plain</Code>.
          </List.Item>
        </List>
        <Text mt="md">
          For a simple request, the browser sends the request directly to the server. If the server
          response includes the <Code>Access-Control-Allow-Origin</Code> header with a value that
          matches the requesting origin, the browser allows the client-side code to access the
          response. Otherwise, the request fails.
        </Text>

        <Title mb="sm" mt="lg" order={4}>
          Preflighted Requests
        </Title>
        <Text>
          Any request that does not meet the criteria for a simple request is a "preflighted
          request." This includes requests with methods like <Code>PUT</Code>, <Code>DELETE</Code>,
          or <Code>PATCH</Code>, or requests with custom headers like <Code>Authorization</Code>, or
          a <Code>Content-Type</Code> of <Code>application/json</Code>.
        </Text>
        <Text mt="md">
          Before sending the actual request, the browser sends a "preflight" request using the{' '}
          <Code>OPTIONS</Code> method. This request asks the server for permission to make the
          actual request. The preflight request includes headers like{' '}
          <Code>Access-Control-Request-Method</Code> and <Code>Access-Control-Request-Headers</Code>{' '}
          to inform the server about the intended request.
        </Text>
        <Text mt="md">
          The server responds to the preflight request with information about what is allowed. If
          the server approves the request (by responding with the appropriate{' '}
          <Code>Access-Control-Allow-*</Code> headers), the browser then sends the actual request.
        </Text>
        <Alert
          color="blue"
          icon={<IconInfoCircle />}
          mt="md"
          title="Preflight Requests and Performance"
          variant="light"
        >
          Preflight requests add an extra round-trip to the server, which can impact performance.
          Servers can use the <Code>Access-Control-Max-Age</Code> header to cache the results of a
          preflight request, reducing the number of preflight requests needed.
        </Alert>
      </SectionBlock>

      <SectionBlock initialSpaceAfterDivider="xs" title="Common CORS Headers">
        <Text>
          CORS is managed through a set of HTTP headers exchanged between the browser and the
          server. Here are some of the most important ones:
        </Text>
        <Table mt="md">
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Header</Table.Th>
              <Table.Th>Description</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            <Table.Tr>
              <Table.Td>
                <Code>Access-Control-Allow-Origin</Code>
              </Table.Td>
              <Table.Td>
                Specifies which origin is allowed to access the resource. It can be a specific
                origin (e.g., `https://example.com`) or a wildcard (`*`), although using a wildcard
                is often discouraged for security reasons.
              </Table.Td>
            </Table.Tr>
            <Table.Tr>
              <Table.Td>
                <Code>Access-Control-Allow-Methods</Code>
              </Table.Td>
              <Table.Td>
                Specifies the HTTP methods allowed when accessing the resource. This is used in
                response to a preflight request.
              </Table.Td>
            </Table.Tr>
            <Table.Tr>
              <Table.Td>
                <Code>Access-Control-Allow-Headers</Code>
              </Table.Td>
              <Table.Td>
                Specifies the HTTP headers that can be used in the actual request. This is also used
                in response to a preflight request.
              </Table.Td>
            </Table.Tr>
            <Table.Tr>
              <Table.Td>
                <Code>Access-Control-Allow-Credentials</Code>
              </Table.Td>
              <Table.Td>
                Indicates whether the response to the request can be exposed when the credentials
                flag is true. When used, the <Code>Access-Control-Allow-Origin</Code> header must be
                a specific origin, not a wildcard.
              </Table.Td>
            </Table.Tr>
            <Table.Tr>
              <Table.Td>
                <Code>Access-Control-Max-Age</Code>
              </Table.Td>
              <Table.Td>
                Indicates how long the results of a preflight request can be cached.
              </Table.Td>
            </Table.Tr>
          </Table.Tbody>
        </Table>
      </SectionBlock>

      <SectionBlock initialSpaceAfterDivider="xs" title="CORS Configuration with Express.js">
        <Text>
          In a Node.js backend using the Express.js framework, handling CORS is straightforward with
          the <Code>cors</Code> middleware package. It provides a simple and flexible way to
          configure CORS headers.
        </Text>
        <Text mt="md">
          First, you need to install the package: <Code>npm install cors</Code>
        </Text>
        <CodeHighlightTabs
          code={[
            {
              code: CORS_EXPRESS_MIDDLEWARE_CODE,
              fileName: 'express-cors-example.ts',
              icon: <IconFileTypeTs color="#2596be" size={14} />,
              language: 'ts',
            },
            {
              code: CORS_NESTJS_MIDDLEWARE_CODE,
              fileName: 'nestjs-cors-example.ts',
              icon: <IconFileTypeTs color="#2596be" size={14} />,
              language: 'ts',
            },
          ]}
          defaultExpanded={false}
          mt="lg"
          radius="md"
          withExpandButton
        />
      </SectionBlock>

      <SectionBlock initialSpaceAfterDivider="xs" title="Example: Interactive CORS Simulator">
        <Text mb="md">
          This interactive example demonstrates how different server-side CORS configurations affect
          cross-origin requests from a client application. You can simulate various scenarios and
          see the results in real-time.
        </Text>
        <Example />
      </SectionBlock>

      <Space h="xl" />
    </>
  );
};
