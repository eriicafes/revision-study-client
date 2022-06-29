import { AxiosError } from "axios";
import {
  MutationFunction,
  useMutation,
  UseMutationOptions,
  UseQueryOptions
} from "react-query";

// Query Key
type NamespacedQueryKey<T extends string> = {
  [K in `${T}Key`]: string[];
} & {
    [K in `${T}KeyResolve`]: (...paths: string[]) => string[];
  };

/**
 * Namespace query key to use in grouping related queries together
 * @param namespace Query key namespace
 * @returns Typed object containing namespaced query key
 */
export const namespaceQueryKey = <T extends string>(namespace: T) => {
  const resolver = (...paths: T[]) => [namespace].concat(paths);

  return {
    [`${namespace}Key`]: [namespace],
    [`${namespace}KeyResolve`]: resolver,
  } as NamespacedQueryKey<T>;
};

export type DefaultError = {
  message: string;
  statusCode: number;
};

// Query Options
export type QueryOptions<TData, TSelect = TData, TError = DefaultError> = Omit<
  UseQueryOptions<TData, AxiosError<TError>, TSelect, string[]>,
  "queryKey" | "queryFn"
>;

// Mutation Funtion
export type MutationFn<
  TData = void,
  TVariables = null,
  _TError = DefaultError
  > = MutationFunction<TData, TVariables>;

export type MutationOptions<TData, TVariables, TError> = Omit<
  UseMutationOptions<TData, TError, TVariables>,
  "mutationFn"
>;

export function useTypedMutation<
  Fn extends MutationFn<any, any, any>,
  Data = Fn extends MutationFn<infer TData, infer _TVariables, infer _TError>
  ? TData
  : never,
  Variables = Fn extends MutationFn<
    infer _TData,
    infer TVariables,
    infer _TError
  >
  ? TVariables
  : never,
  Error = Fn extends MutationFn<infer _TData, infer _TVariables, infer TError>
  ? TError
  : never
>(fn: Fn, options?: MutationOptions<Data, Variables, AxiosError<Error>>) {
  return useMutation(fn, options);
}
