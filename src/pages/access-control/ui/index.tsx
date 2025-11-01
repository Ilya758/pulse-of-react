import { CodeHighlightTabs } from '@mantine/code-highlight';
import { Alert, List, Space, Text, Title } from '@mantine/core';
import { IconFileTypeTs, IconFileTypeTsx, IconInfoCircle } from '@tabler/icons-react';
import { FC, useEffect } from 'react';
import { SectionBlock } from '@/shared';
import { useTocContent } from '@/widgets/layout';
import {
  ABAC_IMPLEMENTATION_CODE,
  ACCESS_CONTROL_SIGNATURE_CODE,
  EXAMPLE_USAGE_CODE,
  HYBRID_IMPLEMENTATION_CODE,
  PRACTICAL_DASHBOARD_EXAMPLE_CODE,
  RBAC_IMPLEMENTATION_CODE,
  REACT_FEATURE_TOGGLE_CODE,
  ROLE_DEFINITIONS_CODE,
} from '../model';
import { Example } from './example';

export const AccessControlPage: FC = () => {
  const { signalContentLoaded } = useTocContent();

  useEffect(signalContentLoaded, []);

  return (
    <>
      <Space h={4} />
      <Title mb="lg" order={1}>
        Access Control
      </Title>

      <SectionBlock initialSpaceAfterDivider="xs" title="Core Concept">
        <Text>
          Access Control is a security pattern that determines who can access what resources and
          under what conditions. It's fundamental to application security and can be implemented
          using various models including Role-Based Access Control (RBAC) and Attribute-Based Access
          Control (ABAC). This pattern provides centralized, consistent, and secure authorization
          logic across your application.
        </Text>
        <Text mt="md">
          Access Control systems typically consist of three main components: users (subjects),
          resources (objects), and policies (rules that determine access). The system evaluates
          access requests against these policies to make authorization decisions.
        </Text>
      </SectionBlock>

      <SectionBlock initialSpaceAfterDivider="xs" title="Pattern Signature">
        <Text mb="md">
          The Access Control pattern provides a centralized service for making authorization
          decisions. It abstracts the complexity of permission checking and provides a clean API for
          the rest of your application.
        </Text>
        <CodeHighlightTabs
          code={[
            {
              code: ACCESS_CONTROL_SIGNATURE_CODE,
              fileName: 'access-control-signature.ts',
              icon: <IconFileTypeTs color="#2596be" size={14} />,
              language: 'tsx',
            },
          ]}
          defaultExpanded={false}
          radius="md"
          withExpandButton={true}
        />
      </SectionBlock>

      <SectionBlock initialSpaceAfterDivider="xs" title="Access Control Models">
        <Text mb="lg">
          There are several access control models, each with different strengths and use cases:
        </Text>

        <List spacing="md">
          <List.Item>
            <Title mb="xs" mt="sm" order={5}>
              Role-Based Access Control (RBAC):
            </Title>
            <Text>
              Users are assigned roles, and roles are assigned permissions. This model is simple to
              understand and implement, making it popular for most applications. Users can have
              multiple roles, and permissions are inherited through role assignments.
            </Text>
          </List.Item>

          <List.Item>
            <Title mb="xs" mt="sm" order={5}>
              Attribute-Based Access Control (ABAC):
            </Title>
            <Text>
              Access decisions are based on attributes of the user, resource, action, and context.
              This model is more flexible and can handle complex scenarios like time-based access,
              location-based restrictions, and dynamic conditions.
            </Text>
          </List.Item>

          <List.Item>
            <Title mb="xs" mt="sm" order={5}>
              Hybrid Models:
            </Title>
            <Text>
              Combine RBAC and ABAC to get the simplicity of roles with the flexibility of
              attributes. This approach is often used in enterprise applications where you need both
              structured role management and dynamic access control.
            </Text>
          </List.Item>
        </List>
      </SectionBlock>

      <SectionBlock initialSpaceAfterDivider="xs" title="RBAC Implementation">
        <Text mb="md">
          Role-Based Access Control is the most common access control model. It's simple to
          understand and implement, making it suitable for most applications.
        </Text>
        <CodeHighlightTabs
          code={[
            {
              code: RBAC_IMPLEMENTATION_CODE,
              fileName: 'rbac-service.ts',
              icon: <IconFileTypeTs color="#2596be" size={14} />,
              language: 'tsx',
            },
            {
              code: ROLE_DEFINITIONS_CODE,
              fileName: 'constants.ts',
              icon: <IconFileTypeTs color="#2596be" size={14} />,
              language: 'tsx',
            },
          ]}
          defaultExpanded={false}
          radius="md"
          withExpandButton={true}
        />
      </SectionBlock>

      <SectionBlock initialSpaceAfterDivider="xs" title="ABAC Implementation">
        <Text mb="md">
          Attribute-Based Access Control provides more flexibility by considering various attributes
          when making access decisions. This allows for complex policies based on time, location,
          user attributes, and more.
        </Text>
        <CodeHighlightTabs
          code={[
            {
              code: ABAC_IMPLEMENTATION_CODE,
              fileName: 'abac-service.ts',
              icon: <IconFileTypeTs color="#2596be" size={14} />,
              language: 'tsx',
            },
          ]}
          defaultExpanded={false}
          radius="md"
          withExpandButton={true}
        />
      </SectionBlock>

      <SectionBlock initialSpaceAfterDivider="xs" title="Hybrid Implementation">
        <Text mb="md">
          Hybrid access control combines the simplicity of RBAC with the flexibility of ABAC. This
          approach first checks role-based permissions, then applies attribute-based policies for
          more granular control.
        </Text>
        <CodeHighlightTabs
          code={[
            {
              code: HYBRID_IMPLEMENTATION_CODE,
              fileName: 'hybrid-service.ts',
              icon: <IconFileTypeTs color="#2596be" size={14} />,
              language: 'tsx',
            },
          ]}
          defaultExpanded={false}
          radius="md"
          withExpandButton={true}
        />
      </SectionBlock>

      <SectionBlock initialSpaceAfterDivider="xs" title="Best Practices">
        <List icon={<IconInfoCircle size={16} />} spacing="sm">
          <List.Item>
            <Title c="orange" mb="xs" mt="sm" order={5}>
              Principle of Least Privilege:
            </Title>
            <Text>
              Grant users only the minimum permissions necessary to perform their tasks. This
              reduces the risk of unauthorized access and limits the potential damage from security
              breaches.
            </Text>
          </List.Item>

          <List.Item>
            <Title c="orange" mb="xs" mt="sm" order={5}>
              Centralized Authorization:
            </Title>
            <Text>
              Keep all access control logic in one place. This makes it easier to audit, maintain,
              and update security policies across your application.
            </Text>
          </List.Item>

          <List.Item>
            <Title c="orange" mb="xs" mt="sm" order={5}>
              Regular Access Reviews:
            </Title>
            <Text>
              Periodically review user permissions and roles to ensure they're still appropriate.
              Remove unnecessary permissions and update roles as organizational needs change.
            </Text>
          </List.Item>

          <List.Item>
            <Title c="orange" mb="xs" mt="sm" order={5}>
              Audit Logging:
            </Title>
            <Text>
              Log all access decisions and permission changes. This provides visibility into who
              accessed what and when, which is crucial for security monitoring and compliance.
            </Text>
          </List.Item>

          <List.Item>
            <Title c="orange" mb="xs" mt="sm" order={5}>
              Caching Strategy:
            </Title>
            <Text>
              Cache access control decisions when appropriate, but ensure cache invalidation when
              permissions change. This improves performance while maintaining security.
            </Text>
          </List.Item>
        </List>
      </SectionBlock>

      <SectionBlock initialSpaceAfterDivider="xs" title="Feature Toggles & Access Control">
        <Text mb="lg">
          Feature toggles (also known as feature flags) and access control are complementary
          patterns that work together to provide granular control over application functionality.
          While access control determines <strong>who</strong> can access what, feature toggles
          determine <strong>what</strong> is available to access.
        </Text>

        <List spacing="md">
          <List.Item>
            <Title mb="xs" mt="sm" order={5}>
              Complementary Patterns:
            </Title>
            <Text>
              Feature toggles and access control work together to provide comprehensive control over
              application features. Access control handles user permissions and authorization, while
              feature toggles manage feature availability and rollout strategies.
            </Text>
          </List.Item>

          <List.Item>
            <Title mb="xs" mt="sm" order={5}>
              Granular Feature Control:
            </Title>
            <Text>
              Feature toggles can be combined with access control to enable features for specific
              user segments, roles, or environments. This allows for sophisticated rollout
              strategies like canary deployments, A/B testing, and gradual feature releases.
            </Text>
          </List.Item>

          <List.Item>
            <Title mb="xs" mt="sm" order={5}>
              Dynamic Configuration:
            </Title>
            <Text>
              Both patterns support dynamic configuration, allowing you to change access permissions
              and feature availability without code deployments. This enables rapid response to
              security incidents and business requirements.
            </Text>
          </List.Item>
        </List>

        <Text mb="md" mt="lg">
          Here's how feature toggles can be integrated with access control systems:
        </Text>

        <CodeHighlightTabs
          code={[
            {
              code: REACT_FEATURE_TOGGLE_CODE,
              fileName: 'feature-toggle-components.tsx',
              icon: <IconFileTypeTsx color="#2596be" size={14} />,
              language: 'tsx',
            },
            {
              code: PRACTICAL_DASHBOARD_EXAMPLE_CODE,
              fileName: 'dashboard-example.tsx',
              icon: <IconFileTypeTsx color="#2596be" size={14} />,
              language: 'tsx',
            },
          ]}
          defaultExpanded={false}
          radius="md"
          withExpandButton={true}
        />

        <Text mb="md" mt="lg">
          <strong>Benefits of Feature Toggles:</strong>
        </Text>

        <List spacing="sm">
          <List.Item>
            <Text>
              <strong>Declarative:</strong> Feature toggles are expressed as JSX, making them easy
              to read and understand
            </Text>
          </List.Item>
          <List.Item>
            <Text>
              <strong>Type Safe:</strong> TypeScript integration provides compile-time safety for
              feature IDs and props
            </Text>
          </List.Item>
          <List.Item>
            <Text>
              <strong>Composable:</strong> Feature toggle components can be nested and combined with
              other React patterns
            </Text>
          </List.Item>
          <List.Item>
            <Text>
              <strong>Testable:</strong> Easy to mock and test feature toggle behavior in component
              tests
            </Text>
          </List.Item>
          <List.Item>
            <Text>
              <strong>Performance:</strong> Components are only rendered when features are enabled,
              reducing bundle size
            </Text>
          </List.Item>
        </List>

        <Alert color="green" mt="lg" variant="light">
          <Text size="sm">
            <strong>Tip:</strong> React component feature toggles work best when combined with
            server-side feature toggle services. This ensures consistent behavior across your
            application and prevents client-side manipulation of feature flags.
          </Text>
        </Alert>

        <Text mb="md" mt="lg">
          <strong>Integration Strategies:</strong>
        </Text>

        <List spacing="sm">
          <List.Item>
            <Text>
              <strong>Layered Approach:</strong> Apply access control first, then feature toggles as
              an additional layer
            </Text>
          </List.Item>
          <List.Item>
            <Text>
              <strong>Unified Interface:</strong> Create a single service that handles both access
              control and feature toggles
            </Text>
          </List.Item>
          <List.Item>
            <Text>
              <strong>Context-Aware:</strong> Use the same context (user, environment, time) for
              both access control and feature toggles
            </Text>
          </List.Item>
        </List>
      </SectionBlock>

      <SectionBlock initialSpaceAfterDivider="xs" title="Example: Interactive Access Control Demo">
        <Text mb="md">
          This comprehensive example demonstrates a hybrid access control system that combines RBAC
          and ABAC. Users can test different roles, resources, actions, and contextual attributes to
          see how access decisions are made in real-time.
        </Text>
        <CodeHighlightTabs
          code={[
            {
              code: EXAMPLE_USAGE_CODE,
              fileName: 'example.tsx',
              icon: <IconFileTypeTsx color="#2596be" size={14} />,
              language: 'tsx',
            },
          ]}
          defaultExpanded={false}
          mb="lg"
          radius="md"
          withExpandButton
        />
        <Example />
      </SectionBlock>
      <Space h="xl" />
    </>
  );
};
