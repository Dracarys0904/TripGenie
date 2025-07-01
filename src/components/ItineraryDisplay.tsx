
import React from 'react';
import { MapPin, Clock, Utensils, Hotel, Wallet, Compass, Cloud, Users } from 'lucide-react';

interface ItineraryDisplayProps {
  itinerary: any;
}

export const ItineraryDisplay: React.FC<ItineraryDisplayProps> = ({ itinerary }) => {
  if (!itinerary) return null;

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header Section */}
      <div className="text-center bg-gradient-to-r from-blue-600 to-orange-500 text-white rounded-2xl p-8">
        <h1 className="text-4xl font-bold mb-4">
          Your Perfect Trip to {itinerary.destination?.name}
        </h1>
        <p className="text-xl opacity-90 mb-4">
          {itinerary.destination?.why}
        </p>
        <div className="flex flex-wrap justify-center gap-4 text-sm">
          <span className="bg-white/20 px-3 py-1 rounded-full">
            💰 {itinerary.overview?.totalCost}
          </span>
          <span className="bg-white/20 px-3 py-1 rounded-full">
            🌟 {itinerary.destination?.bestTimeToVisit}
          </span>
        </div>
      </div>

      {/* Highlights */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
          <Compass className="h-6 w-6 text-blue-600 mr-2" />
          Trip Highlights
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {itinerary.overview?.highlights?.map((highlight: string, index: number) => (
            <div key={index} className="bg-gradient-to-br from-blue-50 to-orange-50 p-4 rounded-lg">
              <span className="text-2xl mb-2 block">✨</span>
              <p className="text-gray-800 font-medium">{highlight}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Day-wise Itinerary */}
      <div className="space-y-6">
        <h2 className="text-3xl font-bold text-gray-900 flex items-center">
          <Clock className="h-8 w-8 text-blue-600 mr-3" />
          Day-wise Itinerary
        </h2>
        
        {itinerary.itinerary?.map((day: any, index: number) => (
          <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden border-l-4 border-blue-500">
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6">
              <h3 className="text-2xl font-bold">Day {day.day}</h3>
              <p className="text-blue-100 text-lg">{day.theme}</p>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Activities */}
              {day.activities && day.activities.length > 0 && (
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                    <MapPin className="h-5 w-5 text-red-500 mr-2" />
                    Activities
                  </h4>
                  <div className="space-y-3">
                    {day.activities.map((activity: any, actIndex: number) => (
                      <div key={actIndex} className="border-l-2 border-blue-200 pl-4 py-2">
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm font-medium">
                            {activity.time}
                          </span>
                          <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">
                            {activity.duration}
                          </span>
                          <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-sm">
                            {activity.cost}
                          </span>
                        </div>
                        <h5 className="font-semibold text-gray-900">{activity.activity}</h5>
                        <p className="text-gray-600 text-sm">{activity.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Meals */}
              {day.meals && day.meals.length > 0 && (
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                    <Utensils className="h-5 w-5 text-orange-500 mr-2" />
                    Food Recommendations
                  </h4>
                  <div className="grid md:grid-cols-2 gap-3">
                    {day.meals.map((meal: any, mealIndex: number) => (
                      <div key={mealIndex} className="bg-orange-50 p-3 rounded-lg">
                        <div className="flex justify-between items-start mb-1">
                          <span className="font-medium text-orange-800">{meal.type}</span>
                          <span className="text-sm text-orange-600">{meal.cost}</span>
                        </div>
                        <p className="text-gray-700 text-sm">{meal.suggestion}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Accommodation */}
              {day.accommodation && (
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                    <Hotel className="h-5 w-5 text-purple-500 mr-2" />
                    Where to Stay
                  </h4>
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <p className="text-gray-700">{day.accommodation}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Additional Information Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Packing List */}
        {itinerary.packingList && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
              <span className="text-2xl mr-2">🎒</span>
              Packing List
            </h3>
            <ul className="space-y-2">
              {itinerary.packingList.map((item: string, index: number) => (
                <li key={index} className="text-gray-700 text-sm flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Travel Tips */}
        {itinerary.travelTips && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
              <span className="text-2xl mr-2">💡</span>
              Travel Tips
            </h3>
            <ul className="space-y-2">
              {itinerary.travelTips.map((tip: string, index: number) => (
                <li key={index} className="text-gray-700 text-sm flex items-start">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2 mt-2"></span>
                  {tip}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Weather Info */}
        {itinerary.weatherInfo && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
              <Cloud className="h-6 w-6 text-blue-500 mr-2" />
              Weather
            </h3>
            <p className="text-gray-700 text-sm">{itinerary.weatherInfo}</p>
          </div>
        )}

        {/* Local Insights */}
        {itinerary.localInsights && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
              <Users className="h-6 w-6 text-purple-500 mr-2" />
              Local Insights
            </h3>
            <ul className="space-y-2">
              {itinerary.localInsights.map((insight: string, index: number) => (
                <li key={index} className="text-gray-700 text-sm flex items-start">
                  <span className="w-2 h-2 bg-purple-500 rounded-full mr-2 mt-2"></span>
                  {insight}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="text-center space-y-4 pt-8">
        <button 
          onClick={() => window.print()} 
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg mr-4 transition-colors"
        >
          Print Itinerary
        </button>
        <button 
          onClick={() => {
            const text = JSON.stringify(itinerary, null, 2);
            navigator.clipboard.writeText(text);
          }}
          className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
        >
          Copy to Clipboard
        </button>
      </div>
    </div>
  );
};
