import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useMutation } from "@tanstack/react-query"
import { useNavigate, Link } from "react-router-dom"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import InputField from "@/components/InputField"
import { authApi } from "@/lib/api"
import type { SignupRequest } from "@/lib/api"

const signupSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
})

type SignupFormData = z.infer<typeof signupSchema>

const Signup = () => {
  const [error, setError] = useState<string>("")
  const [success, setSuccess] = useState<string>("")
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  })

  const signupMutation = useMutation({
    mutationFn: (data: SignupRequest) => authApi.signup(data),
    onSuccess: (response) => {
      setSuccess(response.data.message || "Account created successfully!")
      setError("")
      setTimeout(() => {
        navigate('/login')
      }, 2000)
    },
    onError: (error: unknown) => {
      if (error && typeof error === 'object' && 'response' in error) {
        const axiosError = error as { response?: { data?: { message?: string } } }
        setError(axiosError.response?.data?.message || "Signup failed. Please try again.")
      } else {
        setError("Signup failed. Please try again.")
      }
      setSuccess("")
    },
  })

  const onSubmit = (data: SignupFormData) => {
    setError("")
    setSuccess("")
    const signupData: SignupRequest = {
      name: data.name,
      email: data.email,
      password: data.password,
    }
    signupMutation.mutate(signupData)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-blue-600 mb-2">Ceylon Gems</h1>
          <p className="text-gray-600">Create your account to start exploring</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Sign Up</CardTitle>
            <CardDescription>
              Create a new account to access our gem collection
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <InputField
                label="Full Name"
                type="text"
                {...register("name")}
                error={errors.name?.message}
                placeholder="Enter your full name"
              />

              <InputField
                label="Email"
                type="email"
                {...register("email")}
                error={errors.email?.message}
                placeholder="Enter your email"
              />

              <InputField
                label="Password"
                type="password"
                {...register("password")}
                error={errors.password?.message}
                placeholder="Create a password"
              />

              <InputField
                label="Confirm Password"
                type="password"
                {...register("confirmPassword")}
                error={errors.confirmPassword?.message}
                placeholder="Confirm your password"
              />

              {error && (
                <div className="text-red-600 text-sm text-center">{error}</div>
              )}

              {success && (
                <div className="text-green-600 text-sm text-center">{success}</div>
              )}

              <Button
                type="submit"
                className="w-full"
                disabled={signupMutation.isPending}
              >
                {signupMutation.isPending ? "Creating account..." : "Sign Up"}
              </Button>

              <div className="text-center text-sm">
                <span className="text-gray-600">Already have an account? </span>
                <Link
                  to="/login"
                  className="font-medium text-blue-600 hover:text-blue-500"
                >
                  Sign in
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Signup