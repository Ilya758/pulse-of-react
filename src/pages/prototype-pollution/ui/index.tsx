import { CodeHighlightTabs } from '@mantine/code-highlight';
import { List, Space, Text, Title } from '@mantine/core';
import { FC, useEffect } from 'react';

import { SectionBlock } from '@/shared';
import { useTocContent } from '@/widgets/layout';

import {
  PROTOTYPE_IMMUTABILITY_CODE,
  SECURE_CONFIG_MERGE_CODE,
  SECURE_OBJECT_CREATION_CODE,
  UI_WIDGET_GADGET_CODE,
  VULNERABLE_CONFIG_MERGE_CODE,
} from '../model';

export const PrototypePollutionPage: FC = () => {
  const { signalContentLoaded } = useTocContent();

  useEffect(signalContentLoaded, []);

  return (
    <>
      <Space h={4} />
      <Title mb="lg" order={1}>
        Prototype Pollution
      </Title>

      <SectionBlock initialSpaceAfterDivider="xs" title="Core Concept">
        <Text>
          Prototype Pollution is a vulnerability specific to JavaScript that occurs when an attacker
          is able to modify `Object.prototype`. Because prototypes are a foundational aspect of
          JavaScript's inheritance model, almost all objects inherit properties from
          `Object.prototype`. Altering this global prototype allows an attacker to inject properties
          into nearly every object in an application, leading to unpredictable behavior and serious
          security risks.
        </Text>
        <Text mt="md">
          This tampering can result in a range of attacks, including privilege escalation, denial of
          service, and client-side exploits like Cross-Site Scripting (XSS). The root cause is often
          found in functions that perform deep merging, cloning, or property assignment on objects
          without properly sanitizing property names like `__proto__` or `constructor.prototype`.
        </Text>
      </SectionBlock>

      <SectionBlock
        initialSpaceAfterDivider="xs"
        title="Anatomy of an Attack: Source, Gadget, Sink"
      >
        <Text>
          A successful prototype pollution attack hinges on the alignment of three elements:
        </Text>
        <List mt="md" spacing="xs" type="ordered">
          <List.Item>
            <Text fw={700} span>
              Source
            </Text>
            : The entry point for the malicious payload. This is typically user-controlled input,
            such as a URL query string or a parsed JSON body, that an application processes
            insecurely.
          </List.Item>
          <List.Item>
            <Text fw={700} span>
              Gadget
            </Text>
            : A piece of code that uses a property without first defining it on its own object. This
            code becomes a "gadget" because it can be made to use a value inherited from the
            polluted prototype.
          </List.Item>
          <List.Item>
            <Text fw={700} span>
              Sink
            </Text>
            : The final step where the gadget's execution with the polluted property leads to a
            harmful outcome. This could be a function like `eval()` that executes code, or a DOM
            manipulation like setting `innerHTML` that leads to XSS.
          </List.Item>
        </List>

        <CodeHighlightTabs
          code={[
            {
              code: VULNERABLE_CONFIG_MERGE_CODE,
              fileName: 'vulnerable-config-merge.ts',
              language: 'ts',
            },
          ]}
          defaultExpanded={false}
          mt="lg"
          radius="md"
          withExpandButton
        />
      </SectionBlock>

      <SectionBlock initialSpaceAfterDivider="xs" title="Practical Gadget Example">
        <Text>
          Gadgets are often found in libraries or application code that handles configuration
          objects. If a function reads a property from a configuration object but doesn't check if
          the object has its own value for it, it can be exploited.
        </Text>
        <CodeHighlightTabs
          code={[
            {
              code: UI_WIDGET_GADGET_CODE,
              fileName: 'ui-widget-gadget.ts',
              language: 'ts',
            },
          ]}
          defaultExpanded={false}
          mt="lg"
          radius="md"
          withExpandButton
        />
      </SectionBlock>

      <SectionBlock initialSpaceAfterDivider="xs" title="Defensive Measures">
        <List spacing="xs" type="ordered">
          <List.Item>
            <Text fw={700} span>
              Prefer Prototype-Free Data Structures
            </Text>
            <Text size="sm">
              When creating objects intended to be used as dictionaries or maps, use{' '}
              <Text fw={700} span>
                `Object.create(null)`
              </Text>{' '}
              to produce an object with no prototype. For collections of values, use{' '}
              <Text fw={700} span>
                `new Set()`
              </Text>
              . These objects cannot be polluted through prototype inheritance.
            </Text>
          </List.Item>
          <List.Item>
            <Text fw={700} span>
              Sanitize and Validate Keys
            </Text>
            <Text size="sm">
              In any function that recursively copies properties, explicitly deny keys like{' '}
              <Text fw={700} span>
                `__proto__`
              </Text>
              ,{' '}
              <Text fw={700} span>
                `constructor`
              </Text>
              , and{' '}
              <Text fw={700} span>
                `prototype`
              </Text>
              . Rely on allow-lists for property names where possible.
            </Text>
          </List.Item>
          <List.Item>
            <Text fw={700} span>
              Make Prototypes Immutable
            </Text>
            <Text size="sm">
              As a powerful, broad-spectrum defense, freeze the global object prototype with{' '}
              <Text fw={700} span>
                `Object.freeze(Object.prototype)`
              </Text>
              . This prevents any modifications to it. Note that this can cause issues with
              third-party libraries that modify prototypes, so it must be tested carefully.
            </Text>
          </List.Item>
          <List.Item>
            <Text fw={700} span>
              Use Secure Libraries
            </Text>
            <Text size="sm">
              When dealing with object manipulation, use well-maintained libraries that are known to
              be secure against prototype pollution for tasks like merging or cloning objects.
            </Text>
          </List.Item>
        </List>

        <CodeHighlightTabs
          code={[
            {
              code: SECURE_CONFIG_MERGE_CODE,
              fileName: 'safe-deep-clone.ts',
              language: 'ts',
            },
            {
              code: SECURE_OBJECT_CREATION_CODE,
              fileName: 'secure-object-creation.ts',
              language: 'ts',
            },
            {
              code: PROTOTYPE_IMMUTABILITY_CODE,
              fileName: 'prototype-immutability.ts',
              language: 'ts',
            },
          ]}
          defaultExpanded={false}
          mt="lg"
          radius="md"
          withExpandButton
        />
      </SectionBlock>
      <SectionBlock initialSpaceAfterDivider="xs" title="Hardening at the Runtime Level">
        <Text>
          For an added layer of security in a Node.js environment, you can leverage runtime flags to
          disable features that facilitate prototype pollution attacks.
        </Text>
        <List mt="md" spacing="xs">
          <List.Item>
            <Text fw={700} span>
              Node.js `--disable-proto` Flag
            </Text>
            <Text size="sm">
              Launching a Node.js application with the{' '}
              <Text fw={700} span>
                `--disable-proto=delete`
              </Text>{' '}
              flag completely removes the legacy `__proto__` accessor. While this eliminates a major
              attack vector, be aware that pollution can still occur through other properties like
              `constructor.prototype`.
            </Text>
          </List.Item>
        </List>
      </SectionBlock>

      <Space h="xl" />
    </>
  );
};
