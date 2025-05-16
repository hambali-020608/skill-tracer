import { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { invoke } from "src/app/blitz-server";
import getSkill from "../queries/getSkill";
import { Skill } from "../components/Skill";

export async function generateMetadata(
  props: SkillPageProps
): Promise<Metadata> {
  const params = await props.params;
  const Skill = await invoke(getSkill, { id: Number(params.skillId) });
  return {
    title: `Skill ${Skill.id} - ${Skill.skillName}`,
  };
}

type SkillPageProps = {
  params: Promise<{ skillId: string }>;
};

export default async function Page(props: SkillPageProps) {
  const params = await props.params;
  return (
    <div>
      <p>
        <Link href={"/skills"}>Skills</Link>
      </p>
      <Suspense fallback={<div>Loading...</div>}>
        <Skill skillId={Number(params.skillId)} />
      </Suspense>
    </div>
  );
}
