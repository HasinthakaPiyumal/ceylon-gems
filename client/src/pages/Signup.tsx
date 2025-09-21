import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useMutation } from "@tanstack/react-query"
import { useNavigate, Link } from "react-router-dom"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import InputField from "@/components/InputField"
import { authApi } from "@/lib/api"
import type { SignupRequest } from "@/lib/api"
import {
    UserIcon,
    EnvelopeIcon,
    LockClosedIcon,
    PhoneIcon,
    MapPinIcon
} from "@heroicons/react/24/outline"

const signupSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Please enter a valid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
    phone: z.string().min(10, "Phone number must be at least 10 characters"),
    address: z.string().min(5, "Address must be at least 5 characters"),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
})

type SignupFormData = z.infer<typeof signupSchema>

const Signup = () => {
    const [error, setError] = useState<string>("")
    const [success, setSuccess] = useState<string>("")
    const [isLoading, setIsLoading] = useState(false)
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
            setIsLoading(false)
            setTimeout(() => {
                navigate('/login')
            }, 2000)
        },
        onError: (error: unknown) => {
            setIsLoading(false)
            if (error && typeof error === 'object' && 'response' in error) {
                const axiosError = error as { response?: { data?: { message?: string } } }
                setError(axiosError.response?.data?.message || "Signup failed. Please check your information and try again.")
            } else {
                setError("Signup failed. Please check your connection and try again.")
            }
            setSuccess("")
        },
    })

    const onSubmit = (data: SignupFormData) => {
        try {
            setError("")
            setSuccess("")
            setIsLoading(true)
            console.log('Form submitted with data:', data)

            const signupData: SignupRequest = {
                name: data.name,
                email: data.email,
                password: data.password,
                phone: data.phone,
                address: data.address,
            }
            signupMutation.mutate(signupData)
        } catch (err) {
            setIsLoading(false)
            console.error('Unexpected error:', err)
            setError("An unexpected error occurred. Please try again.")
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200">
            <div className="w-full max-w-lg p-6 space-y-8">
                <div className="text-center">
                    <h1 className="text-3xl font-semibold text-gray-800">Ceylon Gems</h1>
                    <h2 className="text-2xl font-medium text-gray-700 mt-2">Create an account</h2>
                    <p className="text-gray-500 mt-2">Join us today</p>
                </div>

                <Card className="border-0 bg-white/40 backdrop-blur-lg shadow-xl">
                    <CardContent className="pt-6">
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                            <div className="space-y-4">
                                <InputField
                                    label="Full Name"
                                    type="text"
                                    id="name"
                                    autoComplete="name"
                                    {...register("name")}
                                    error={errors.name?.message}
                                    placeholder="John Doe"
                                    icon={<UserIcon className="h-5 w-5 text-gray-500" />}
                                />

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

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <InputField
                                        label="Password"
                                        type="password"
                                        id="password"
                                        autoComplete="new-password"
                                        {...register("password")}
                                        error={errors.password?.message}
                                        placeholder="••••••••"
                                        icon={<LockClosedIcon className="h-5 w-5 text-gray-500" />}
                                    />

                                    <InputField
                                        label="Confirm Password"
                                        type="password"
                                        id="confirmPassword"
                                        autoComplete="new-password"
                                        {...register("confirmPassword")}
                                        error={errors.confirmPassword?.message}
                                        placeholder="••••••••"
                                        icon={<LockClosedIcon className="h-5 w-5 text-gray-500" />}
                                    />
                                </div>

                                <InputField
                                    label="Phone Number"
                                    type="tel"
                                    id="phone"
                                    autoComplete="tel"
                                    {...register("phone")}
                                    error={errors.phone?.message}
                                    placeholder="+94 7XX XXX XXX"
                                    icon={<PhoneIcon className="h-5 w-5 text-gray-500" />}
                                />

                                <InputField
                                    label="Address"
                                    type="text"
                                    id="address"
                                    autoComplete="street-address"
                                    {...register("address")}
                                    error={errors.address?.message}
                                    placeholder="123 Main St, Colombo"
                                    icon={<MapPinIcon className="h-5 w-5 text-gray-500" />}
                                />
                            </div>

                            {error && (
                                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">
                                    <p className="flex items-center">
                                        <span className="mr-2">⚠️</span>
                                        {error}
                                    </p>
                                </div>
                            )}

                            {success && (
                                <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-md text-sm">
                                    <p className="flex items-center">
                                        <span className="mr-2">✅</span>
                                        {success}
                                    </p>
                                </div>
                            )}

                            <Button
                                type="submit"
                                className="w-full bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 focus:ring-indigo-500 text-white"
                                disabled={isLoading || signupMutation.isPending}
                            >
                                {isLoading || signupMutation.isPending ? (
                                    <div className="flex items-center justify-center">
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Creating account...
                                    </div>
                                ) : "Sign Up"}
                            </Button>

                            <div className="text-center text-sm mt-6">
                                <span className="text-gray-600">Already have an account? </span>
                                <Link
                                    to="/login"
                                    className="font-medium text-indigo-600 hover:text-indigo-800"
                                >
                                    Sign in
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

export default Signup