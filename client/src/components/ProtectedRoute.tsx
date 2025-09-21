import { Navigate } from "react-router-dom"
import type { ReactNode } from "react"
import { useAppSelector } from "@/hooks/redux"

interface ProtectedRouteProps {
    children: ReactNode
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const { isAuthenticated } = useAppSelector((state) => state.auth)

    return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />
}

export default ProtectedRoute