import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import { forwardRef } from "react"
import type { InputHTMLAttributes, ReactNode } from "react"

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string
    error?: string
    className?: string
    icon?: ReactNode
}

const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
    ({ label, error, className, icon, ...props }, ref) => {
        return (
            <div className="space-y-2">
                {label && (
                    <Label htmlFor={props.id} className="text-sm font-medium">
                        {label}
                    </Label>
                )}
                <div className="relative">
                    {icon && <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">{icon}</div>}
                    <Input
                        ref={ref}
                        className={cn(
                            error && "border-red-500 focus:ring-red-500",
                            icon && "pl-10",
                            className
                        )}
                        {...props}
                    />
                </div>
                {error && (
                    <p className="text-sm text-red-600">{error}</p>
                )}
            </div>
        )
    }
)

InputField.displayName = "InputField"

export default InputField