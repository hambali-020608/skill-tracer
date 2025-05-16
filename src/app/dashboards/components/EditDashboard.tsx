"use client";
import { Suspense } from "react";
import updateDashboard from "../mutations/updateDashboard";
import getDashboard from "../queries/getDashboard";
import { UpdateDashboardSchema } from "../schemas";
import { FORM_ERROR, DashboardForm } from "./DashboardForm";
import { useMutation, useQuery } from "@blitzjs/rpc";
import { useRouter } from "next/navigation";

export const EditDashboard = ({ dashboardId }: { dashboardId: number }) => {
  const [dashboard, { setQueryData }] = useQuery(
    getDashboard,
    { id: dashboardId },
    {
      // This ensures the query never refreshes and overwrites the form data while the user is editing.
      staleTime: Infinity,
    }
  );
  const [updateDashboardMutation] = useMutation(updateDashboard);
  const router = useRouter();
  return (
    <>
      <div>
        <h1>Edit Dashboard {dashboard.id}</h1>
        <pre>{JSON.stringify(dashboard, null, 2)}</pre>
        <Suspense fallback={<div>Loading...</div>}>
          <DashboardForm
            submitText="Update Dashboard"
            schema={UpdateDashboardSchema}
            initialValues={dashboard}
            onSubmit={async (values) => {
              try {
                const updated = await updateDashboardMutation({
                  ...values,
                  id: dashboard.id,
                });
                await setQueryData(updated);
                router.refresh();
              } catch (error: any) {
                console.error(error);
                return {
                  [FORM_ERROR]: error.toString(),
                };
              }
            }}
          />
        </Suspense>
      </div>
    </>
  );
};
