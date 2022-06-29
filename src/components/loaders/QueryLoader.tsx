import { ExclamationIcon } from "@heroicons/react/outline";
import React, { useMemo } from "react";
import { UseQueryResult } from "react-query";
import { Spinner } from "~/components/icons/Spinner";

type Props<T, E, Control extends boolean = false> = {
  /** useQuery result */
  query: UseQueryResult<T, E>;

  /**
   * Acquire manual control over error
   *
   * If `false` a default error component will be displayed by the `QueryLoader`
   *
   * If `true` the children will always be rendered even when error is present
   */
  control?: Control;

  /**
   * Custom error message or component
   *
   * If `string` is provided `QueryLoader` will display the error message with its default error component
   */
  error?: Control extends true ? never : React.ReactNode;

  /**
   * Continue to show loading component while error is present or the given function returns true
   *
   * Set to `true` to keep loading while error is present (useful to avoid flashes while redirecting on not found content)
   *
   * Set to a `function` that return a `boolean` to keep loading as long the function returns true
   */
  keepLoading?:
    | boolean
    | ((data: T | undefined, error: E | undefined) => boolean);

  /**
   * React node or render function that returns a react node
   */
  children:
    | React.ReactNode
    | (Control extends true
        ? ChildrenWithDataOrError<T | undefined, E>
        : ChildrenWithData<T>);
};

type ChildrenWithData<T> = (data: T, error: undefined) => React.ReactNode;
type ChildrenWithError<E> = (data: undefined, error: E) => React.ReactNode;
type ChildrenWithDataOrError<T, E> = ChildrenWithData<T> & ChildrenWithError<E>;

export function QueryLoader<T, E>(props: Props<T, E, false>): JSX.Element;
export function QueryLoader<T, E>(props: Props<T, E, true>): JSX.Element;
export function QueryLoader<T, E, Control extends boolean>({
  query,
  error,
  control,
  keepLoading,
  children,
}: Props<T, E, Control>) {
  const shouldKeepLoading = useMemo(() => {
    const shouldKeepLoadingIfError = query.isError && !!keepLoading;
    return typeof keepLoading === "function"
      ? keepLoading(query.data, query.error ?? undefined)
      : shouldKeepLoadingIfError;
  }, [query, keepLoading]);

  if (query.isLoading || shouldKeepLoading)
    return (
      <div className="w-full h-full flex justify-center items-center">
        <Spinner className="w-8 h-8" />
      </div>
    );

  if (query.isSuccess)
    return (
      <>
        {typeof children === "function"
          ? children(query.data, undefined)
          : children}
      </>
    );

  if (query.isError)
    return (
      <>
        {control ? (
          typeof children === "function" ? (
            (children as ChildrenWithDataOrError<T, E>)(undefined, query.error)
          ) : (
            children
          )
        ) : (
          <div className="w-full h-full flex justify-center items-center">
            {typeof error === "string" || error === undefined ? (
              <div className="flex flex-col items-center">
                <ExclamationIcon className="w-8 h-8" />
                <p className="text-sm">{error ?? "Error occured"}</p>
              </div>
            ) : (
              error
            )}
          </div>
        )}
      </>
    );
}
