// form
import { ReactNode } from 'react';
import { FormProvider as Form, UseFormReturn } from 'react-hook-form';
// ----------------------------------------------------------------------

interface LoginFormProps {
  email: string;
  password: string;
  remember: boolean;
}
interface FormProviderProps {
  children: ReactNode;
  methods: UseFormReturn<LoginFormProps>;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}
export default function FormProviderLogin({
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
