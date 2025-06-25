"use client";
import { Suspense } from "react";
import updateChatbot from "../mutations/updateChatbot";
import getChatbot from "../queries/getChatbot";
import { UpdateChatbotSchema } from "../schemas";
import { FORM_ERROR, ChatbotForm } from "./ChatbotForm";
import { useMutation, useQuery } from "@blitzjs/rpc";
import { useRouter } from "next/navigation";

export const EditChatbot = ({ chatbotId }: { chatbotId: number }) => {
  const [chatbot, { setQueryData }] = useQuery(
    getChatbot,
    { id: chatbotId },
    {
      // This ensures the query never refreshes and overwrites the form data while the user is editing.
      staleTime: Infinity,
    }
  );
  const [updateChatbotMutation] = useMutation(updateChatbot);
  const router = useRouter();
  return (
    <>
      <div>
        <h1>Edit Chatbot {chatbot.id}</h1>
        <pre>{JSON.stringify(chatbot, null, 2)}</pre>
        <Suspense fallback={<div>Loading...</div>}>
          <ChatbotForm
            submitText="Update Chatbot"
            schema={UpdateChatbotSchema}
            initialValues={chatbot}
            onSubmit={async (values) => {
              try {
                const updated = await updateChatbotMutation({
                  ...values,
                  id: chatbot.id,
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
