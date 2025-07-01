
const GEMINI_API_KEY = 'AIzaSyBh_f7UjQ7dUlJ9guOUGWerpU3VdlKlbXA';
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';

interface TripFormData {
  budget: string;
  startDate: string;
  endDate: string;
  destination: string;
  tripVibe: string;
  travelMode: string;
  accommodation: string;
  foodPreference: string;
  experiences: string;
}

export const generateItinerary = async (formData: TripFormData) => {
  const duration = calculateDuration(formData.startDate, formData.endDate);
  
  const prompt = `
You are an expert travel planner with deep knowledge of Indian destinations. Create a detailed, accurate travel itinerary for ${formData.destination} based on these specific preferences:

**Trip Details:**
- Budget: ${formData.budget}
- Duration: ${duration} days (${formData.startDate} to ${formData.endDate})
- Destination: ${formData.destination}
- Trip Vibe: ${formData.tripVibe}
- Travel Mode: ${formData.travelMode}
- Accommodation: ${formData.accommodation}
- Food Preference: ${formData.foodPreference}
- Must-have experiences: ${formData.experiences || 'None specified'}

**IMPORTANT INSTRUCTIONS:**
1. Provide REAL, ACCURATE information about ${formData.destination}
2. Include SPECIFIC restaurant names, hotel names, and attraction names
3. Use REALISTIC costs in Indian Rupees (₹)
4. Mention ACTUAL places, not generic descriptions
5. Consider the EXACT dates and season for weather and availability
6. Include SPECIFIC timings and durations
7. Provide detailed food recommendations with restaurant names
8. Suggest actual hotels/stays with brief reviews

**Please provide your response in this EXACT JSON format:**
{
  "destination": {
    "name": "${formData.destination}",
    "why": "Specific reasons why ${formData.destination} is perfect for ${formData.tripVibe} ${formData.travelMode} travel",
    "bestTimeToVisit": "Best months/season for ${formData.destination} with weather details"
  },
  "overview": {
    "totalCost": "Detailed cost breakdown: Transport ₹X, Stay ₹Y, Food ₹Z, Activities ₹W = Total ₹${formData.budget.split('-')[1] || formData.budget}",
    "highlights": ["Specific attraction 1 in ${formData.destination}", "Famous food item/restaurant in ${formData.destination}", "Unique experience in ${formData.destination}", "Popular viewpoint/landmark in ${formData.destination}"]
  },
  "itinerary": [
    {
      "day": 1,
      "theme": "Arrival & Local Exploration",
      "activities": [
        {
          "time": "10:00 AM",
          "activity": "Visit [SPECIFIC landmark/attraction name in ${formData.destination}]",
          "description": "Detailed description of what to expect, entry fees, best photo spots",
          "duration": "2-3 hours",
          "cost": "₹[realistic amount]"
        },
        {
          "time": "2:00 PM", 
          "activity": "Explore [SPECIFIC market/area name in ${formData.destination}]",
          "description": "What to buy, what to see, local culture",
          "duration": "2 hours",
          "cost": "₹[realistic amount]"
        }
      ],
      "meals": [
        {
          "type": "Lunch",
          "suggestion": "[ACTUAL restaurant name in ${formData.destination}] - Try their famous [specific dish name]",
          "cost": "₹[realistic amount based on ${formData.foodPreference}]"
        },
        {
          "type": "Dinner", 
          "suggestion": "[ACTUAL restaurant/dhaba name] - Known for [specific local cuisine]",
          "cost": "₹[realistic amount]"
        }
      ],
      "accommodation": "[ACTUAL hotel/hostel name in ${formData.destination}] - [Brief review mentioning 2-3 specific amenities and location benefits]"
    }
  ],
  "packingList": ["Weather-appropriate clothing for ${formData.destination} in ${formData.startDate.split('-')[1]} month", "Specific items needed for ${formData.experiences}", "Local climate essentials", "Documents and essentials"],
  "travelTips": ["Specific tip about ${formData.destination} transport", "Local custom/etiquette in ${formData.destination}", "Best time to visit attractions", "Money/payment tips for ${formData.destination}"],
  "weatherInfo": "Exact weather conditions in ${formData.destination} during ${formData.startDate} to ${formData.endDate} with temperature ranges and rainfall/sunshine expectations",
  "localInsights": ["Local language phrases useful in ${formData.destination}", "Cultural practices to respect", "Local festivals/events during travel dates", "Hidden gems known to locals"]
}

Create a ${duration}-day itinerary with this level of detail for each day. Focus on REAL places, ACTUAL costs, and SPECIFIC recommendations for ${formData.destination}.
`;

  try {
    console.log('Calling Gemini API with prompt for:', formData.destination);
    
    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: prompt
          }]
        }],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 8192,
        }
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Gemini API Error:', errorData);
      throw new Error(`API request failed: ${response.status} - ${errorData.error?.message || 'Unknown error'}`);
    }

    const data = await response.json();
    console.log('Gemini API Response:', data);
    
    if (!data.candidates || !data.candidates[0] || !data.candidates[0].content) {
      throw new Error('Invalid response structure from Gemini API');
    }
    
    const generatedText = data.candidates[0].content.parts[0].text;
    console.log('Generated text:', generatedText);
    
    // Extract JSON from the response - look for the first complete JSON object
    const jsonMatch = generatedText.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      try {
        const parsedData = JSON.parse(jsonMatch[0]);
        console.log('Parsed itinerary data:', parsedData);
        return parsedData;
      } catch (parseError) {
        console.error('JSON parsing error:', parseError);
        return parseTextResponse(generatedText, formData);
      }
    } else {
      console.log('No JSON found, using text parser');
      return parseTextResponse(generatedText, formData);
    }
  } catch (error) {
    console.error('Error calling Gemini API:', error);
    return generateFallbackItinerary(formData);
  }
};

const calculateDuration = (startDate: string, endDate: string): number => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const diffTime = Math.abs(end.getTime() - start.getTime());
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
};

const parseTextResponse = (text: string, formData: TripFormData) => {
  // Fallback parsing logic for non-JSON responses
  return {
    destination: {
      name: formData.destination || "Recommended Destination",
      why: "Perfect match for your preferences",
      bestTimeToVisit: "Year-round"
    },
    overview: {
      totalCost: formData.budget,
      highlights: ["Memorable experiences", "Local culture", "Scenic beauty"]
    },
    itinerary: generateBasicItinerary(calculateDuration(formData.startDate, formData.endDate)),
    packingList: ["Comfortable clothes", "Camera", "Sunscreen", "First aid kit"],
    travelTips: ["Book accommodations in advance", "Try local cuisine", "Respect local customs"],
    weatherInfo: "Check weather forecast before travel",
    localInsights: ["Learn basic local phrases", "Carry cash for local markets"]
  };
};

const generateBasicItinerary = (duration: number) => {
  const days = [];
  for (let i = 1; i <= duration; i++) {
    days.push({
      day: i,
      theme: i === 1 ? "Arrival & Exploration" : i === duration ? "Departure" : "Exploration",
      activities: [
        {
          time: "10:00 AM",
          activity: "Sightseeing",
          description: "Explore local attractions",
          duration: "3 hours",
          cost: "₹500"
        }
      ],
      meals: [
        {
          type: "Lunch",
          suggestion: "Local restaurant",
          cost: "₹400"
        }
      ],
      accommodation: "Recommended stay option"
    });
  }
  return days;
};

const generateFallbackItinerary = (formData: TripFormData) => {
  const duration = calculateDuration(formData.startDate, formData.endDate);
  
  return {
    destination: {
      name: formData.destination || "Goa",
      why: "Great destination for your trip preferences",
      bestTimeToVisit: "October to March"
    },
    overview: {
      totalCost: formData.budget,
      highlights: ["Beach experiences", "Local cuisine", "Cultural exploration", "Relaxation"]
    },
    itinerary: generateBasicItinerary(duration),
    packingList: ["Light cotton clothes", "Sunscreen", "Hat", "Comfortable shoes", "Camera"],
    travelTips: ["Book early for better prices", "Try local street food", "Carry a reusable water bottle"],
    weatherInfo: "Pleasant weather expected, pack light layers",
    localInsights: ["English is widely spoken", "Bargaining is common in local markets"]
  };
};
