import React, { Suspense } from "react";
import { Form, FormProps } from "src/app/components/Form";
import { LabeledTextField } from "src/app/components/LabeledTextField";

import { z } from "zod";
export { FORM_ERROR } from "src/app/components/Form";

export function SkillForm<S extends z.ZodType<any, any>>(
  { children, ...props }: FormProps<S> & { children: React.ReactNode }
) {
  return (
    <Form<S> {...props}>
      {children}
    </Form>
  );
}