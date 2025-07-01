
import React, { useState } from 'react';
import { TripForm } from '../components/TripForm';
import { ItineraryDisplay } from '../components/ItineraryDisplay';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { Header } from '../components/Header';
import { Hero } from '../components/Hero';

const Index = () => {
  const [itinerary, setItinerary] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const handleItineraryGenerated = (generatedItinerary: any) => {
    setItinerary(generatedItinerary);
    setIsLoading(false);
  };

  const handleStartPlanning = () => {
    setShowForm(true);
  };

  const handleBackToHome = () => {
    setShowForm(false);
    setItinerary(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50">
      <Header onBackToHome={handleBackToHome} showBackButton={showForm || itinerary} />
      
      {!showForm && !itinerary && (
        <Hero onStartPlanning={handleStartPlanning} />
      )}

      {showForm && !itinerary && !isLoading && (
        <div className="container mx-auto px-4 py-8">
          <TripForm 
            onItineraryGenerated={handleItineraryGenerated}
            setIsLoading={setIsLoading}
          />
        </div>
      )}

      {isLoading && (
        <div className="container mx-auto px-4 py-16">
          <LoadingSpinner />
        </div>
      )}

      {itinerary && !isLoading && (
        <div className="container mx-auto px-4 py-8">
          <ItineraryDisplay itinerary={itinerary} />
        </div>
      )}
    </div>
  );
};

export default Index;
