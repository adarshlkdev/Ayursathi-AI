// filepath: client/src/components/ui/Alert.jsx
import React from 'react';
import { AlertCircle, Info, CheckCircle, AlertTriangle } from 'lucide-react';

export const Alert = ({ 
  children, 
  className = '',
  title,
  variant = 'info', // info, success, warning, error
  icon,
}) => {
  const variantClasses = {
    info: 'bg-blue-50 border-blue-200 text-blue-800',
    success: 'bg-green-50 border-green-200 text-green-800',
    warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
    error: 'bg-red-50 border-red-200 text-red-800',
  };

  const variantIcons = {
    info: <Info className="h-5 w-5" />,
    success: <CheckCircle className="h-5 w-5" />,
    warning: <AlertTriangle className="h-5 w-5" />,
    error: <AlertCircle className="h-5 w-5" />,
  };

  const alertIcon = icon || variantIcons[variant];

  return (
    <div className={`rounded-lg border p-4 ${variantClasses[variant]} ${className}`}>
      <div className="flex">
        {alertIcon && (
          <div className="flex-shrink-0 mr-3">
            {alertIcon}
          </div>
        )}
        <div>
          {title && <h3 className="font-medium mb-1">{title}</h3>}
          <div className="text-sm">{children}</div>
        </div>
      </div>
    </div>
  );
};
