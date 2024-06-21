import { Chart as ChartJS, registerables } from "chart.js";
import { Chart as ReactChart } from "react-chartjs-2";
import { WordElement, WordCloudController } from "chartjs-chart-wordcloud";
import colors from "./constants/colors";

ChartJS.register(...registerables);
ChartJS.register(WordElement, WordCloudController);

// const sampleData = {
//   "time": 12,
//   "took": 85,
//   "woman": 21,
//   "rice": 24,
//   "nice": 5,
//   "good": 7,
//   "promised": 3,
//   "neverland": 23,
//   "your": 10,
//   "lie": 2,
//   "in": 10,
//   "april": 4,
//   "once": 7,
//   "upon": 69,
//   "time": 34,
//   "there": 32,
//   "were": 12,
//   "sleep": 4,
//   "fake": 40,
//   "fax": 41,
//   "vaccine": 22,
//   "rooster": 10,
//   "roast": 5,
// }

const dummyData = {
  "user": 55,
  "system": 54,
  "data": 45,
  "target": 44,
  "effective": 43,
  "uis": 41,
  "touch": 38,
  "technique": 38,
  "perceived": 37,
  "effect": 35,
  "direction": 35,
  "task": 34,
  "interaction": 34,
  "performance": 32,
  "study": 32,
  "time": 30,
  "perception": 29,
  "significant": 24,
  "likability": 24,
  "mhealth": 23,
  "usability": 23,
  "app": 23,
  "using": 22,
  "mobile": 21,
  "input": 19,
  "mean": 18,
  "participant": 18,
  "design": 17,
  "theory": 17,
  "completion": 17,
  "result": 17,
  "figure": 17,
  "type": 17,
  "transparent": 17,
  "based": 16,
};

const WordCloud = ({ sampleData }) => {
  // if (!sampleData)
  //   sampleData = dummyData;
  if (!sampleData)
    return

  const sampleKeys = Object.keys(sampleData);
  const sampleValues = Object.values(sampleData);

  const mini = Math.min(...sampleValues);
  const maxi = Math.max(...sampleValues);
  const normalized = sampleValues.map((value) => (value - mini) / (maxi - mini) * 80 + 10);

  const data = {
    labels: sampleKeys,
    data: sampleValues,
    colors: sampleValues.map((_) => colors[Math.floor(Math.random() * 100)][Math.floor(Math.random() * 5)]),
    sizes: normalized,
  };

  const chartData = {
    labels: data.labels,
    datasets: [{
      label: 'Word Cloud',
      data: data.data,
      color: data.colors,
      size: data.sizes
    }]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      }
    }
  };

  return (
    <div className="w-full h-full">
      <ReactChart type="wordCloud" data={chartData} options={options} />
    </div>
  );
}

export default WordCloud;