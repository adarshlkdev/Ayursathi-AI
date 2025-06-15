// HealthMetricsChart.jsx - Component for visualizing health data
import React, { useState } from 'react';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import { Card, CardHeader, CardContent } from './ui';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const HealthMetricsChart = ({ diagnosisHistory }) => {
  const [chartType, setChartType] = useState('severity'); // severity, symptoms, timeline
  // Create datasets based on history
  const prepareTimelineData = () => {
    // Get last 6 months of diagnoses
    const last6Months = [...(diagnosisHistory || [])]
      .filter(entry => entry && entry.createdAt)
      .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
      .slice(-6);

    const labels = last6Months.map(entry => {
      const date = new Date(entry.createdAt);
      return `${date.toLocaleString('default', { month: 'short' })} ${date.getDate()}`;
    });

    const severityScores = last6Months.map(entry => {
      if (!entry || !entry.results || !entry.results.possibleConditions) {
        return 0;
      }
      
      const conditions = entry.results.possibleConditions;
      if (!conditions || conditions.length === 0) return 0;
      
      // Calculate severity score based on condition severity
      const primaryCondition = conditions[0];
      if (!primaryCondition || !primaryCondition.severity) return 0;
      
      const severityMap = {
        'low': 1,
        'moderate': 2,
        'high': 3,
        'severe': 4,
        'emergency': 5
      };
      
      return severityMap[primaryCondition.severity] || 0;
    });

    return {
      labels,
      datasets: [
        {
          label: 'Health Severity Index',
          data: severityScores,
          borderColor: 'rgb(45, 212, 191)',
          backgroundColor: 'rgba(45, 212, 191, 0.2)',
          tension: 0.3,
          fill: true,
        },
      ],    };
  };

  const prepareSeverityData = () => {
    // Count different severity levels
    const severityCounts = (diagnosisHistory || []).reduce((acc, diagnosis) => {
      if (diagnosis && diagnosis.results && diagnosis.results.possibleConditions) {
        diagnosis.results.possibleConditions.forEach(condition => {
          if (condition && condition.severity) {
            acc[condition.severity] = (acc[condition.severity] || 0) + 1;
          }
        });
      }
      return acc;
    }, {});

    // Prepare data for doughnut chart
    return {
      labels: ['Low', 'Moderate', 'High', 'Severe', 'Emergency'],
      datasets: [
        {
          data: [
            severityCounts.low || 0,
            severityCounts.moderate || 0,
            severityCounts.high || 0,
            severityCounts.severe || 0,
            severityCounts.emergency || 0,
          ],
          backgroundColor: [
            'rgba(34, 197, 94, 0.7)',  // green for low
            'rgba(234, 179, 8, 0.7)',   // yellow for moderate
            'rgba(249, 115, 22, 0.7)',  // orange for high
            'rgba(239, 68, 68, 0.7)',   // red for severe
            'rgba(185, 28, 28, 0.7)',   // dark red for emergency
          ],
          borderColor: [
            'rgba(34, 197, 94, 1)',
            'rgba(234, 179, 8, 1)',
            'rgba(249, 115, 22, 1)',
            'rgba(239, 68, 68, 1)',
            'rgba(185, 28, 28, 1)',
          ],
          borderWidth: 1,
        },
      ],    };
  };

  const prepareSymptomsData = () => {
    // Count frequency of symptoms
    const symptomCounts = {};
    (diagnosisHistory || []).forEach(diagnosis => {
      if (diagnosis && diagnosis.symptoms && Array.isArray(diagnosis.symptoms)) {
        diagnosis.symptoms.forEach(symptom => {
          if (symptom) {
            symptomCounts[symptom] = (symptomCounts[symptom] || 0) + 1;
          }
        });
      }
    });

    // Get top 5 most frequent symptoms
    const topSymptoms = Object.entries(symptomCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);

    return {
      labels: topSymptoms.map(s => s[0]),
      datasets: [
        {
          label: 'Symptom Frequency',
          data: topSymptoms.map(s => s[1]),
          backgroundColor: 'rgba(45, 212, 191, 0.7)',
          borderColor: 'rgba(45, 212, 191, 1)',
          borderWidth: 1,
        },
      ],
    };
  };

  const getChartOptions = (type) => {
    const baseOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'top',
        },
      },
    };

    if (type === 'timeline') {
      return {
        ...baseOptions,
        scales: {
          y: {
            beginAtZero: true,
            max: 5,
            ticks: {
              stepSize: 1,
              callback: function(value) {
                return ['', 'Low', 'Moderate', 'High', 'Severe', 'Emergency'][value] || '';
              }
            },
            title: {
              display: true,
              text: 'Severity Level'
            }
          }
        }
      };
    }

    if (type === 'symptoms') {
      return {
        ...baseOptions,
        indexAxis: 'y',
        scales: {
          x: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Frequency'
            }
          }
        }
      };
    }

    return baseOptions;
  };

  const renderChart = () => {
    switch (chartType) {
      case 'severity':
        return (
          <div className="h-64">
            <Doughnut data={prepareSeverityData()} options={getChartOptions('severity')} />
          </div>
        );
      case 'symptoms':
        return (
          <div className="h-80">
            <Bar data={prepareSymptomsData()} options={getChartOptions('symptoms')} />
          </div>
        );
      case 'timeline':
        return (
          <div className="h-64">
            <Line data={prepareTimelineData()} options={getChartOptions('timeline')} />
          </div>
        );
      default:
        return null;
    }
  };

  if (!diagnosisHistory || diagnosisHistory.length === 0) {
    return (
      <Card>
        <CardHeader title="Health Analytics" />
        <CardContent className="text-center py-8 text-gray-500">
          No diagnosis data available for visualization.
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader title="Health Analytics" subtitle="Visualize your health data over time" />
      <CardContent>
        <div className="flex justify-center mb-6">
          <div className="inline-flex rounded-md shadow-sm" role="group">
            <button
              type="button"
              className={`px-4 py-2 text-sm font-medium rounded-l-lg ${
                chartType === 'severity'
                  ? 'bg-teal-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
              onClick={() => setChartType('severity')}
            >
              Severity Distribution
            </button>
            <button
              type="button"
              className={`px-4 py-2 text-sm font-medium ${
                chartType === 'symptoms'
                  ? 'bg-teal-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
              onClick={() => setChartType('symptoms')}
            >
              Top Symptoms
            </button>
            <button
              type="button"
              className={`px-4 py-2 text-sm font-medium rounded-r-lg ${
                chartType === 'timeline'
                  ? 'bg-teal-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
              onClick={() => setChartType('timeline')}
            >
              Severity Timeline
            </button>
          </div>
        </div>

        {renderChart()}
      </CardContent>
    </Card>
  );
};

export default HealthMetricsChart;
