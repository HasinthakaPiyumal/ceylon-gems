import { Navigate } from "react-router-dom"
import type { ReactNode } from "react"
import { useAppSelector } from "@/hooks/redux"

interface AdminRouteProps {
    children: ReactNode
}

const AdminRoute = ({ children }: AdminRouteProps) => {
    const { isAuthenticated, user } = useAppSelector((state) => state.auth)

    // Not authenticated at all - redirect to login
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />
    }

    // Authenticated but not admin - redirect to access denied page
    if (!user || user.role !== "ADMIN") {
        return <Navigate to="/access-denied" replace />
    }

    // Admin user - allow access
    return <>{children}</>
}

export default AdminRoute