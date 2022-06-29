import { useRouter } from "next/router";
import { useAuth, useLogoutMutation } from "~/api/auth";
import { QueryLoader } from "~/components/loaders/QueryLoader";
import { Button } from "~/components/ui/Button";

export default function Dashboard() {
  const router = useRouter();

  const authQuery = useAuth();
  const logoutMutation = useLogoutMutation();

  const logout = () => {
    logoutMutation.mutate(null, {
      onSuccess() {
        router.push("/");
      },
    });
  };

  return (
    <div className="h-screen">
      <QueryLoader query={authQuery}>
        {(user) => (
          <div className="h-full w-full flex items-center justify-center">
            <div className="bg-zinc-100 rounded-md p-4 text-sm space-y-2 w-[400px]">
              <p>User ID: {user.id}</p>
              <p>Email: {user.email}</p>
              <p>
                Name: {user.firstName} {user.lastName}
              </p>
              <div>
                <Button
                  onClick={logout}
                  loading={logoutMutation.isLoading}
                  variant="auth"
                  className="w-full mt-2"
                >
                  Logout
                </Button>
              </div>
            </div>
          </div>
        )}
      </QueryLoader>
    </div>
  );
}
