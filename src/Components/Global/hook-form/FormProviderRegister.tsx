// form
import { ReactNode } from 'react';
import { FormProvider as Form, UseFormReturn } from 'react-hook-form';
// ----------------------------------------------------------------------

interface RegisterFormProps {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

interface FormProviderProps {
  children: ReactNode;
  methods: UseFormReturn<RegisterFormProps>;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}
export default function FormProviderRegister({
  children,
  onSubmit,
  methods,
}: FormProviderProps) {
  return (
    <Form {...methods}>
      <form onSubmit={onSubmit}>{children}</form>
    </Form>
  );
}
