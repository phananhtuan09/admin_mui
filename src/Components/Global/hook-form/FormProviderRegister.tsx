// form
import { ReactNode } from 'react';
import { FormProvider as Form, UseFormReturn } from 'react-hook-form';
import { IUserInfo } from '@/interfaces/redux.interface';
// ----------------------------------------------------------------------

interface FormProviderProps {
  children: ReactNode;
  methods: UseFormReturn<IUserInfo>;
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
