import { Metadata } from "next";
import { Suspense } from "react";
import { invoke } from "src/app/blitz-server";
import getSkill from "../../queries/getSkill";
import { EditSkill } from "../../components/EditSkill";

type EditSkillPageProps = {
  params: Promise<{ skillId: string }>;
};

export async function generateMetadata(
  props: EditSkillPageProps
): Promise<Metadata> {
  const params = await props.params;
  const Skill = await invoke(getSkill, { id: Number(params.skillId) });
  return {
    title: `Edit Skill ${Skill.id} - ${Skill.name}`,
  };
}

export default async function Page(props: EditSkillPageProps) {
  const params = await props.params;
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditSkill skillId={Number(params.skillId)} />
      </Suspense>
    </div>
  );
}
