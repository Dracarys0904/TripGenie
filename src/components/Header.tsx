import React from 'react';
import { Plane } from 'lucide-react';

interface HeaderProps {
  onBackToHome: () => void;
  showBackButton: boolean;
}

export const Header: React.FC<HeaderProps> = ({ onBackToHome, showBackButton }) => {
  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Plane className="h-8 w-8 text-blue-600" />
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-orange-500 bg-clip-text text-transparent">
              Trip Genie
            </h1>
          </div>
          
          {showBackButton && (
            <button
              onClick={onBackToHome}
              className="px-4 py-2 text-blue-600 hover:text-blue-800 font-medium transition-colors"
            >
              ← Back to Home
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
