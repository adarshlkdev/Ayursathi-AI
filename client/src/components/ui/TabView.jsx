// filepath: client/src/components/ui/TabView.jsx
import React, { useState } from 'react';

export const TabView = ({
  children,
  className = '',
  defaultTab = 0,
}) => {
  const [activeTab, setActiveTab] = useState(defaultTab);
  
  // Find all tabs and panels
  const tabs = React.Children.toArray(children).filter(
    (child) => child.type === Tab
  );
  
  // Return the active tab panel
  const activePanel = tabs[activeTab]?.props.children;
  
  return (
    <div className={`${className}`}>
      <div className="flex border-b">
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={`flex-1 py-4 px-6 text-center font-medium transition-colors ${
              activeTab === index
                ? 'border-b-2 border-teal-600 text-teal-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab(index)}
          >
            {tab.props.label}
          </button>
        ))}
      </div>
      <div className="py-6">
        {activePanel}
      </div>
    </div>
  );
};

export const Tab = ({ 
  label, 
  children 
}) => {
  // This component is just a wrapper for its children
  // The actual rendering happens in the TabView component
  return <>{children}</>;
};
