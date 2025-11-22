"use client";

import { Button } from "@/components/ui/button";
import { Form ,  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage, } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { usePCFormHook } from "@/hooks/usePCFormHook";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import * as React from "react";
import toast from "react-hot-toast";
import { ZodType } from "zod";

type FieldConfig = {
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
  icon?: React.ReactNode;
  description?: string;
  showTogglePassword?: boolean;
};

type AuthFormProps<T extends object> = {
  title: string;
  description: string;
  schema: ZodType<T>;
  defaultValues: T;
  fields: FieldConfig[];
  submitLabel: string;
  onSubmit: (data: T) => Promise<void>;
};

export function AuthForm<T extends object>({
  title,
  description,
  schema,
  defaultValues,
  fields,
  submitLabel,
  onSubmit,
}: AuthFormProps<T>) {
  const [loading, setLoading] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);

  const { form } = usePCFormHook({
    formDefaultValues: defaultValues,
    formSchema: schema,
  });

  const handleSubmit = async (values: T) => {
    setLoading(true);
    try {
      await onSubmit(values);
    } catch (err: any) {
      await toast.error(err?.message || "Something went wrong");
    } finally {
      form.reset();
      setLoading(false);
    }
  };

  return (
    <>
      <div className="mb-8">
        <h2 className="mt-6 text-2xl font-semibold tracking-tight">{title}</h2>
        <p className="mt-2 text-sm text-muted-foreground">{description}</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          {fields.map((field) => (
            <FormField
              key={field.name}
              control={form.control}
              name={field.name as any}
              render={({ field: f }) => (
                <FormItem>
                  <FormLabel>{field.label}</FormLabel>
                  <FormControl>
                    <div className="relative">
                      {field.icon && (
                        <div className="absolute left-3 top-1/2 -translate-y-1/2">
                          {field.icon}
                        </div>
                      )}
                      <Input
                        {...f}
                        type={
                          field.showTogglePassword
                            ? showPassword
                              ? "text"
                              : "password"
                            : field.type || "text"
                        }
                        placeholder={field.placeholder}
                        className={field.icon ? "pl-9" : ""}
                      />
                      {field.showTogglePassword && (
                        <button
                          type="button"
                          onClick={() => setShowPassword((s) => !s)}
                          className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-md"
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </button>
                      )}
                    </div>
                  </FormControl>
                  {field.description && (
                    <FormDescription>{field.description}</FormDescription>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}

          <Button
            type="submit"
            className="w-full cursor-pointer"
            disabled={loading}
          >
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {submitLabel}
          </Button>
        </form>
      </Form>
    </>
  );
}
