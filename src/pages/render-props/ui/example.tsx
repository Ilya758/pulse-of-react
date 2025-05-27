import React from 'react';
import {
  TextInput,
  Button,
  Paper,
  Title,
  Stack,
  Checkbox,
  Textarea,
  Group,
  List,
  Text,
} from '@mantine/core';
import { FormManager } from './form-manager';
import { MyFormValues, validate } from '../model';

export const Example: React.FC = () => {
  const initialFormValues: MyFormValues = {
    name: '',
    email: '',
    message: '',
    subscribe: false,
  };

  const handleFormSubmit = (values: MyFormValues) => {
    console.log('Form Submitted:', values);
    alert(
      `Form Submitted!\nName: ${values.name}\nEmail: ${
        values.email
      }\nMessage: ${values.message.substring(0, 30)}...\nSubscribe: ${values.subscribe}`,
    );
  };

  return (
    <Paper shadow="xs" p="xl" radius="md">
      <Title order={3} mb="lg" ta="center">
        Contact Us (Render Prop Form)
      </Title>
      <FormManager<MyFormValues> initialValues={initialFormValues}>
        {({
          values,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          getFieldValue,
          setFieldValue,
        }) => {
          const errors = validate(values);

          return (
            <form onSubmit={handleSubmit(handleFormSubmit)}>
              <Stack gap="md">
                <TextInput
                  name="name"
                  label="Full Name"
                  placeholder="Your name"
                  value={getFieldValue('name') as string}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.name && errors.name}
                  required
                />

                <TextInput
                  name="email"
                  type="email"
                  label="Email Address"
                  placeholder="your@email.com"
                  value={getFieldValue('email') as string}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.email && errors.email}
                  required
                />

                <Textarea
                  name="message"
                  label="Your Message"
                  placeholder="Enter your message here..."
                  value={getFieldValue('message') as string}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.message && errors.message}
                  autosize
                  minRows={3}
                  required
                />

                <Checkbox
                  name="subscribe"
                  label="Subscribe to our newsletter"
                  checked={getFieldValue('subscribe') as boolean}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />

                <Group justify="flex-start" mt="lg">
                  <Button
                    type="submit"
                    disabled={!!Object.keys(errors).length && Object.values(touched).some((t) => t)}
                  >
                    Send Message
                  </Button>
                </Group>

                <Button
                  variant="outline"
                  size="xs"
                  mt="sm"
                  onClick={() => setFieldValue('message', 'Hello from programmatic set!')}
                >
                  Set Message Programmatically
                </Button>

                <Paper withBorder p="md" mt="lg" radius="md">
                  <Title order={5} mb="sm">
                    Live Form State:
                  </Title>

                  <Title order={6} mt="xs" mb="xs" size="sm">
                    Values:
                  </Title>
                  {Object.entries(values).length ? (
                    <List size="xs" spacing={2} withPadding>
                      {Object.entries(values).map(([key, value]) => (
                        <List.Item key={key}>
                          <Text span fw={500}>
                            {key}:
                          </Text>{' '}
                          <Text span c="blue">
                            {String(value)}
                          </Text>
                        </List.Item>
                      ))}
                    </List>
                  ) : (
                    <Text size="xs" c="dimmed">
                      No values yet.
                    </Text>
                  )}

                  <Title order={6} mt="sm" mb="xs" size="sm">
                    Touched Fields:
                  </Title>
                  {Object.entries(touched).length ? (
                    <List size="xs" spacing={2} withPadding>
                      {Object.entries(touched).map(([key, value]) => (
                        <List.Item key={key}>
                          <Text span fw={500}>
                            {key}:
                          </Text>{' '}
                          <Text span c="orange">
                            {String(value)}
                          </Text>
                        </List.Item>
                      ))}
                    </List>
                  ) : (
                    <Text size="xs" c="dimmed">
                      No fields touched yet.
                    </Text>
                  )}

                  <Title order={6} mt="sm" mb="xs" size="sm">
                    Validation Errors:
                  </Title>
                  {Object.entries(errors).length ? (
                    <List size="xs" spacing={2} withPadding c="red">
                      {Object.entries(errors).map(([key, errorMsg]) => (
                        <List.Item key={key}>
                          <Text span fw={500}>
                            {key}:
                          </Text>{' '}
                          <Text span>{errorMsg}</Text>
                        </List.Item>
                      ))}
                    </List>
                  ) : (
                    <Text size="xs" c="dimmed">
                      No validation errors.
                    </Text>
                  )}
                </Paper>
              </Stack>
            </form>
          );
        }}
      </FormManager>
    </Paper>
  );
};

