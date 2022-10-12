// form
import { ReactNode } from 'react';
import { FormProvider as Form, UseFormReturn } from 'react-hook-form';
import { UserTypes } from '@/interfaces/auth.interface';
// ----------------------------------------------------------------------

interface FormProviderProps {
  children: ReactNode;
  methods: UseFormReturn<UserTypes>;
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
