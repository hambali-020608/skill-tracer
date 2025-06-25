import { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { invoke } from "src/app/blitz-server";
import getChatbot from "../queries/getChatbot";
import { Chatbot } from "../components/Chatbot";

export async function generateMetadata(
  props: ChatbotPageProps
): Promise<Metadata> {
  const params = await props.params;
  const Chatbot = await invoke(getChatbot, { id: Number(params.chatbotId) });
  return {
    title: `Chatbot ${Chatbot.id} - ${Chatbot.name}`,
  };
}

type ChatbotPageProps = {
  params: Promise<{ chatbotId: string }>;
};

export default async function Page(props: ChatbotPageProps) {
  const params = await props.params;
  return (
    <div>
      <p>
        <Link href={"/chatbots"}>Chatbots</Link>
      </p>
      <Suspense fallback={<div>Loading...</div>}>
        <Chatbot chatbotId={Number(params.chatbotId)} />
      </Suspense>
    </div>
  );
}
