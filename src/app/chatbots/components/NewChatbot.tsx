"use client";
import { FORM_ERROR, ChatbotForm } from "./ChatbotForm";
import { CreateChatbotSchema } from "../schemas";
import { useMutation } from "@blitzjs/rpc";
import createChatbot from "../mutations/createChatbot";
import { useRouter } from "next/navigation";

export function New__ModelName() {
  const [createChatbotMutation] = useMutation(createChatbot);
  const router = useRouter();
  return (
    <ChatbotForm
      submitText="Create Chatbot"
      schema={CreateChatbotSchema}
      onSubmit={async (values) => {
        try {
          const chatbot = await createChatbotMutation(values);
          router.push(`/chatbots/${chatbot.id}`);
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
