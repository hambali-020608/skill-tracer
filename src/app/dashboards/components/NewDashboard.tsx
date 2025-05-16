"use client";
import { FORM_ERROR, DashboardForm } from "./DashboardForm";
// import { CreateDashboardSchema } from "../schemas";
import { useMutation } from "@blitzjs/rpc";
// import createDashboard from "../mutations/createDashboard";
import { useRouter } from "next/navigation";

export function New__ModelName() {
  // const [createDashboardMutation] = useMutation(createDashboard);
  const router = useRouter();
  return (
    <DashboardForm
      submitText="Create Dashboard"
      // schema={CreateDashboardSchema}
      onSubmit={async (values) => {
        try {
          // const dashboard = await createDashboardMutation(values);
          // router.push(`/dashboards/${dashboard.id}`);
        } catch (error: any) {
          console.error(error);
          return {
            [FORM_ERROR]: error.toString(),
          };
        }
      }}
    />
  );
}
