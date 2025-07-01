
import React from 'react';
import { MapPin, Clock, Compass } from 'lucide-react';

interface HeroProps {
  onStartPlanning: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onStartPlanning }) => {
  return (
    <div className="relative overflow-hidden">
      <div className="container mx-auto px-4 py-20">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Plan Your Perfect Trip with{' '}
            <span className="bg-gradient-to-r from-blue-600 to-orange-500 bg-clip-text text-transparent">
              AI Magic
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-12 leading-relaxed">
            Tell us your preferences, and our AI will craft a personalized itinerary 
            with day-wise plans, local experiences, and insider tips just for you.
          </p>

          <button
            onClick={onStartPlanning}
            className="bg-gradient-to-r from-blue-600 to-orange-500 hover:from-blue-700 hover:to-orange-600 text-white font-semibold py-4 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            Start Planning Your Adventure
          </button>

          <div className="grid md:grid-cols-3 gap-8 mt-20">
            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 shadow-lg">
              <MapPin className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Smart Destinations</h3>
              <p className="text-gray-600">AI suggests perfect destinations based on your preferences and budget</p>
            </div>
            
            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 shadow-lg">
              <Clock className="h-12 w-12 text-orange-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Day-wise Planning</h3>
              <p className="text-gray-600">Detailed itinerary with timings, places to visit, and travel durations</p>
            </div>
            
            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 shadow-lg">
              <Compass className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Local Insights</h3>
              <p className="text-gray-600">Weather-aware suggestions, packing tips, and local experiences</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
