import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
}

interface CardHeaderProps {
  children: React.ReactNode;
  icon?: LucideIcon;
  className?: string;
}

interface CardContentProps {
  children: React.ReactNode;
  className?: string;
}

interface CardFooterProps {
  children: React.ReactNode;
  className?: string;
}

export function Card({ children, className = '', hover = false, onClick }: CardProps) {
  const baseClasses = "bg-white rounded-xl shadow-sm border border-gray-100 transition-all duration-200";
  const hoverClasses = hover ? "hover:shadow-lg hover:scale-105 cursor-pointer" : "";
  
  return (
    <div 
      className={`${baseClasses} ${hoverClasses} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
}

export function CardHeader({ children, icon: Icon, className = '' }: CardHeaderProps) {
  return (
    <div className={`p-4 md:p-6 pb-3 md:pb-4 ${className}`}>
      <div className="flex items-center space-x-3">
        {Icon && (
          <div className="flex-shrink-0">
            <Icon className="w-5 h-5 md:w-6 md:h-6 text-blue-600" />
          </div>
        )}
        <div className="flex-1">
          {children}
        </div>
      </div>
    </div>
  );
}

export function CardContent({ children, className = '' }: CardContentProps) {
  return (
    <div className={`px-4 md:px-6 pb-3 md:pb-4 ${className}`}>
      {children}
    </div>
  );
}

export function CardFooter({ children, className = '' }: CardFooterProps) {
  return (
    <div className={`px-4 md:px-6 py-3 md:py-4 border-t border-gray-100 bg-gray-50 rounded-b-xl ${className}`}>
      {children}
    </div>
  );
}