
import React from 'react';
import { Compass } from 'lucide-react';

export const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <div className="relative">
        <Compass className="h-16 w-16 text-blue-600 animate-spin" />
        <div className="absolute inset-0 h-16 w-16 border-4 border-orange-200 border-t-orange-500 rounded-full animate-spin"></div>
      </div>
      
      <div className="mt-8 text-center max-w-md">
        <h3 className="text-2xl font-bold text-gray-900 mb-4">
          Crafting Your Perfect Trip ✨
        </h3>
        <p className="text-gray-600 mb-4">
          Our AI is analyzing your preferences and creating a personalized itinerary just for you...
        </p>
        
        <div className="space-y-2 text-sm text-gray-500">
          <div className="flex items-center justify-center space-x-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
            <span>Finding the perfect destinations</span>
          </div>
          <div className="flex items-center justify-center space-x-2">
            <div className="w-2 h-2 bg-orange-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
            <span>Planning day-wise activities</span>
          </div>
          <div className="flex items-center justify-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></div>
            <span>Adding local insights and tips</span>
          </div>
        </div>
      </div>
    </div>
  );
};
