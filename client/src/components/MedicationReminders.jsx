import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useMedication } from '../context/MedicationContext';
import { Card, CardHeader, CardContent, CardFooter } from './ui';
import { Pill, Clock } from 'lucide-react';

const MedicationReminders = () => {
  const { medications, getMedications, loading } = useMedication();
  const [upcomingMedications, setUpcomingMedications] = useState([]);
  
  useEffect(() => {
    getMedications();
  }, [getMedications]);
  
  useEffect(() => {
    if (medications && medications.length) {
      const currentMeds = medications.filter(med => {
        // Filter out inactive medications
        if (!med.active) return false;
        
        // Check if medication is still active (end date not passed)
        if (med.endDate) {
          const endDate = new Date(med.endDate);
          if (endDate < new Date()) return false;
        }
        
        return true;
      });
      
      // Get the current time of day
      const now = new Date();
      const currentHour = now.getHours();
      
      let timeOfDay;
      if (currentHour >= 5 && currentHour < 12) {
        timeOfDay = 'morning';
      } else if (currentHour >= 12 && currentHour < 17) {
        timeOfDay = 'afternoon';
      } else if (currentHour >= 17 && currentHour < 21) {
        timeOfDay = 'evening';
      } else {
        timeOfDay = 'night';
      }
      
      // Find upcoming medications based on time of day
      const upcoming = [];
      
      // Current time of day medications
      const currentTimeMeds = currentMeds.filter(med => 
        med.timeOfDay.includes(timeOfDay)
      );
      
      // Next time of day medications
      const nextTimeOfDayMap = {
        'morning': 'afternoon',
        'afternoon': 'evening',
        'evening': 'night',
        'night': 'morning'
      };
      
      const nextTimeMeds = currentMeds.filter(med => 
        med.timeOfDay.includes(nextTimeOfDayMap[timeOfDay])
      );
      
      // Add current time meds with higher priority
      currentTimeMeds.forEach(med => {
        upcoming.push({
          ...med,
          upcoming: true,
          timeFrame: `Now (${timeOfDay})`
        });
      });
      
      // Add next time meds
      nextTimeMeds.forEach(med => {
        // Skip if already added
        if (!upcoming.find(m => m._id === med._id)) {
          upcoming.push({
            ...med,
            upcoming: false,
            timeFrame: `Next (${nextTimeOfDayMap[timeOfDay]})`
          });
        }
      });
      
      // Sort by priority (current time first, then by name)
      upcoming.sort((a, b) => {
        if (a.upcoming === b.upcoming) {
          return a.name.localeCompare(b.name);
        }
        return a.upcoming ? -1 : 1;
      });
      
      setUpcomingMedications(upcoming.slice(0, 3)); // Show only top 3
    }
  }, [medications]);
  
  if (loading && !medications.length) {
    return (
      <Card>
        <CardHeader title="Medication Reminders" />
        <CardContent>
          <div className="flex justify-center py-6">
            <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-teal-500"></div>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card>
      <CardHeader 
        title="Medication Reminders" 
        subtitle="Don't forget to take your medications"
      />
      
      <CardContent>
        {upcomingMedications.length > 0 ? (
          <div className="space-y-4">
            {upcomingMedications.map(medication => (
              <div 
                key={medication._id} 
                className={`flex items-center p-3 rounded-lg ${
                  medication.upcoming ? 'bg-blue-50 border border-blue-100' : ''
                }`}
              >
                <div className={`p-2 rounded-full ${
                  medication.upcoming ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'
                } mr-3`}>
                  <Pill size={16} />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">
                    {medication.name}
                  </p>
                  <p className="text-sm text-gray-600">
                    {medication.dosage} • {medication.timeFrame}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-6">
            <Clock className="h-8 w-8 text-gray-400 mx-auto mb-2" />
            <p className="text-gray-500">No upcoming medications</p>
          </div>
        )}
      </CardContent>
      
      {upcomingMedications.length > 0 && (
        <CardFooter>
          <Link
            to="/medications"
            className="text-teal-600 hover:text-teal-800 text-sm font-medium"
          >
            View all medications →
          </Link>
        </CardFooter>
      )}
    </Card>
  );
};

export default MedicationReminders;
