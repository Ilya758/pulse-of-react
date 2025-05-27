export interface MyFormValues {
  name: string;
  email: string;
  message: string;
  subscribe: boolean;
}

export const validate = (values: MyFormValues) => {
  const errors: Partial<Record<keyof MyFormValues, string>> = {};
  if (!values.name) {
    errors.name = 'Name is required';
  }

  if (!values.email) {
    errors.email = 'Email is required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }

  if (!values.message) {
    errors.message = 'Message is required';
  }

  return errors;
};

