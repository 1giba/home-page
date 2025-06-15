import React from 'react';

interface TechItemProps {
  name: string;
  icon: string;
  color?: string;
}

const TechItem: React.FC<TechItemProps> = ({ name, icon, color }) => {
  return (
    <div
      className="inline-flex items-center justify-center w-10 h-10 m-1 bg-gray-100 rounded-md shadow-sm hover:shadow-md transition-all" title={name}
    >
      <i
        className={icon}
        style={{ color: color || 'inherit', fontSize: '1.75rem' }}
      />
    </div>
  );
};

export default TechItem;
