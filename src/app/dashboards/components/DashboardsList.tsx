"use client";
import { usePaginatedQuery } from "@blitzjs/rpc";
import Link from "next/link";
import { useRouter } from "next/navigation";
import getDashboards from "../queries/getDashboards";
import { useSearchParams } from "next/navigation";
import { usePathname } from "next/navigation";
import { Route } from "next";

const ITEMS_PER_PAGE = 100;

export const DashboardsList = () => {
  const searchparams = useSearchParams()!;
  const page = Number(searchparams.get("page")) || 0;
  const [{ dashboards, hasMore }] = usePaginatedQuery(getDashboards, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  });
  const router = useRouter();
  const pathname = usePathname();

  const goToPreviousPage = () => {
    const params = new URLSearchParams(searchparams);
    params.set("page", (page - 1).toString());
    router.push((pathname + "?" + params.toString()) as Route);
  };
  const goToNextPage = () => {
    const params = new URLSearchParams(searchparams);
    params.set("page", (page + 1).toString());
    router.push((pathname + "?" + params.toString()) as Route);
  };

  return (
    <div>
      <ul>
        {dashboards.map((dashboard) => (
          <li key={dashboard.id}>
            <Link href={`/dashboards/${dashboard.id}`}>{dashboard.name}</Link>
          </li>
        ))}
      </ul>

      <button disabled={page === 0} onClick={goToPreviousPage}>
        Previous
      </button>
      <button disabled={!hasMore} onClick={goToNextPage}>
        Next
      </button>
    </div>
  );
};
