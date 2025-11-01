import {
  Button,
  Checkbox,
  Group,
  List,
  Paper,
  Stack,
  Text,
  Textarea,
  TextInput,
  Title,
} from '@mantine/core';
import React from 'react';
import { MyFormValues, validate } from '../model';
import { FormManager } from './form-manager';

export const Example: React.FC = () => {
  const initialFormValues: MyFormValues = {
    email: '',
    message: '',
    name: '',
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
    <Paper p="xl" radius="md" shadow="xs">
      <Title mb="lg" order={3} ta="center">
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
                  error={touched.name && errors.name}
                  label="Full Name"
                  name="name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  placeholder="Your name"
                  required
                  value={getFieldValue('name') as string}
                />

                <TextInput
                  error={touched.email && errors.email}
                  label="Email Address"
                  name="email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  required
                  type="email"
                  value={getFieldValue('email') as string}
                />

                <Textarea
                  autosize
                  error={touched.message && errors.message}
                  label="Your Message"
                  minRows={3}
                  name="message"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  placeholder="Enter your message here..."
                  required
                  value={getFieldValue('message') as string}
                />

                <Checkbox
                  checked={getFieldValue('subscribe') as boolean}
                  label="Subscribe to our newsletter"
                  name="subscribe"
                  onBlur={handleBlur}
                  onChange={handleChange}
                />

                <Group justify="flex-start" mt="lg">
                  <Button
                    disabled={!!Object.keys(errors).length && Object.values(touched).some((t) => t)}
                    type="submit"
                  >
                    Send Message
                  </Button>
                </Group>

                <Button
                  mt="sm"
                  onClick={() => setFieldValue('message', 'Hello from programmatic set!')}
                  size="xs"
                  variant="outline"
                >
                  Set Message Programmatically
                </Button>

                <Paper mt="lg" p="md" radius="md" withBorder>
                  <Title mb="sm" order={5}>
                    Live Form State:
                  </Title>

                  <Title mb="xs" mt="xs" order={6} size="sm">
                    Values:
                  </Title>
                  {Object.entries(values).length ? (
                    <List size="xs" spacing={2} withPadding>
                      {Object.entries(values).map(([key, value]) => (
                        <List.Item key={key}>
                          <Text fw={500} span>
                            {key}:
                          </Text>{' '}
                          <Text c="blue" span>
                            {String(value)}
                          </Text>
                        </List.Item>
                      ))}
                    </List>
                  ) : (
                    <Text c="dimmed" size="xs">
                      No values yet.
                    </Text>
                  )}

                  <Title mb="xs" mt="sm" order={6} size="sm">
                    Touched Fields:
                  </Title>
                  {Object.entries(touched).length ? (
                    <List size="xs" spacing={2} withPadding>
                      {Object.entries(touched).map(([key, value]) => (
                        <List.Item key={key}>
                          <Text fw={500} span>
                            {key}:
                          </Text>{' '}
                          <Text c="orange" span>
                            {String(value)}
                          </Text>
                        </List.Item>
                      ))}
                    </List>
                  ) : (
                    <Text c="dimmed" size="xs">
                      No fields touched yet.
                    </Text>
                  )}

                  <Title mb="xs" mt="sm" order={6} size="sm">
                    Validation Errors:
                  </Title>
                  {Object.entries(errors).length ? (
                    <List c="red" size="xs" spacing={2} withPadding>
                      {Object.entries(errors).map(([key, errorMsg]) => (
                        <List.Item key={key}>
                          <Text fw={500} span>
                            {key}:
                          </Text>{' '}
                          <Text span>{errorMsg}</Text>
                        </List.Item>
                      ))}
                    </List>
                  ) : (
                    <Text c="dimmed" size="xs">
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
