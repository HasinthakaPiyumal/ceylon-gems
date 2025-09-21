import React from 'react';

interface LoadingSpinnerProps {
    size?: 'sm' | 'md' | 'lg';
    color?: string;
    className?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
    size = 'md',
    color = 'indigo',
    className = '',
}) => {
    const sizeClasses = {
        sm: 'h-8 w-8 border-2',
        md: 'h-12 w-12 border-3',
        lg: 'h-16 w-16 border-4',
    };

    const borderColorClass = `border-${color}-600`;

    return (
        <div className="flex justify-center items-center">
            <div
                className={`
          animate-spin rounded-full 
          border-t-4 border-b-4 
          ${borderColorClass} 
          ${sizeClasses[size]} 
          ${className}
        `}
                aria-label="Loading"
            />
        </div>
    );
};

export default LoadingSpinner;