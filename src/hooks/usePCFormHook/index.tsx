'use client';
/* eslint-disable @typescript-eslint/no-explicit-any */

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

export const usePCFormHook = ({
  formSchema,
  formDefaultValues,
}: {
  formSchema: any;
  formDefaultValues: object;
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: formDefaultValues,
  });

  const { control, setValue, getValues, register } = form;
  const isFormLoading = form.formState.isLoading;
  const isFormSubmitting = form.formState.isSubmitting;
  const { errors } = form.formState;

  return {
    form,
    isFormLoading,
    isFormSubmitting,
    errors,
    control,
    setValue,
    getValues,
    register,
  };
};
