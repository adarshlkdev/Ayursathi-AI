// filepath: client/src/components/ui/Button.jsx
import React from 'react';
import { Link } from 'react-router-dom';

export const Button = ({ 
  children, 
  className = '',
  variant = 'primary', // primary, secondary, outline, danger, success
  size = 'md', // sm, md, lg
  fullWidth = false,
  disabled = false,
  loading = false,
  loadingText = 'Loading...',
  icon,
  onClick,
  type = 'button',
  ...props
}) => {
  const baseClasses = 'inline-flex items-center justify-center rounded-lg font-medium transition-colors';
  
  const sizeClasses = {
    sm: 'py-1.5 px-3 text-sm',
    md: 'py-2 px-4',
    lg: 'py-3 px-6'
  };
  
  const variantClasses = {
    primary: 'bg-gradient-to-r from-teal-500 to-green-400 hover:from-teal-400 hover:to-green-400 text-white',
    secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-800',
    outline: 'border border-gray-300 text-gray-700 hover:bg-gray-50',
    danger: 'bg-red-600 hover:bg-red-700 text-white',
    success: 'bg-green-600 hover:bg-green-700 text-white',
  };

  const classes = `
    ${baseClasses} 
    ${sizeClasses[size]} 
    ${variantClasses[variant]}
    ${fullWidth ? 'w-full' : ''}
    ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
    ${className}
  `;
  
  return (
    <button
      type={type}
      className={classes}
      disabled={disabled || loading}
      onClick={onClick}
      {...props}
    >
      {loading ? (
        <>
          <span className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-current mr-2"></span>
          <span>{loadingText}</span>
        </>
      ) : (
        <>
          {icon && <span className="mr-2">{icon}</span>}
          {children}
        </>
      )}
    </button>
  );
};

export const LinkButton = ({ 
  to, 
  children,
  className = '', 
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  icon,
  ...props 
}) => {
  const baseClasses = 'inline-flex items-center justify-center rounded-lg font-medium transition-colors';
  
  const sizeClasses = {
    sm: 'py-1.5 px-3 text-sm',
    md: 'py-2 px-4',
    lg: 'py-3 px-6'
  };
  
  const variantClasses = {
    primary: 'bg-gradient-to-r from-teal-600 to-blue-500 hover:from-teal-700 hover:to-blue-600 text-white',
    secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-800',
    outline: 'border border-gray-300 text-gray-700 hover:bg-gray-50',
    danger: 'bg-red-600 hover:bg-red-700 text-white',
    success: 'bg-green-600 hover:bg-green-700 text-white',
  };

  const classes = `
    ${baseClasses} 
    ${sizeClasses[size]} 
    ${variantClasses[variant]}
    ${fullWidth ? 'w-full' : ''}
    ${className}
  `;
  
  return (
    <Link 
      to={to} 
      className={classes}
      {...props}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {children}
    </Link>
  );
};
