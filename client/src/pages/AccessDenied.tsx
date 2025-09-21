import { Link } from "react-router-dom";
import { ShieldExclamationIcon } from "@heroicons/react/24/outline";
import { Button } from "@/components/ui/button";

const AccessDenied = () => {
    return (
        <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center px-4">
            <div className="text-center max-w-md">
                <div className="bg-red-100 p-3 rounded-full inline-block mb-4">
                    <ShieldExclamationIcon className="h-12 w-12 text-red-600" />
                </div>
                <h1 className="text-3xl font-bold text-slate-900 mb-2">Access Denied</h1>
                <p className="text-slate-600 mb-6">
                    You don't have permission to access the admin dashboard. This area is restricted to administrators only.
                </p>
                <div className="space-y-3">
                    <Link to="/home">
                        <Button className="w-full">
                            Return to Home
                        </Button>
                    </Link>
                    <Link to="/profile">
                        <Button variant="outline" className="w-full">
                            Go to Your Profile
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default AccessDenied;