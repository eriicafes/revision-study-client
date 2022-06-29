import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { RegisterDto, registerSchema, useRegisterMutation } from "~/api/auth";
import { Button } from "~/components/ui/Button";
import { Input } from "~/components/ui/Input";
import { AuthLayout } from "~/layouts/AuthLayout";

export default function Register() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterDto>({
    resolver: zodResolver(registerSchema),
  });

  const registerMutation = useRegisterMutation();

  const onSubmit = handleSubmit((data) => {
    registerMutation.mutate(data, {
      onSuccess() {
        router.push("/login");
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
                placeholder="First Name"
                error={errors.firstName?.message}
                {...register("firstName")}
              />
              <Input
                variant="auth"
                placeholder="Last Name"
                error={errors.lastName?.message}
                {...register("lastName")}
              />
              <Input
                variant="auth"
                type="password"
                placeholder="Password"
                error={errors.password?.message}
                {...register("password")}
              />
              <Input
                variant="auth"
                type="password"
                placeholder="Confirm Password"
                error={errors.confirmPassword?.message}
                {...register("confirmPassword")}
              />
            </div>
            <div className="mt-2">
              {registerMutation.error && (
                <p className="text-sm text-center text-red-400 font-medium">
                  {registerMutation.error.response?.data.message}
                </p>
              )}
            </div>
            <div className="mt-4">
              <Button
                loading={registerMutation.isLoading}
                variant="auth"
                className="w-full"
              >
                Create account
              </Button>
            </div>
          </form>
        </div>
      </div>
    </AuthLayout>
  );
}
