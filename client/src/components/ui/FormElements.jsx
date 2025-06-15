// filepath: client/src/components/ui/FormElements.jsx
import React from 'react';

export const FormLabel = ({ 
  children, 
  htmlFor, 
  required = false,
  className = '' 
}) => {
  return (
    <label 
      htmlFor={htmlFor} 
      className={`block text-gray-700 font-medium mb-2 ${className}`}
    >
      {children}
      {required && <span className="text-red-500 ml-1">*</span>}
    </label>
  );
};

export const Input = React.forwardRef(({ 
  className = '', 
  error = null,
  ...props 
}, ref) => {
  return (
    <div className="w-full">
      <input
        ref={ref}
        className={`
          w-full shadow-sm rounded-lg border border-gray-300 px-4 py-2
          focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent
          ${error ? 'border-red-500 bg-red-50' : 'border-gray-300'}
          ${className}
        `}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
});

export const Textarea = React.forwardRef(({ 
  className = '', 
  error = null,
  ...props 
}, ref) => {
  return (
    <div className="w-full">
      <textarea
        ref={ref}
        className={`
          w-full shadow-sm rounded-lg border px-4 py-2
          focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent
          ${error ? 'border-red-500 bg-red-50' : 'border-gray-300'}
          ${className}
        `}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
});

export const Select = React.forwardRef(({ 
  className = '', 
  children,
  error = null,
  ...props 
}, ref) => {
  return (
    <div className="w-full">
      <select
        ref={ref}
        className={`
          w-full shadow-sm rounded-lg border px-4 py-2 appearance-none bg-white
          focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent
          ${error ? 'border-red-500 bg-red-50' : 'border-gray-300'}
          ${className}
        `}
        {...props}
      >
        {children}
      </select>
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
});

export const FormGroup = ({ 
  children, 
  className = '',
}) => {
  return (
    <div className={`mb-6 ${className}`}>
      {children}
    </div>
  );
};

export const FormHelperText = ({
  children,
  className = '',
}) => {
  return (
    <p className={`mt-2 text-sm text-gray-500 ${className}`}>
      {children}
    </p>
  );
};
