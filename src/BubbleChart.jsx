import React from 'react';
import {
  Chart as ChartJS,
  Tooltip,
  Legend,
  LinearScale,
  PointElement
} from 'chart.js';
import { Bubble } from 'react-chartjs-2';
import colors from './constants/colors'; // Make sure this path matches your project structure

// Register necessary components from ChartJS
ChartJS.register(Tooltip, Legend, LinearScale, PointElement);

const sampleData = {
    "bubble_0": { x: 20, y: 30, r: Math.sqrt(18) * 5 },
    "bubble_1": { x: 40, y: 10, r: Math.sqrt(14) * 5 },
    "bubble_2": { x: 30, y: 40, r: Math.sqrt(12) * 5 },
    "bubble_3": { x: 50, y: 20, r: Math.sqrt(3) * 5 },
    "bubble_4": { x: 25, y: 25, r: Math.sqrt(5) * 5 },
    "bubble_5": { x: 45, y: 35, r: Math.sqrt(10) * 5 },
    "bubble_6": { x: 15, y: 10, r: Math.sqrt(22) * 5 },
    "bubble_7": { x: 35, y: 20, r: Math.sqrt(16) * 5 },
    "bubble_8": { x: 10, y: 45, r: Math.sqrt(9) * 5 },
    "bubble_9": { x: 55, y: 25, r: Math.sqrt(20) * 5 },
    "bubble_10": { x: 5, y: 15, r: Math.sqrt(5) * 5 },
    "bubble_11": { x: 60, y: 40, r: Math.sqrt(15) * 5 },
    "bubble_12": { x: 50, y: 10, r: Math.sqrt(25) * 5 },
    "bubble_13": { x: 20, y: 20, r: Math.sqrt(17) * 5 }
};

const bubbles = Object.values(sampleData);

const BubbleChart = () => {
  const chartData = {
    datasets: [{
      label: 'Topics',
      data: bubbles,
      backgroundColor: bubbles.map(() => colors[Math.floor(Math.random() * colors.length)][Math.floor(Math.random() * 5)])
    }]
  };

  const options = {
    scales: {
      x: {
        beginAtZero: true,
        title: {
          display: false,
          text: 'X Axis'
        }
      },
      y: {
        beginAtZero: true,
        title: {
          display: false,
          text: 'Y Axis'
        }
      }
    },
    plugins: {
      legend: {
        display: true,
        position: 'top',
        align: 'end'
      }
    },
    responsive: true,
    maintainAspectRatio: false
  };

  return (
    <div style={{ height: '100%', overflow: 'hidden' }}>
      <Bubble data={chartData} options={options} />
    </div>
  );
};

export default BubbleChart;