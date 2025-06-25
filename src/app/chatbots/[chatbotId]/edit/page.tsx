import { Metadata } from "next";
import { Suspense } from "react";
import { invoke } from "src/app/blitz-server";
import getChatbot from "../../queries/getChatbot";
import { EditChatbot } from "../../components/EditChatbot";

type EditChatbotPageProps = {
  params: Promise<{ chatbotId: string }>;
};

export async function generateMetadata(
  props: EditChatbotPageProps
): Promise<Metadata> {
  const params = await props.params;
  const Chatbot = await invoke(getChatbot, { id: Number(params.chatbotId) });
  return {
    title: `Edit Chatbot ${Chatbot.id} - ${Chatbot.name}`,
  };
}

export default async function Page(props: EditChatbotPageProps) {
  const params = await props.params;
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditChatbot chatbotId={Number(params.chatbotId)} />
      </Suspense>
    </div>
  );
}
