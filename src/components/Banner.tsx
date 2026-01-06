import React from 'react';

interface BannerProps {
  title: string;
  className?: string;
  children?: React.ReactNode;
}

const Banner: React.FC<BannerProps> = ({ title, className = '', children }) => {
  return (
    <div className={`bg-[#FF7A00] h-32 w-full rounded-b-3xl flex items-center justify-center ${className}`}>
      <h1 className="text-3xl font-bold text-white text-center">Travelution</h1>
      {children}
    </div>
  );
};

export default Banner;
