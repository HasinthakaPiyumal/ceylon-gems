import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useMutation } from "@tanstack/react-query"
import { useNavigate, Link } from "react-router-dom"
import { useAppDispatch } from "@/hooks/redux"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import InputField from "@/components/InputField"
import { authApi } from "@/lib/api"
import { loginSuccess } from "@/store/authSlice"
import type { LoginRequest } from "@/lib/api"
import { LockClosedIcon, EnvelopeIcon } from "@heroicons/react/24/outline"

const loginSchema = z.object({
    email: z.string().email("Please enter a valid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    rememberMe: z.boolean().optional(),
})

type LoginFormData = z.infer<typeof loginSchema>

const Login = () => {
    const [error, setError] = useState<string>("")
    const [isLoading, setIsLoading] = useState(false)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            rememberMe: false
        }
    })

    const loginMutation = useMutation({
        mutationFn: (data: LoginRequest) => authApi.login(data),
        onSuccess: (response) => {
            const { token, user } = response.data
            dispatch(loginSuccess({ token, user }))
            setIsLoading(false)
            navigate('/home')
        },
        onError: (error: unknown) => {
            setIsLoading(false)
            console.error('Login error:', error)
            if (error && typeof error === 'object' && 'response' in error) {
                const axiosError = error as { response?: { data?: { message?: string } } }
                setError(axiosError.response?.data?.message || "Invalid email or password. Please try again.")
            } else {
                setError("Login failed. Please check your connection and try again.")
            }
        },
        retry: false,
        throwOnError: false,
    })

    const onSubmit = async (data: LoginFormData) => {
        try {
            setError("")
            setIsLoading(true)
            console.log('Form submitted with data:', data)

            // Handle remember me functionality
            const { rememberMe, ...loginData } = data

            if (rememberMe) {
                localStorage.setItem('rememberEmail', data.email)
            } else {
                localStorage.removeItem('rememberEmail')
            }

            // Check if backend is running by making the request
            loginMutation.mutate(loginData)
        } catch (err) {
            setIsLoading(false)
            console.error('Unexpected error:', err)
            setError("An unexpected error occurred. Please try again.")
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200">
            <div className="w-full max-w-md p-6 space-y-8">
                <div className="text-center">
                    <h1 className="text-3xl font-semibold text-gray-800">Ceylon Gems</h1>
                    <h2 className="text-2xl font-medium text-gray-700 mt-2">Sign in</h2>
                    <p className="text-gray-500 mt-2">Welcome back</p>
                </div>

                <Card className="border-0 bg-white/40 backdrop-blur-lg shadow-xl">
                    <CardContent className="pt-6">
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                            <div className="space-y-4">
                                <InputField
                                    label="Email"
                                    type="email"
                                    id="email"
                                    autoComplete="email"
                                    {...register("email")}
                                    error={errors.email?.message}
                                    placeholder="name@example.com"
                                    icon={<EnvelopeIcon className="h-5 w-5 text-gray-500" />}
                                />

                                <InputField
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                    {...register("password")}
                                    error={errors.password?.message}
                                    placeholder="••••••••"
                                    icon={<LockClosedIcon className="h-5 w-5 text-gray-500" />}
                                />
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <input
                                        id="remember-me"
                                        type="checkbox"
                                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                        {...register("rememberMe")}
                                    />
                                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-600">
                                        Remember me
                                    </label>
                                </div>
                                <div className="text-sm">
                                    <Link to="/forgot-password" className="font-medium text-indigo-600 hover:text-indigo-800">
                                        Forgot password?
                                    </Link>
                                </div>
                            </div>

                            {error && (
                                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">
                                    <p className="flex items-center">
                                        <span className="mr-2">⚠️</span>
                                        {error}
                                    </p>
                                </div>
                            )}

                            <Button
                                type="submit"
                                className="w-full bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 focus:ring-indigo-500 text-white"
                                disabled={isLoading || loginMutation.isPending}
                            >
                                {isLoading || loginMutation.isPending ? (
                                    <div className="flex items-center justify-center">
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Signing in...
                                    </div>
                                ) : "Sign In"}
                            </Button>

                            <div className="text-center text-sm mt-6">
                                <span className="text-gray-600">Don't have an account? </span>
                                <Link
                                    to="/signup"
                                    className="font-medium text-indigo-600 hover:text-indigo-800"
                                >
                                    Sign up
                                </Link>
                            </div>
                        </form>
                    </CardContent>
                </Card>

                <div className="text-center text-xs text-gray-500 pt-4">
                    © 2025 Ceylon Gems. All rights reserved.
                </div>
            </div>

            {/* Subtle decorative elements for depth */}
            <div className="fixed top-20 left-20 w-64 h-64 bg-gradient-to-br from-indigo-200/10 to-indigo-300/20 rounded-full blur-3xl -z-10"></div>
            <div className="fixed bottom-20 right-20 w-72 h-72 bg-gradient-to-tl from-indigo-300/10 to-slate-300/20 rounded-full blur-3xl -z-10"></div>
        </div>
    )
}

export default Login