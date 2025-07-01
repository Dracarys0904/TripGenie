import React, { useState } from 'react';
import { MapPin, Users, Plane, Utensils, Hotel, Wallet } from 'lucide-react';
import { generateItinerary } from '../services/geminiService';
import { Calendar } from './ui/calendar';
import { Popover, PopoverTrigger, PopoverContent } from './ui/popover';

const BUDGET_MAX = 1000000;
const formatRupees = (value: number) => `₹${value.toLocaleString('en-IN')}`;

const tripVibeOptions = [
  { value: 'romantic', label: 'Romantic 💑' },
  { value: 'solo', label: 'Solo Adventure 🧑‍🦯' },
  { value: 'chill', label: 'Chill & Relaxed 😌' },
  { value: 'family', label: 'Family Fun 👨‍👩‍👧‍👦' },
  { value: 'adventure', label: 'Adventure & Thrill 🧗' },
  { value: 'cultural', label: 'Cultural & Heritage 🏛️' },
];
const travelModeOptions = [
  { value: 'flight', label: 'Flight ✈️' },
  { value: 'train', label: 'Train 🚆' },
  { value: 'car', label: 'Car/Road Trip 🚗' },
  { value: 'bus', label: 'Bus 🚌' },
];
const accommodationOptions = [
  { value: 'hostel', label: 'Hostel 🛏️' },
  { value: 'hotel', label: 'Hotel 🏨' },
  { value: 'luxury', label: 'Luxury Resort 🏝️' },
  { value: 'airbnb', label: 'Airbnb/Homestay 🏠' },
];
const foodPreferenceOptions = [
  { value: 'vegetarian', label: 'Vegetarian 🥦' },
  { value: 'non-vegetarian', label: 'Non-Vegetarian 🍗' },
  { value: 'street-food', label: 'Street Food Lover 🌯' },
  { value: 'fine-dining', label: 'Fine Dining 🍽️' },
  { value: 'local-cuisine', label: 'Local Cuisine Explorer 🍲' },
];

interface TripFormProps {
  onItineraryGenerated: (itinerary: any) => void;
  setIsLoading: (loading: boolean) => void;
}

export const TripForm: React.FC<TripFormProps> = ({ onItineraryGenerated, setIsLoading }) => {
  const [formData, setFormData] = useState({
    budget: '0',
    startDate: '',
    endDate: '',
    destination: '',
    tripVibe: '',
    travelMode: '',
    accommodation: '',
    foodPreference: '',
    experiences: ''
  });
  const [startDateOpen, setStartDateOpen] = useState(false);
  const [endDateOpen, setEndDateOpen] = useState(false);

  // Helper for DD/MM/YYYY
  const formatDate = (date: string) => {
    if (!date) return '';
    const [yyyy, mm, dd] = date.split('-');
    return `${dd}/${mm}/${yyyy}`;
  };
  const parseDate = (date: string) => {
    if (!date) return '';
    const [dd, mm, yyyy] = date.split('/');
    return `${yyyy}-${mm}-${dd}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const itinerary = await generateItinerary(formData);
      onItineraryGenerated(itinerary);
    } catch (error) {
      console.error('Error generating itinerary:', error);
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData({ ...formData, [name]: checked ? value : '' });
    } else if (name === 'budget') {
      setFormData({ ...formData, budget: value });
    } else if (name === 'startDate' || name === 'endDate') {
      setFormData({ ...formData, [name]: parseDate(value) });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          Tell Us About Your Dream Trip
        </h2>
        <p className="text-xl text-gray-600">
          Share your preferences and let AI create the perfect itinerary for you
        </p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl p-8 space-y-8">
        {/* Budget Section */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2 mb-4">
            <Wallet className="h-6 w-6 text-green-600" />
            <h3 className="text-xl font-semibold text-gray-900">Budget & Dates</h3>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Budget Range</label>
              <div className="flex flex-col gap-2">
                <input
                  type="range"
                  name="budget"
                  min={0}
                  max={BUDGET_MAX}
                  step={1000}
                  value={Number(formData.budget)}
                  onChange={handleChange}
                  className="w-full"
                />
                <input
                  type="number"
                  name="budget"
                  min={0}
                  max={BUDGET_MAX}
                  step={1000}
                  value={Number(formData.budget)}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter budget manually"
                />
                <div className="text-center mt-2 font-semibold">{formatRupees(Number(formData.budget))}</div>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
              <div className="flex flex-col gap-2">
                <Popover open={startDateOpen} onOpenChange={setStartDateOpen}>
                  <PopoverTrigger asChild>
                    <input
                      type="text"
                      name="startDate"
                      value={formatDate(formData.startDate)}
                      onChange={handleChange}
                      placeholder="DD/MM/YYYY"
                      pattern="\\d{2}/\\d{2}/\\d{4}"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 cursor-pointer"
                      onFocus={() => setStartDateOpen(true)}
                      readOnly
                    />
                  </PopoverTrigger>
                  <PopoverContent align="start">
                    <Calendar
                      mode="single"
                      selected={formData.startDate ? new Date(formData.startDate) : undefined}
                      onSelect={(date: Date | undefined) => {
                        if (date) {
                          const yyyy = date.getFullYear();
                          const mm = String(date.getMonth() + 1).padStart(2, '0');
                          const dd = String(date.getDate()).padStart(2, '0');
                          setFormData({ ...formData, startDate: `${yyyy}-${mm}-${dd}` });
                          setStartDateOpen(false);
                        }
                      }}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
              <div className="flex flex-col gap-2">
                <Popover open={endDateOpen} onOpenChange={setEndDateOpen}>
                  <PopoverTrigger asChild>
                    <input
                      type="text"
                      name="endDate"
                      value={formatDate(formData.endDate)}
                      onChange={handleChange}
                      placeholder="DD/MM/YYYY"
                      pattern="\\d{2}/\\d{2}/\\d{4}"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 cursor-pointer"
                      onFocus={() => setEndDateOpen(true)}
                      readOnly
                    />
                  </PopoverTrigger>
                  <PopoverContent align="start">
                    <Calendar
                      mode="single"
                      selected={formData.endDate ? new Date(formData.endDate) : undefined}
                      onSelect={(date: Date | undefined) => {
                        if (date) {
                          const yyyy = date.getFullYear();
                          const mm = String(date.getMonth() + 1).padStart(2, '0');
                          const dd = String(date.getDate()).padStart(2, '0');
                          setFormData({ ...formData, endDate: `${yyyy}-${mm}-${dd}` });
                          setEndDateOpen(false);
                        }
                      }}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </div>
        </div>

        {/* Destination Section */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2 mb-4">
            <MapPin className="h-6 w-6 text-red-500" />
            <h3 className="text-xl font-semibold text-gray-900">Destination & Vibe</h3>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Destination (Optional)</label>
              <input
                type="text"
                name="destination"
                value={formData.destination}
                onChange={handleChange}
                placeholder="e.g., Goa, Kerala, Manali, etc."
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Trip Vibe</label>
              <div className="flex flex-col gap-2">
                {tripVibeOptions.map(opt => (
                  <label key={opt.value} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      name="tripVibe"
                      value={opt.value}
                      checked={formData.tripVibe === opt.value}
                      onChange={handleChange}
                      className="accent-blue-500"
                      required
                    />
                    <span>{opt.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Travel & Stay Section */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2 mb-4">
            <Plane className="h-6 w-6 text-blue-600" />
            <h3 className="text-xl font-semibold text-gray-900">Travel & Stay</h3>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Travel Mode</label>
              <div className="flex flex-col gap-2">
                {travelModeOptions.map(opt => (
                  <label key={opt.value} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      name="travelMode"
                      value={opt.value}
                      checked={formData.travelMode === opt.value}
                      onChange={handleChange}
                      className="accent-blue-500"
                      required
                    />
                    <span>{opt.label}</span>
                  </label>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Accommodation</label>
              <div className="flex flex-col gap-2">
                {accommodationOptions.map(opt => (
                  <label key={opt.value} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      name="accommodation"
                      value={opt.value}
                      checked={formData.accommodation === opt.value}
                      onChange={handleChange}
                      className="accent-blue-500"
                      required
                    />
                    <span>{opt.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Food & Experiences Section */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2 mb-4">
            <Utensils className="h-6 w-6 text-orange-500" />
            <h3 className="text-xl font-semibold text-gray-900">Food & Experiences</h3>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Food Preference</label>
              <div className="flex flex-col gap-2">
                {foodPreferenceOptions.map(opt => (
                  <label key={opt.value} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      name="foodPreference"
                      value={opt.value}
                      checked={formData.foodPreference === opt.value}
                      onChange={handleChange}
                      className="accent-blue-500"
                      required
                    />
                    <span>{opt.label}</span>
                  </label>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Must-Have Experiences (Optional)</label>
              <textarea
                name="experiences"
                value={formData.experiences}
                onChange={handleChange}
                placeholder="e.g., Beach sunset, Mountain trekking, Local markets..."
                rows={3}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        </div>

        <button 
          type="submit" 
          className="w-full bg-gradient-to-r from-blue-600 to-orange-500 hover:from-blue-700 hover:to-orange-600 text-white font-semibold py-4 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg text-lg"
        >
          Generate My Perfect Itinerary ✨
        </button>
      </form>
    </div>
  );
};
