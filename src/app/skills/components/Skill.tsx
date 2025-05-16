"use client";
import { useMutation, useQuery } from "@blitzjs/rpc";
import Link from "next/link";
import { useRouter } from "next/navigation";
import deleteSkill from "../mutations/deleteSkill";
import getSkill from "../queries/getSkill";

export const Skill = ({ skillId }: { skillId: number }) => {
  const router = useRouter();
  const [deleteSkillMutation] = useMutation(deleteSkill);
  const [skill] = useQuery(getSkill, { id: skillId });

  return (
    <>
      <div>
        <h1>Project {skill.id}</h1>
        <pre>{JSON.stringify(skill, null, 2)}</pre>

        <Link href={`/skills/${skill.id}/edit`}>Edit</Link>

        <button
          type="button"
          onClick={async () => {
            if (window.confirm("This will be deleted")) {
              await deleteSkillMutation({ id: skill.id });
              router.push("/skills");
            }
          }}
          style={{ marginLeft: "0.5rem" }}
        >
          Delete
        </button>
      </div>
    </>
  );
};
