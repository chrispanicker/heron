'use client'

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { buttonClass } from "./classes";

interface Props {
  filters: any;
}

export function MobileFilters({ filters }: Props) {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const createQueryString = useCallback(
    (name: string, value: string) => {
      let params;
      let stringSearchParams = searchParams.toString();
      stringSearchParams = stringSearchParams.replaceAll("+", " ");
      params = new URLSearchParams(stringSearchParams);

      stringSearchParams.includes(`${name}=${value}`)
        ? params.delete(name, value)
        : params.append(name, value);
      return params.toString();
    },
    [searchParams]
  );

  const handleFilterClick = (name: string, value: string) => {
    const newQuery = createQueryString(name, value);
    router.push(`/?${newQuery}`, { scroll: false });
  };

  const handleClearAll = () => {
    router.push(`/?`, { scroll: false });
  };

  let allFilters: any = [];

  Object.entries(filters).map(([key, array]: any) => {
    array.map((filter: any, idx: any) => {
      allFilters[allFilters.length] = { filter: filter, key: key };
    });
  });

  const pathname = usePathname();
  const isSanityStudio = pathname.startsWith("/admin");

  return !isSanityStudio ? (
    <div className="">
      {allFilters.some((e: any) => e.key === "type") && (
        <div className="">
          <h2 className="w-full border-b-2 border-gray-300 mb-2">Filters:</h2>
          <span className={`mono-book uppercase text-sm`}>
            Types:
          </span>
          {allFilters.map((entry: any, idx: any) => {
            if (entry.key === "type") {
              return (
                <button
                  id={`${entry.filter}`}
                  key={`${entry.filter}${idx}`}
                  onClick={() => handleFilterClick(`${entry.key}`, `${entry.filter}`)}
                  className={`outline-1 text-sm ${buttonClass} ${
                    searchParams
                      .getAll(entry.key)
                      ?.includes(entry.filter)
                      ? "text-black bg-gray-300"
                      : "bg-black text-gray-300 outline"
                  }`}
                >
                  {`${entry.filter}`}
                </button>
              );
            }
          })}
        </div>
      )}

      {allFilters.some((e: any) => e.key === "tags") && (
        <div className="pt-2">
          <span className={`mono-book uppercase text-sm`}>
            Tags:
          </span>
          {allFilters.map((entry: any, idx: any) => {
            if (entry.key === "tags") {
              return (
                <button
                  id={`${entry.filter}`}
                  key={`${entry.filter}${idx}`}
                  onClick={() => handleFilterClick(`${entry.key}`, `${entry.filter}`)}
                  className={`outline-1 px-2 rounded-xl text-sm ${buttonClass} ${
                    searchParams
                      .getAll(entry.key)
                      ?.includes(entry.filter)
                      ? "text-black bg-gray-300"
                      : "bg-black text-gray-300 outline"
                  }`}
                >
                  {`${entry.filter}`}
                </button>
              );
            }
          })}
        </div>
      )}

      <button onClick={()=>{router.push( `/?`, {scroll: false})}} className={`${buttonClass} text-gray-300 bg-black outline-gray-300 outline-1 outline mt-2 w-full`}>
        {`CLEAR ALL`}
      </button>

    </div>
  ) : (
    ""
  );
}
