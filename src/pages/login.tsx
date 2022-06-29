import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { LoginDto, loginSchema, useLoginMutation } from "~/api/auth";
import { Button } from "~/components/ui/Button";
import { Input } from "~/components/ui/Input";
import { AuthLayout } from "~/layouts/AuthLayout";

export default function Login() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginDto>({
    resolver: zodResolver(loginSchema),
  });

  const loginMutation = useLoginMutation();

  const onSubmit = handleSubmit((data) => {
    loginMutation.mutate(data, {
      onSuccess() {
        router.push("/dashboard");
      },
    });
  });

  return (
    <AuthLayout>
      <div className="py-12 px-4 md:px-12 lg:px-16 xl:px-20 h-full flex flex-col justify-center">
        <div className="w-full max-w-md md:max-w-sm mx-auto md:ml-0">
          <p className="mb-8 md:mb-12 text-2xl md:text-3xl lg:text-5xl font-medium">
            Join the best study experience
          </p>
          <form onSubmit={onSubmit} className="flex flex-col">
            <div className="flex flex-col space-y-3">
              <Input
                variant="auth"
                type="email"
                placeholder="Email Address"
                error={errors.email?.message}
                {...register("email")}
              />
              <Input
                variant="auth"
                type="password"
                placeholder="Password"
                error={errors.password?.message}
                {...register("password")}
              />
            </div>
            <div className="mt-2">
              {loginMutation.error && (
                <p className="text-sm text-center text-red-400 font-medium">
                  {loginMutation.error.response?.data.message}
                </p>
              )}
            </div>
            <div className="mt-4">
              <Button
                loading={loginMutation.isLoading}
                variant="auth"
                className="w-full"
              >
                Login
              </Button>
            </div>
          </form>
        </div>
      </div>
    </AuthLayout>
  );
}
