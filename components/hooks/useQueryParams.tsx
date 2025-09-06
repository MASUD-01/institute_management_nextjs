"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

const useQueryParams = <
  T extends Record<string, string | number | boolean>
>() => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Convert readonly searchParams into a plain object
  const allQueryParams = Object.fromEntries(searchParams.entries());

  const setSearchParams = (params: Partial<T>) => {
    const newParams = new URLSearchParams(allQueryParams);

    Object.keys(params).forEach((key) => {
      const value = params[key as keyof T];
      if (value === undefined || value === null || value === "") {
        newParams.delete(key);
      } else {
        newParams.set(key, String(value));
      }
    });

    router.push(`${pathname}?${newParams.toString()}`);
  };

  return [
    allQueryParams as unknown as T,
    setSearchParams,
    searchParams,
  ] as const;
};

export default useQueryParams;
