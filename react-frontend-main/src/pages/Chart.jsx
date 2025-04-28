// Import necessary hooks and components
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ScaleLoader } from 'react-spinners';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import opcvmService from '../api/opcvm/opcvmService'; // Corrected import path

// Register the necessary chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Chart = () => {
  // Get the code parameter from the URL
  const { code } = useParams();
  // State to hold the performance data, loading state, and error
  const [performanceData, setPerformanceData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Effect to fetch performance data when the component mounts
  useEffect(() => {
    const fetchPerformance = async () => {
      try {
        // Fetch performance data for the given code
        const data = await opcvmService.getPerformance(code);
        setPerformanceData(data); // Set the fetched data
      } catch (err) {
        setError(err.message); // Set the error state if fetching fails
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };
    fetchPerformance();
  }, [code]);

  // Render a loading message if data is still loading
  if (loading) return (
    <div className="text-center mt-20">
      <ScaleLoader className='text-orange-500' />
      {/*<p>loading data...</p>*/}
    </div>
  );
  // Render an error message if there was an error fetching data
  if (error) return <div className="text-center mt-20 text-red-500">Error: {error}</div>;

  // Prepare chart data
  const years = Object.keys(performanceData.rendementsParAnnee).sort(); // Get sorted years from the performance data
  const values = years.map(year => performanceData.rendementsParAnnee[year]); // Map years to their corresponding performance values

  // Median value is a single value, not an array
  const medianValue = performanceData.medianeRendements;

  const chartData = {
    labels: years, // Labels for the chart (years)
    datasets: [
      {
        label: 'Rendement Annuel (%)', // Label for the dataset
        data: values, // Data points for the dataset
        borderColor: '#ea580c', // Border color for the line
        backgroundColor: 'rgba(234, 88, 12, 0.1)', // Background color for the fill
        tension: 0.3, // Tension for the line
        fill: true, // Fill the area under the line
        pointBackgroundColor: '#fff', // Background color for the points
        pointBorderColor: '#ea580c', // Border color for the points
        pointBorderWidth: 2, // Border width for the points
      },
      {
        label: 'Rendement Médian (%)', // Label for the median dataset
        data: years.map(() => medianValue), // Median value for each year
        borderColor: '#007bff', // Border color for the median line
        backgroundColor: 'rgba(0, 123, 255, 0.1)', // Background color for the median fill
        tension: 0, // Tension for the median line
        fill: true, // Fill the area under the median line
        pointBackgroundColor: '#007bff', // Background color for the median points
        pointBorderColor: '#007bff', // Border color for the median points
        pointBorderWidth: 0, // Border width for the median points
      },
    ],
  };

  const options = {
    responsive: true, // Make the chart responsive
    plugins: {
      legend: {
        position: 'top', // Position of the legend
        labels: {
          color: '#333', // Color of the legend labels
          font: {
            family: 'monospace', // Font family for the legend labels
          },
        },
      },
      tooltip: {
        callbacks: {
          label: (context) => `${context.dataset.label}: ${context.raw}%` // Custom tooltip label
        },
        backgroundColor: 'rgba(0, 0, 0, 0.7)', // Background color for the tooltip
        titleFont: {
          family: 'monospace', // Font family for the tooltip title
        },
        bodyFont: {
          family: 'monospace', // Font family for the tooltip body
        },
      },
    },
    scales: {
      y: {
        grid: {
          color: 'rgba(0, 0, 0, 0.05)', // Color of the y-axis grid
        },
        ticks: {
          color: '#666', // Color of the y-axis ticks
          callback: (value) => `${value}%`, // Format the y-axis tick values
        },
      },
      x: {
        grid: {
          color: 'rgba(0, 0, 0, 0.05)', // Color of the x-axis grid
        },
        ticks: {
          color: '#666', // Color of the x-axis ticks
        },
      },
    },
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6 rounded-lg">
      <div className="text-center mb-6">
        <h3 className="text-xl font-mono font-semibold text-gray-800">
          Performance Annuelle
        </h3>
        <p className="text-gray-500 mt-1">Rendement en pourcentage (%)</p>
      </div>
      <div className="h-80">
        <Line data={chartData} options={options} />
      </div>
      <div className="mt-16 p-4 bg-orange-100 bg rounded-lg">
        <p className="text-center text-orange-800 font-medium">
          Rendement Médian: {medianValue}%
        </p>
      </div>
    </div>
  );
};

export default Chart;