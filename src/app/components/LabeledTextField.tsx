import { forwardRef, PropsWithoutRef } from "react"
import { useField, useFormikContext, ErrorMessage } from "formik"

export interface LabeledTextFieldProps extends PropsWithoutRef<React.JSX.IntrinsicElements["input"]> {
  /** Field name. */
  name: string
  /** Field label. */
  label: string
  labelClass?:string
  // className: string
  /** Field type. Doesn't include radio buttons and checkboxes */
  type?: "text" | "password" | "email" | "number" | "date" | "datetime-local" | 'datetime'
  outerProps?: PropsWithoutRef<React.JSX.IntrinsicElements["div"]>
}

export const LabeledTextField = forwardRef<HTMLInputElement, LabeledTextFieldProps>(
  ({ name, label, labelClass,outerProps,...props }, ref) => {
    const [input] = useField(name)
    const { isSubmitting } = useFormikContext()

    return (
      <div {...outerProps}>
        <label className={labelClass}>
          {label}
          <input {...input} disabled={isSubmitting} {...props} ref={ref} />
        </label>

        <ErrorMessage name={name}>
          {(msg) => (
            <div role="alert" style={{ color: "red" }}>
              {msg}
            </div>
          )}
        </ErrorMessage>

        {/* <style jsx>{`
          label {
            display: flex;
            flex-direction: column;
            align-items: start;
            // font-size: 1rem;
          }
          // input {
          //   font-size: 1rem;
          //   padding: 0.25rem 0.5rem;
          //   border-radius: 3px;
          //   border: 1px solid purple;
          //   appearance: none;
          //   margin-top: 0.5rem;
          // }
        `}</style> */}
      </div>
    )
  }
)

LabeledTextField.displayName = "LabeledTextField"

export default LabeledTextField
