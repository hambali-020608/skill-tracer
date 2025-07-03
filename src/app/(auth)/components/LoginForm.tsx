"use client"
import { AuthenticationError, PromiseReturnType } from "blitz"
import Link from "next/link"
import { LabeledTextField } from "src/app/components/LabeledTextField"
import { Form, FORM_ERROR } from "src/app/components/Form"
import login from "../mutations/login"
import { Login } from "../validations"
import { useMutation } from "@blitzjs/rpc"
import { useSearchParams } from "next/navigation"
import { useRouter } from "next/navigation"
import type { Route } from "next"
import { FiLock, FiMail, FiArrowRight, FiUserPlus } from "react-icons/fi"

type LoginFormProps = {
  onSuccess?: (user: PromiseReturnType<typeof login>) => void
}

export const LoginForm = (props: LoginFormProps) => {
  const [loginMutation] = useMutation(login)
  const router = useRouter()
  const next = useSearchParams()?.get("next")

  return (
    <div className="max-w-md w-full bg-gray-800 p-10 rounded-xl border-l-4 border-indigo-500 shadow-2xl">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-100 mb-2">Welcome Back</h1>
        <p className="text-gray-400">Track your skill progress with precision</p>
      </div>

      <Form
        submitText={
          <div className="flex items-center justify-center gap-2">
            Login
          </div>
        }
        schema={Login}
        initialValues={{ email: "", password: "" }}
        onSubmit={async (values) => {
          try {
            const user = await loginMutation(values)
            props.onSuccess?.(user)
            router.refresh()
            if (next) {
              router.push(next as Route)
            } else {
              router.push("/")
            }
          } catch (error: any) {
            if (error instanceof AuthenticationError) {
              return { [FORM_ERROR]: "Invalid credentials. Please try again." }
            } else {
              return {
                [FORM_ERROR]: "An unexpected error occurred. Please try again later.",
              }
            }
          }
        }}
      >
        <div className="space-y-6">
          <LabeledTextField
            name="email"
            label="Email"
            placeholder="your@email.com"
            
            className="bg-gray-700 border-gray-600 focus:ring-indigo-500 focus:border-indigo-500"
          />
          
          <LabeledTextField
            name="password"
            label="Password"
            placeholder="••••••••"
            type="password"
            
            className="bg-gray-700 border-gray-600 focus:ring-indigo-500 focus:border-indigo-500"
          />

          <div className="flex items-center justify-between">
            <Link 
              href="/forgot-password" 
              className="text-sm text-indigo-400 hover:text-indigo-300 transition-colors"
            >
              Forgot password?
            </Link>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-4 rounded-lg font-medium transition-colors shadow-md hover:shadow-indigo-500/20"
            >
              Login
            </button>
          </div>
        </div>
      </Form>

      <div className="mt-6 text-center text-sm text-gray-400">
        Dont have an account?{" "}
        <Link 
          href="/signup" 
          className="text-indigo-400 hover:text-indigo-300 transition-colors flex items-center justify-center gap-1"
        >
          Sign up 
        </Link>
      </div>
    </div>
  )
}