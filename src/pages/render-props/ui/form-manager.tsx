import React, { useCallback, useState } from 'react';

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

export function FormManager<T extends object>({ initialValues, children }: FormManagerProps<T>) {
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
    (onSubmit: (formValues: T) => void) => (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const allTouched = Object.keys(initialValues).reduce(
        (acc, key) => {
          acc[key as keyof T] = true;
          return acc;
        },
        {} as Partial<Record<keyof T, boolean>>,
      );
      setTouched(allTouched);
      onSubmit(values);
    },
    [values, initialValues],
  );

  return (
    <>
      {children({
        getFieldValue,
        handleBlur,
        handleChange,
        handleSubmit,
        setFieldValue,
        touched,
        values,
      })}
    </>
  );
}
