import { type ReactNode } from 'react';
import { Button } from '@/components/ui/button';

interface ConfirmationModalProps {
    title: string;
    message: string;
    isOpen: boolean;
    isLoading?: boolean;
    onClose: () => void;
    onConfirm: () => void;
    children?: ReactNode;
}

const ConfirmationModal = ({
    title,
    message,
    isOpen,
    isLoading = false,
    onClose,
    onConfirm,
    children,
}: ConfirmationModalProps) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
                <h3 className="text-lg font-medium mb-4">{title}</h3>
                <p className="text-gray-600 mb-6">{message}</p>
                {children}
                <div className="flex justify-end space-x-3">
                    <Button variant="outline" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button variant="destructive" onClick={onConfirm} disabled={isLoading}>
                        {isLoading ? 'Processing...' : 'Delete'}
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationModal;