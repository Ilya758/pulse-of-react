export const RENDER_PROPS_CODE = `interface DataProviderProps<T> {
  render?: (data: T) => React.ReactNode;
  // Or using children as a function (very common)
  children?: (data: T) => React.ReactNode;
}

function DataProvider<T>({ render, children }: DataProviderProps<T>) {
  const data = // ... some logic to get data or state ...
  
  if (render) {
    return <>{render(data)}</>;
  }
  if (typeof children === 'function') {
    return <>{children(data)}</>;
  }
  return null; // Or some default rendering
}`;

export const DATA_PROVIDER_CODE = `
import React, { useState, useCallback } from 'react';

export interface FormManagerState<T extends object> {
  values: T;
  touched: Partial<Record<keyof T, boolean>>;
  handleChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleBlur: (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSubmit: (
    onSubmit: (values: T) => void,
  ) => (event: React.FormEvent<HTMLFormElement>) => void;
  getFieldValue: (name: keyof T) => T[keyof T];
  setFieldValue: (name: keyof T, value: T[keyof T]) => void;
}

interface FormManagerProps<T extends object> {
  initialValues: T;
  children: (state: FormManagerState<T>) => React.ReactNode;
}

export function FormManager<T extends object>({
  initialValues,
  children,
}: FormManagerProps<T>) {
  const [values, setValues] = useState<T>(initialValues);
  const [touched, setTouched] = useState<Partial<Record<keyof T, boolean>>>({});

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value, type } = event.target;
      const newValue = type === 'checkbox' ? (event.target as HTMLInputElement).checked : value;
      setValues((prevValues) => ({
        ...prevValues,
        [name]: newValue,
      }));
    },
    [],
  );

  const handleBlur = useCallback(
    (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name } = event.target;
      setTouched((prevTouched) => ({
        ...prevTouched,
        [name]: true,
      }));
    },
    [],
  );

  const getFieldValue = useCallback((name: keyof T) => values[name], [values]);

  const setFieldValue = useCallback((name: keyof T, value: T[keyof T]) => {
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  }, []);

  const handleSubmit = useCallback(
    (onSubmit: (values: T) => void) => (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const allTouched = Object.keys(initialValues).reduce((acc, key) => {
        acc[key as keyof T] = true;
        return acc;
      }, {} as Partial<Record<keyof T, boolean>>);
      setTouched(allTouched);
      onSubmit(values);
    },
    [values, initialValues],
  );

  return (
    <>{children({ values, touched, handleChange, handleBlur, handleSubmit, getFieldValue, setFieldValue })}</>
  );
}
`;

export const EXAMPLE_CODE = `
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
} from '@mantine/core';
import { FormManager } from './FormManager';

interface MyFormValues {
  name: string;
  email: string;
  message: string;
  subscribe: boolean;
}

const validate = (values: MyFormValues) => {
  const errors: Partial<Record<keyof MyFormValues, string>> = {};
  if (!values.name) {
    errors.name = 'Name is required';
  }
  if (!values.email) {
    errors.email = 'Email is required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }
  if (!values.message) {
    errors.message = 'Message is required';
  }
  return errors;
};

export const Example: React.FC = () => {
  const initialFormValues: MyFormValues = {
    name: '',
    email: '',
    message: '',
    subscribe: false,
  };

  const handleFormSubmit = (values: MyFormValues) => {
    console.log('Form Submitted:', values);
    // Using string concatenation for alert to avoid nested template literal issues in the string itself
    alert(
      'Form Submitted!\nName: ' + values.name +
      '\nEmail: ' + values.email +
      '\nMessage: ' + values.message.substring(0,30) + '...' +
      '\nSubscribe: ' + values.subscribe
    );
  };

  return (
    <Paper shadow="xs" p="xl" radius="md">
      <Title order={3} mb="lg" ta="center">
        Contact Us (Render Prop Form)
      </Title>
      <FormManager<MyFormValues> initialValues={initialFormValues}>
        {({ values, touched, handleChange, handleBlur, handleSubmit, getFieldValue, setFieldValue }) => {
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
                />
                
                <Group justify="flex-end" mt="lg">
                  <Button type="submit" disabled={Object.keys(errors).length > 0 && Object.values(touched).some(t => t)} >
                    Send Message
                  </Button>
                </Group>
                
                <Button 
                  variant="outline" 
                  size="xs" 
                  mt="sm" 
                  onClick={() => setFieldValue('message', 'Hello from programmatic set!')}>
                    Set Message Programmatically
                </Button>

                <Paper withBorder p="xs" mt="lg" radius="sm" bg="gray.0">
                  <Title order={6} mb="xs">Form State:</Title>
                  <pre style={{ fontSize: '0.8rem', whiteSpace: 'pre-wrap'}}>
                    Values: {JSON.stringify(values, null, 2)}\n
                    Touched: {JSON.stringify(touched, null, 2)}\n
                    Errors: {JSON.stringify(errors, null, 2)}
                  </pre>
                </Paper>
              </Stack>
            </form>
          );
        }}
      </FormManager>
    </Paper>
  );
};
`;

