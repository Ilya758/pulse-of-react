import { FC, useEffect } from 'react';
import { Title, Text, List, Space } from '@mantine/core';
import { CodeHighlightTabs } from '@mantine/code-highlight';

import { SectionBlock } from '@/shared';
import { useTocContent } from '@/widgets/layout';

import {
  VULNERABLE_CONFIG_MERGE_CODE,
  SECURE_CONFIG_MERGE_CODE,
  SECURE_OBJECT_CREATION_CODE,
  PROTOTYPE_IMMUTABILITY_CODE,
  UI_WIDGET_GADGET_CODE,
} from '../model';

export const PrototypePollutionPage: FC = () => {
  const { signalContentLoaded } = useTocContent();

  useEffect(signalContentLoaded, [signalContentLoaded]);

  return (
    <>
      <Space h={4} />
      <Title order={1} mb="lg">
        Prototype Pollution
      </Title>

      <SectionBlock title="Core Concept" initialSpaceAfterDivider="xs">
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
        title="Anatomy of an Attack: Source, Gadget, Sink"
        initialSpaceAfterDivider="xs"
      >
        <Text>
          A successful prototype pollution attack hinges on the alignment of three elements:
        </Text>
        <List spacing="xs" mt="md" type="ordered">
          <List.Item>
            <Text span fw={700}>
              Source
            </Text>
            : The entry point for the malicious payload. This is typically user-controlled input,
            such as a URL query string or a parsed JSON body, that an application processes
            insecurely.
          </List.Item>
          <List.Item>
            <Text span fw={700}>
              Gadget
            </Text>
            : A piece of code that uses a property without first defining it on its own object. This
            code becomes a "gadget" because it can be made to use a value inherited from the
            polluted prototype.
          </List.Item>
          <List.Item>
            <Text span fw={700}>
              Sink
            </Text>
            : The final step where the gadget's execution with the polluted property leads to a
            harmful outcome. This could be a function like `eval()` that executes code, or a DOM
            manipulation like setting `innerHTML` that leads to XSS.
          </List.Item>
        </List>

        <CodeHighlightTabs
          withExpandButton
          defaultExpanded={false}
          radius="md"
          mt="lg"
          code={[
            {
              fileName: 'vulnerable-config-merge.ts',
              language: 'ts',
              code: VULNERABLE_CONFIG_MERGE_CODE,
            },
          ]}
        />
      </SectionBlock>

      <SectionBlock title="Practical Gadget Example" initialSpaceAfterDivider="xs">
        <Text>
          Gadgets are often found in libraries or application code that handles configuration
          objects. If a function reads a property from a configuration object but doesn't check if
          the object has its own value for it, it can be exploited.
        </Text>
        <CodeHighlightTabs
          withExpandButton
          defaultExpanded={false}
          radius="md"
          mt="lg"
          code={[
            {
              fileName: 'ui-widget-gadget.ts',
              language: 'ts',
              code: UI_WIDGET_GADGET_CODE,
            },
          ]}
        />
      </SectionBlock>

      <SectionBlock title="Defensive Measures" initialSpaceAfterDivider="xs">
        <List spacing="xs" type="ordered">
          <List.Item>
            <Text span fw={700}>
              Prefer Prototype-Free Data Structures
            </Text>
            <Text size="sm">
              When creating objects intended to be used as dictionaries or maps, use{' '}
              <Text span fw={700}>
                `Object.create(null)`
              </Text>{' '}
              to produce an object with no prototype. For collections of values, use{' '}
              <Text span fw={700}>
                `new Set()`
              </Text>
              . These objects cannot be polluted through prototype inheritance.
            </Text>
          </List.Item>
          <List.Item>
            <Text span fw={700}>
              Sanitize and Validate Keys
            </Text>
            <Text size="sm">
              In any function that recursively copies properties, explicitly deny keys like{' '}
              <Text span fw={700}>
                `__proto__`
              </Text>
              ,{' '}
              <Text span fw={700}>
                `constructor`
              </Text>
              , and{' '}
              <Text span fw={700}>
                `prototype`
              </Text>
              . Rely on allow-lists for property names where possible.
            </Text>
          </List.Item>
          <List.Item>
            <Text span fw={700}>
              Make Prototypes Immutable
            </Text>
            <Text size="sm">
              As a powerful, broad-spectrum defense, freeze the global object prototype with{' '}
              <Text span fw={700}>
                `Object.freeze(Object.prototype)`
              </Text>
              . This prevents any modifications to it. Note that this can cause issues with
              third-party libraries that modify prototypes, so it must be tested carefully.
            </Text>
          </List.Item>
          <List.Item>
            <Text span fw={700}>
              Use Secure Libraries
            </Text>
            <Text size="sm">
              When dealing with object manipulation, use well-maintained libraries that are known to
              be secure against prototype pollution for tasks like merging or cloning objects.
            </Text>
          </List.Item>
        </List>

        <CodeHighlightTabs
          withExpandButton
          defaultExpanded={false}
          radius="md"
          mt="lg"
          code={[
            {
              fileName: 'safe-deep-clone.ts',
              language: 'ts',
              code: SECURE_CONFIG_MERGE_CODE,
            },
            {
              fileName: 'secure-object-creation.ts',
              language: 'ts',
              code: SECURE_OBJECT_CREATION_CODE,
            },
            {
              fileName: 'prototype-immutability.ts',
              language: 'ts',
              code: PROTOTYPE_IMMUTABILITY_CODE,
            },
          ]}
        />
      </SectionBlock>
      <SectionBlock title="Hardening at the Runtime Level" initialSpaceAfterDivider="xs">
        <Text>
          For an added layer of security in a Node.js environment, you can leverage runtime flags to
          disable features that facilitate prototype pollution attacks.
        </Text>
        <List spacing="xs" mt="md">
          <List.Item>
            <Text span fw={700}>
              Node.js `--disable-proto` Flag
            </Text>
            <Text size="sm">
              Launching a Node.js application with the{' '}
              <Text span fw={700}>
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

