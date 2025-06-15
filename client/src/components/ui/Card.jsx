// filepath: client/src/components/ui/Card.jsx
import React from 'react';

export const Card = ({ 
  children, 
  className = '',
  onClick,
  ...props
}) => {
  return (
    <div 
      className={`bg-white rounded-lg shadow-md overflow-hidden ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </div>
  );
};

export const CardHeader = ({ 
  children, 
  className = '',
  title,
  subtitle,
  icon
}) => {
  return (
    <div className={`px-6 py-5 border-b border-gray-100 ${className}`}>
      {icon && title ? (
        <div className="flex items-center">
          {icon && <div className="mr-3">{icon}</div>}
          <div>
            <h3 className="text-lg font-bold text-gray-800">{title}</h3>
            {subtitle && <p className="text-sm text-gray-600 mt-1">{subtitle}</p>}
          </div>
        </div>
      ) : (
        <>
          {title && <h3 className="text-lg font-bold text-gray-800">{title}</h3>}
          {subtitle && <p className="text-sm text-gray-600 mt-1">{subtitle}</p>}
          {children}
        </>
      )}
    </div>
  );
};

export const CardContent = ({ 
  children, 
  className = '' 
}) => {
  return (
    <div className={`p-6 ${className}`}>
      {children}
    </div>
  );
};

export const CardFooter = ({ 
  children, 
  className = '' 
}) => {
  return (
    <div className={`px-6 py-4 border-t border-gray-100 ${className}`}>
      {children}
    </div>
  );
};

export const CardStatItem = ({
  icon,
  label,
  value,
  iconColor = 'text-teal-600',
  iconBgColor = 'bg-teal-100',
  loading = false,
}) => {
  return (
    <div className="flex items-center">
      <div className={`p-3 rounded-full ${iconBgColor} ${iconColor}`}>
        {icon}
      </div>
      <div className="ml-4">
        <h2 className="font-semibold text-gray-800">{label}</h2>
        <p className="text-2xl font-bold text-gray-700">
          {loading ? '...' : value}
        </p>
      </div>
    </div>
  );
};

export const Badge = ({ 
  children, 
  className = '',
  variant = 'default' // default, success, warning, danger, info
}) => {
  const variantClasses = {
    default: 'bg-gray-100 text-gray-800',
    success: 'bg-green-100 text-green-800',
    warning: 'bg-yellow-100 text-yellow-800',
    danger: 'bg-red-100 text-red-800',
    info: 'bg-blue-100 text-blue-800',
  };
  
  return (
    <span className={`px-2.5 py-1 rounded-full text-sm font-medium ${variantClasses[variant]} ${className}`}>
      {children}
    </span>
  );
};
