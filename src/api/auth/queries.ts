import { useQuery } from "react-query";
import { User } from "~/interfaces/user";
import { namespaceQueryKey, QueryOptions } from "~/utils/query";
import { profile } from "./requests";

export const { authKey } = namespaceQueryKey("auth");

export const useAuth = (options?: QueryOptions<User>) =>
  useQuery(authKey, profile, options);
