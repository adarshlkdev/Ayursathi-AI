// filepath: client/src/components/ui/Skeleton.jsx
import React from 'react';

export const Skeleton = ({ 
  className = '', 
  height,
  width, 
  borderRadius = 'rounded',
}) => {
  const style = {
    height: height ? height : undefined,
    width: width ? width : undefined,
  };

  return (
    <div 
      className={`animate-pulse bg-gray-200 ${borderRadius} ${className}`}
      style={style}
    />
  );
};

export const SkeletonText = ({ 
  lines = 1, 
  className = '' 
}) => {
  return (
    <div className={`space-y-2 ${className}`}>
      {Array(lines)
        .fill(null)
        .map((_, index) => (
          <Skeleton 
            key={index} 
            className="h-4 w-full" 
          />
        ))}
    </div>
  );
};

export const SkeletonCard = () => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden p-6">
      <Skeleton className="h-6 w-3/4 mb-4" />
      <SkeletonText lines={3} className="mb-6" />
      <div className="flex space-x-3">
        <Skeleton className="h-10 w-20" />
        <Skeleton className="h-10 w-20" />
      </div>
    </div>
  );
};
