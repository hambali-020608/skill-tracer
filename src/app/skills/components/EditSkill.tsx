"use client";
import { Suspense } from "react";
import updateSkill from "../mutations/updateSkill";
import getSkill from "../queries/getSkill";
import { UpdateSkillSchema } from "../schemas";
import { FORM_ERROR, SkillForm } from "./SkillForm";
import { useMutation, useQuery } from "@blitzjs/rpc";
import { useRouter } from "next/navigation";

export const EditSkill = ({ skillId }: { skillId: number }) => {
  const [skill, { setQueryData }] = useQuery(
    getSkill,
    { id: skillId },
    {
      // This ensures the query never refreshes and overwrites the form data while the user is editing.
      staleTime: Infinity,
    }
  );
  const [updateSkillMutation] = useMutation(updateSkill);
  const router = useRouter();
  return (
    <>
      <div>
        <h1>Edit Skill {skill.id}</h1>
        <pre>{JSON.stringify(skill, null, 2)}</pre>
        <Suspense fallback={<div>Loading...</div>}>
          <SkillForm
            submitText="Update Skill"
            schema={UpdateSkillSchema}
            initialValues={skill}
            onSubmit={async (values) => {
              try {
                const updated = await updateSkillMutation({
                  ...values,
                  id: skill.id,
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
