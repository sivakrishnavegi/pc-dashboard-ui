'use client';

import AuthLayout from '@/layouts/auth';
import { AuthForm } from '@/forms/auth/AuthForm';
import { useUserStore } from '@/store/userStore';
import { Lock, Mail } from 'lucide-react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { z } from 'zod';

const LoginSchema = z.object({
  email: z.string().email('Enter a valid email').min(1, 'Email is required'),
  password: z.string().min(8, 'Min 8 characters').max(72),
});

type LoginValues = z.infer<typeof LoginSchema>;

const LoginPage: React.FC = () => {
  const router = useRouter();

  return (
    <AuthLayout>
      <AuthForm<LoginValues>
        title="Sign in to your account"
        description="Welcome back! Please enter your details."
        schema={LoginSchema}
        defaultValues={{ email: '', password: '' }}
        fields={[
          {
            name: 'email',
            label: 'Email',
            type: 'email',
            placeholder: 'you@example.com',
            icon: <Mail className="h-4 w-4 text-muted-foreground" />,
          },
          {
            name: 'password',
            label: 'Password',
            placeholder: '••••••••',
            icon: <Lock className="h-4 w-4 text-muted-foreground" />,
            showTogglePassword: true,
          },
        ]}
        submitLabel="Sign In"
        onSubmit={async (values) => {
          try {
            const response = await fetch(`/api/users/login`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              credentials: 'include',
              body: JSON.stringify(values),
            });

            const data = await response.json();
            if (!response.ok) {
              throw new Error(data?.message || 'Login failed');
            }
            await useUserStore.getState().setUser({
              id: data.user.id,
              email: data.user.email,
              role: data.user.role,
              token: data.user.token,
            });

            await toast.success(`Welcome back, ${data.user?.name || values.email}`);
            console.log('logged in');

            // Ensure router push after state update
            setTimeout(() => {
              router.push(`/dashboard/${data.user.role}`);
            }, 100); // small delay ensures state is applied
            
          } catch (error: any) {
            console.log('logIn Error', error);

            await toast.error('Login failed');
          }
        }}
      />
    </AuthLayout>
  );
};
// new changes
export default LoginPage;
