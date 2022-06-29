import { useQueryClient } from "react-query";
import { AUTH_TOKEN_KEY } from "~/lib/http";
import { useTypedMutation } from "~/utils/query";
import { authKey } from "./queries";
import { login, logout, register } from "./requests";

export const useLoginMutation = () => {
  const queryClient = useQueryClient();

  return useTypedMutation(login, {
    onMutate() {
      return queryClient.cancelQueries(authKey);
    },

    onSuccess(data) {
      localStorage.setItem(AUTH_TOKEN_KEY, data.accessToken);

      return queryClient.invalidateQueries(authKey);
    },
  });
};

export const useRegisterMutation = () => {
  return useTypedMutation(register);
};

export const useLogoutMutation = () => {
  const queryClient = useQueryClient();

  return useTypedMutation(logout, {
    onMutate() {
      return queryClient.cancelQueries(authKey);
    },

    onSuccess() {
      localStorage.removeItem(AUTH_TOKEN_KEY);

      queryClient.invalidateQueries(authKey);
    },
  });
};
