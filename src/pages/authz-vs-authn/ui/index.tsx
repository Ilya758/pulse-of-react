import { FC, useEffect } from 'react';
import { Title, Text, List, Space, Alert } from '@mantine/core';
import { IconFileTypeTsx, IconInfoCircle } from '@tabler/icons-react';
import { SectionBlock } from '@/shared';
import { useTocContent } from '@/widgets/layout';
import { Example } from './example';
import { CodeHighlightTabs } from '@mantine/code-highlight';
import {
  SESSION_GUARDS_CODE,
  SESSION_IDLE_TIMEOUT_CODE,
  SESSION_PROVIDER_CODE,
  SESSION_STORAGE_STRATEGIES_CODE,
  GUARD_USAGE_CODE,
} from '../model/constants';

export const AuthZvsAuthNPage: FC = () => {
  const { signalContentLoaded } = useTocContent();

  useEffect(signalContentLoaded, [signalContentLoaded]);

  return (
    <>
      <Space h={4} />
      <Title order={1} mb="lg">
        AuthZ vs AuthN & Session Management
      </Title>

      <SectionBlock title="Core Concept" initialSpaceAfterDivider="xs">
        <Text>
          Authentication (AuthN) verifies identity — confirming who the user is. Authorization
          (AuthZ) governs permissions — what the authenticated user is allowed to do. In React apps,
          AuthN typically integrates with identity providers and client session state, while AuthZ
          lives in UI composition and guards, deciding what components, routes, and actions are
          available.
        </Text>
      </SectionBlock>

      <SectionBlock title="Key Differences" initialSpaceAfterDivider="xs">
        <List spacing="xs">
          <List.Item>
            <Text span fw={700}>
              Goal:
            </Text>{' '}
            AuthN answers “who are you?”, AuthZ answers “what are you allowed to do?”.
          </List.Item>
          <List.Item>
            <Text span fw={700}>
              Timing:
            </Text>{' '}
            AuthN happens before AuthZ; you cannot authorize an anonymous identity.
          </List.Item>
          <List.Item>
            <Text span fw={700}>
              Data:
            </Text>{' '}
            AuthN yields user identity/claims; AuthZ uses roles/claims/policies to allow/deny UI.
          </List.Item>
          <List.Item>
            <Text span fw={700}>
              Placement in React:
            </Text>{' '}
            AuthN integrates with providers/hooks; AuthZ composes guards and conditional rendering.
          </List.Item>
        </List>
      </SectionBlock>

      <SectionBlock title="Session Management" initialSpaceAfterDivider="xs">
        <Text mb="md">
          Session management maintains authenticated user state across navigations, tabs, and idle
          time. In SPA React apps, prefer a small, explicit session provider and keep sensitive
          tokens off localStorage when possible. Use httpOnly cookies server-side for tokens and a
          client-visible session flag for UX.
        </Text>

        <List spacing="sm">
          <List.Item>
            <Text span fw={700}>
              Core responsibilities:
            </Text>{' '}
            persist/rehydrate session, cross-tab sync, idle timeout, refresh/extend.
          </List.Item>
          <List.Item>
            <Text span fw={700}>
              Security notes:
            </Text>{' '}
            avoid storing raw tokens in localStorage; prefer server cookies, rotate/shorten TTLs.
          </List.Item>
        </List>

        <CodeHighlightTabs
          withExpandButton
          defaultExpanded={false}
          radius="md"
          mt="md"
          code={[
            {
              fileName: 'session-provider.tsx',
              language: 'tsx',
              code: SESSION_PROVIDER_CODE,
              icon: <IconFileTypeTsx size={14} color="#2596be" />,
            },
            {
              fileName: 'session-guards.tsx',
              language: 'tsx',
              code: SESSION_GUARDS_CODE,
              icon: <IconFileTypeTsx size={14} color="#2596be" />,
            },
            {
              fileName: 'use-idle-session.ts',
              language: 'tsx',
              code: SESSION_IDLE_TIMEOUT_CODE,
              icon: <IconFileTypeTsx size={14} color="#2596be" />,
            },
            {
              fileName: 'storage-strategies.ts',
              language: 'tsx',
              code: SESSION_STORAGE_STRATEGIES_CODE,
              icon: <IconFileTypeTsx size={14} color="#2596be" />,
            },
          ]}
        />
      </SectionBlock>

      <SectionBlock title="OWASP Guidance: Authorization" initialSpaceAfterDivider="xs">
        <Alert color="yellow" variant="light" mb="md">
          <Text size="sm">
            Client-side authorization improves UX but is not a security boundary. Enforce
            authorization on the server/gateway for every request.
          </Text>
        </Alert>
        <List spacing="sm">
          <List.Item>
            <Text span fw={700}>
              Least privilege:
            </Text>{' '}
            grant only necessary permissions; keep roles/policies minimal.
          </List.Item>
          <List.Item>
            <Text span fw={700}>
              Deny by default:
            </Text>{' '}
            explicitly allow only what is intended; treat unknowns as denied.
          </List.Item>
          <List.Item>
            <Text span fw={700}>
              Validate on every request:
            </Text>{' '}
            object-level checks to prevent IDOR and horizontal privilege escalation.
          </List.Item>
          <List.Item>
            <Text span fw={700}>
              Prefer ABAC/ReBAC where suitable:
            </Text>{' '}
            use attributes/relationships for complex, contextual policies; combine with RBAC.
          </List.Item>
          <List.Item>
            <Text span fw={700}>
              Right location:
            </Text>{' '}
            enforce server-side; treat UI checks as hints only.
          </List.Item>
          <List.Item>
            <Text span fw={700}>
              Static assets:
            </Text>{' '}
            include in policies if not public; configure storage ACLs appropriately.
          </List.Item>
          <List.Item>
            <Text span fw={700}>
              Logging and testing:
            </Text>{' '}
            log access decisions and create unit/integration tests for authorization flows.
          </List.Item>
        </List>
      </SectionBlock>

      <SectionBlock title="OWASP Guidance: Authentication" initialSpaceAfterDivider="xs">
        <Alert color="yellow" variant="light" mb="md">
          <Text size="sm">
            Authentication is typically handled by your backend/IdP. In React, avoid handling
            secrets directly; rely on redirects/tokens via secure cookies and render-only UX state.
          </Text>
        </Alert>
        <List spacing="sm">
          <List.Item>
            <Text span fw={700}>
              MFA and strong credentials:
            </Text>{' '}
            encourage multi-factor auth; do not weaken flows with client-only checks.
          </List.Item>
          <List.Item>
            <Text span fw={700}>
              Generic errors:
            </Text>{' '}
            avoid revealing whether username or password is incorrect; show generic messages.
          </List.Item>
          <List.Item>
            <Text span fw={700}>
              Brute-force defense:
            </Text>{' '}
            implement server-side throttling/lockouts; client can add incremental delays.
          </List.Item>
          <List.Item>
            <Text span fw={700}>
              Transport security:
            </Text>{' '}
            require HTTPS; avoid exposing tokens to JavaScript via non-httpOnly cookies.
          </List.Item>
          <List.Item>
            <Text span fw={700}>
              Password hygiene (server-side):
            </Text>{' '}
            hashing with modern algorithms, rotation policies, and credential lifecycle.
          </List.Item>
        </List>
      </SectionBlock>

      <SectionBlock title="OWASP Guidance: Session Management" initialSpaceAfterDivider="xs">
        <List spacing="sm">
          <List.Item>
            <Text span fw={700}>
              Use secure cookies for tokens:
            </Text>{' '}
            httpOnly, Secure, SameSite; prefer server-managed sessions over localStorage tokens.
          </List.Item>
          <List.Item>
            <Text span fw={700}>
              Regenerate identifiers:
            </Text>{' '}
            on login/privilege change to prevent session fixation.
          </List.Item>
          <List.Item>
            <Text span fw={700}>
              Idle and absolute timeouts:
            </Text>{' '}
            sign out on inactivity and cap maximum session lifetime.
          </List.Item>
          <List.Item>
            <Text span fw={700}>
              Logout invalidation:
            </Text>{' '}
            server-side revoke; on the client, clear state and broadcast logout to other tabs.
          </List.Item>
          <List.Item>
            <Text span fw={700}>
              CSRF protection:
            </Text>{' '}
            for cookie-based sessions, use SameSite and CSRF tokens/Double Submit patterns.
          </List.Item>
          <List.Item>
            <Text span fw={700}>
              Cross-tab sync:
            </Text>{' '}
            use storage events/BroadcastChannel to reflect session changes across tabs.
          </List.Item>
        </List>
      </SectionBlock>

      <SectionBlock title="Key Caveats & Best Practices" initialSpaceAfterDivider="xs">
        <List spacing="sm" icon={<IconInfoCircle size={16} />}>
          <List.Item>
            <Title order={5} c="orange" mt="sm" mb="xs">
              Separate concerns
            </Title>
            <Text>
              Use an auth provider for identity and a small authorization API for permissions.
            </Text>
          </List.Item>
          <List.Item>
            <Title order={5} c="orange" mt="sm" mb="xs">
              Guard at the edges
            </Title>
            <Text>Protect routes and feature entry points; keep leaf components simple.</Text>
          </List.Item>
          <List.Item>
            <Title order={5} c="orange" mt="sm" mb="xs">
              Prefer declarative UI
            </Title>
            <Text>Render-only what the user can access with composable guard components.</Text>
          </List.Item>
          <List.Item>
            <Title order={5} c="orange" mt="sm" mb="xs">
              Client checks are hints, not security
            </Title>
            <Text>
              Treat UI guards as UX helpers only. Always enforce authorization on the server and
              handle <code>401/403</code> centrally.
            </Text>
          </List.Item>
          <List.Item>
            <Title order={5} c="orange" mt="sm" mb="xs">
              Avoid CLS (Cumulative Layout Shift)
            </Title>
            <Text>
              Delay rendering protected content until AuthN/AuthZ is resolved; use skeletons or
              placeholders to prevent flash of unauthorized UI.
            </Text>
          </List.Item>
          <List.Item>
            <Title order={5} c="orange" mt="sm" mb="xs">
              Handle async races
            </Title>
            <Text>
              Debounce or cancel in-flight permission fetches on navigation; ensure guards react to
              session changes and token refresh without stale decisions.
            </Text>
          </List.Item>
          <List.Item>
            <Title order={5} c="orange" mt="sm" mb="xs">
              Cache with invalidation
            </Title>
            <Text>
              Memoize permission checks per user/session and invalidate on login, role change, or
              refresh to balance performance and correctness.
            </Text>
          </List.Item>
          <List.Item>
            <Title order={5} c="orange" mt="sm" mb="xs">
              SSR/CSR hydration safety
            </Title>
            <Text>
              On SSR, prefer rendering neutral placeholders for protected areas to avoid hydration
              mismatches when the client resolves session state.
            </Text>
          </List.Item>
          <List.Item>
            <Title order={5} c="orange" mt="sm" mb="xs">
              Test critical paths
            </Title>
            <Text>
              Add unit/integration tests for guard logic and stories for allowed/denied states to
              prevent policy drift.
            </Text>
          </List.Item>
          <List.Item>
            <Title order={5} c="orange" mt="sm" mb="xs">
              Optimize re-renders
            </Title>
            <Text>
              Keep guard components small and memoized; avoid passing full user objects through
              context when a minimal claims snapshot suffices.
            </Text>
          </List.Item>
        </List>
      </SectionBlock>

      <SectionBlock title="Example: Route and Component Guards" initialSpaceAfterDivider="xs">
        <Text mb="md">
          Below is an interactive example showing a minimal AuthN provider and simple AuthZ helpers
          to guard routes, sections, and buttons purely on the client.
        </Text>
        <CodeHighlightTabs
          withExpandButton
          defaultExpanded={false}
          radius="md"
          mb="lg"
          code={[
            {
              fileName: 'guard-usage.tsx',
              language: 'tsx',
              code: GUARD_USAGE_CODE,
              icon: <IconFileTypeTsx size={14} color="#2596be" />,
            },
          ]}
        />
        <Example />
      </SectionBlock>

      <Space h="xl" />
    </>
  );
};

