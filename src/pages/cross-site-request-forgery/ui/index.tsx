import { FC, useEffect } from 'react';
import { Title, Text, List, Space, Code, Table } from '@mantine/core';

import { SectionBlock } from '@/shared';
import { useTocContent } from '@/widgets/layout';

import { Example } from './example';

export const CrossSiteRequestForgery: FC = () => {
  const { signalContentLoaded } = useTocContent();

  useEffect(signalContentLoaded, [signalContentLoaded]);

  return (
    <>
      <Space h={4} />
      <Title order={1} mb="lg">
        Cross-Site Request Forgery (CSRF)
      </Title>

      <SectionBlock title="Core Concept" initialSpaceAfterDivider="xs">
        <Text>
          Cross-Site Request Forgery (CSRF or XSRF) is an attack that tricks a user into performing
          unwanted actions on a web application in which they are currently authenticated. If the
          victim is a regular user, a successful CSRF attack can force the user to perform
          state-changing requests like transferring funds, changing their email address, and so
          forth. If the victim is an administrative account, CSRF can compromise the entire web
          application.
        </Text>
        <Text mt="md">
          The attack works by including a malicious link or script in a context that the user
          trusts, such as an email or another website. When the user clicks the link or loads the
          page, their browser automatically includes any relevant cookies for the target domain,
          including session cookies, thus authenticating the request.
        </Text>
      </SectionBlock>

      <SectionBlock title="How CSRF Attacks Work" initialSpaceAfterDivider="xs">
        <Text>For a CSRF attack to be possible, three conditions must be met:</Text>
        <List spacing="xs" mt="md" type="ordered">
          <List.Item>
            <Text span fw={700}>
              A Relevant Action:
            </Text>{' '}
            There is an action within the application that the attacker wants to induce. This could
            be a privileged action (like modifying permissions for another user) or any action on
            user-specific data (like changing the user's own password).
          </List.Item>
          <List.Item>
            <Text span fw={700}>
              Cookie-Based Session Handling:
            </Text>{' '}
            The application relies solely on session cookies to identify the user who has made the
            request. There is no other mechanism in place for validating user requests.
          </List.Item>
          <List.Item>
            <Text span fw={700}>
              No Unpredictable Request Parameters:
            </Text>{' '}
            The requests that perform the action do not contain any parameters whose values the
            attacker cannot determine or guess. For example, if a function to change a password
            requires the existing password, the attacker would need to know it.
          </List.Item>
        </List>
        <Text mt="md">
          An attacker crafts a malicious request to the target application and embeds it into a
          website they control (or a third-party site). When the victim, who is authenticated on the
          target application, visits the malicious site, the browser executes the request. Because
          the browser automatically sends cookies with requests to the target domain, the malicious
          request is processed as if it were a legitimate one from the victim.
        </Text>
      </SectionBlock>

      <SectionBlock title="Prevention Mechanisms" initialSpaceAfterDivider="xs">
        <Text>
          Several mechanisms can be used to prevent CSRF attacks. The most common and effective ones
          are:
        </Text>

        <Title order={4} mt="lg" mb="sm">
          1. Anti-CSRF Tokens (Synchronizer Token Pattern)
        </Title>
        <Text>
          This is the most common prevention technique. The server generates a unique, unpredictable
          token for each user session and embeds it in a hidden field in HTML forms. When the user
          submits the form, the token is sent back to the server. The server validates that the
          token from the request matches the one stored in the user's session.
        </Text>

        <Title order={4} mt="lg" mb="sm">
          2. SameSite Cookie Attribute
        </Title>
        <Text>
          The <Code>SameSite</Code> cookie attribute is a powerful defense mechanism. It tells the
          browser whether to send cookies with cross-site requests. It can have three values:
        </Text>
        <Table mt="md">
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Attribute Value</Table.Th>
              <Table.Th>Description</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            <Table.Tr>
              <Table.Td>
                <Code>Strict</Code>
              </Table.Td>
              <Table.Td>
                The browser will only send the cookie for same-site requests (requests originating
                from the site that set the cookie). This is the most effective protection but can
                affect user experience if the user follows a link from an external site.
              </Table.Td>
            </Table.Tr>
            <Table.Tr>
              <Table.Td>
                <Code>Lax</Code>
              </Table.Td>
              <Table.Td>
                The browser will send the cookie for same-site requests and top-level navigations
                with safe HTTP methods (like <Code>GET</Code>). This provides a good balance between
                security and usability. This is the default value in modern browsers.
              </Table.Td>
            </Table.Tr>
            <Table.Tr>
              <Table.Td>
                <Code>None</Code>
              </Table.Td>
              <Table.Td>
                The browser will send the cookie with both same-site and cross-site requests. To use
                this setting, the cookie must also have the <Code>Secure</Code> attribute.
              </Table.Td>
            </Table.Tr>
          </Table.Tbody>
        </Table>

        <Title order={4} mt="lg" mb="sm">
          3. Double Submit Cookie Pattern
        </Title>
        <Text>
          In this stateless approach, the server sends a CSRF token to the client as a cookie. The
          client-side script reads the token from the cookie and includes it in a custom HTTP header
          (e.g.,
          <Code>X-CSRF-Token</Code>) with every state-changing request. The server then validates
          that the cookie value and the header value match. An attacker cannot read the cookie from
          a different domain, so they cannot set the custom header correctly.
        </Text>
      </SectionBlock>

      <SectionBlock title="Example: Interactive CSRF Simulator" initialSpaceAfterDivider="xs">
        <Text mb="md">
          This interactive example demonstrates a CSRF attack. You can see how a malicious website
          can trick a user into performing an unintended action on a trusted website. You'll also
          see how anti-CSRF tokens can prevent such attacks.
        </Text>
        <Example />
      </SectionBlock>

      <Space h="xl" />
    </>
  );
};

