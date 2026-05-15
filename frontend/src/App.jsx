import { useEffect, useState } from "react";
import axios from "axios";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import {
  Bar,
  Pie,
  Line,
} from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

function App() {
  const [data, setData] = useState([]);

  const [selectedCountry, setSelectedCountry] =
    useState("");

  const [selectedTopic, setSelectedTopic] =
    useState("");

  const [selectedRegion, setSelectedRegion] =
    useState("");

  const [selectedSector, setSelectedSector] =
    useState("");

  const [selectedSource, setSelectedSource] =
    useState("");

  const [selectedPestle, setSelectedPestle] =
    useState("");

  const [selectedYear, setSelectedYear] =
    useState("");

  const [selectedCity, setSelectedCity] =
    useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/data")
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  // FILTERED DATA

  const filteredData = data.filter((item) => {
    return (
      (!selectedCountry ||
        item.country === selectedCountry) &&
      (!selectedTopic ||
        item.topic === selectedTopic) &&
      (!selectedRegion ||
        item.region === selectedRegion) &&
      (!selectedSector ||
        item.sector === selectedSector) &&
      (!selectedSource ||
        item.source === selectedSource) &&
      (!selectedPestle ||
        item.pestle === selectedPestle) &&
      (!selectedYear ||
        item.start_year?.toString() ===
          selectedYear) &&
      (!selectedCity ||
        item.city === selectedCity)
    );
  });

  // COUNTRY CHART

  const countryMap = {};

  filteredData.forEach((item) => {
    if (item.country && item.intensity) {
      countryMap[item.country] =
        (countryMap[item.country] || 0) +
        item.intensity;
    }
  });

  const countryLabels = Object.keys(countryMap).slice(
    0,
    10
  );

  const barData = {
    labels: countryLabels,
    datasets: [
      {
        label: "Intensity",
        data: countryLabels.map(
          (country) => countryMap[country]
        ),
        backgroundColor: [
          "#3B82F6",
          "#EF4444",
          "#10B981",
          "#F59E0B",
          "#8B5CF6",
          "#EC4899",
          "#14B8A6",
          "#F97316",
          "#6366F1",
          "#84CC16",
        ],
        borderRadius: 8,
      },
    ],
  };

  // TOPICS PIE CHART

  const topicMap = {};

  filteredData.forEach((item) => {
    if (item.topic) {
      topicMap[item.topic] =
        (topicMap[item.topic] || 0) + 1;
    }
  });

  const topicLabels = Object.keys(topicMap).slice(
    0,
    5
  );

  const pieData = {
    labels: topicLabels,
    datasets: [
      {
        label: "Topics",
        data: topicLabels.map(
          (topic) => topicMap[topic]
        ),
        backgroundColor: [
          "#3B82F6",
          "#EF4444",
          "#10B981",
          "#F59E0B",
          "#8B5CF6",
        ],
      },
    ],
  };

  // YEARLY LINE CHART

  const yearMap = {};

  filteredData.forEach((item) => {
    if (item.start_year && item.intensity) {
      yearMap[item.start_year] =
        (yearMap[item.start_year] || 0) +
        item.intensity;
    }
  });

  const yearLabels = Object.keys(yearMap).sort();

  const lineData = {
    labels: yearLabels,
    datasets: [
      {
        label: "Yearly Intensity",
        data: yearLabels.map(
          (year) => yearMap[year]
        ),
        borderColor: "#3B82F6",
        backgroundColor: "#93C5FD",
        tension: 0.4,
        fill: true,
      },
    ],
  };

  // RELEVANCE + LIKELIHOOD

  const totalRelevance = filteredData.reduce(
    (sum, item) => sum + (item.relevance || 0),
    0
  );

  const totalLikelihood = filteredData.reduce(
    (sum, item) => sum + (item.likelihood || 0),
    0
  );

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold text-center mb-8">
        Blackcoffer Visualization Dashboard
      </h1>

      {/* FILTERS */}

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4 mb-10">

        <select
          className="p-3 rounded-lg border bg-white"
          value={selectedCountry}
          onChange={(e) =>
            setSelectedCountry(e.target.value)
          }
        >
          <option value="">Country</option>

          {[...new Set(data.map((item) => item.country))]
            .filter(Boolean)
            .map((country, index) => (
              <option key={index} value={country}>
                {country}
              </option>
            ))}
        </select>

        <select
          className="p-3 rounded-lg border bg-white"
          value={selectedTopic}
          onChange={(e) =>
            setSelectedTopic(e.target.value)
          }
        >
          <option value="">Topic</option>

          {[...new Set(data.map((item) => item.topic))]
            .filter(Boolean)
            .map((topic, index) => (
              <option key={index} value={topic}>
                {topic}
              </option>
            ))}
        </select>

        <select
          className="p-3 rounded-lg border bg-white"
          value={selectedRegion}
          onChange={(e) =>
            setSelectedRegion(e.target.value)
          }
        >
          <option value="">Region</option>

          {[...new Set(data.map((item) => item.region))]
            .filter(Boolean)
            .map((region, index) => (
              <option key={index} value={region}>
                {region}
              </option>
            ))}
        </select>

        <select
          className="p-3 rounded-lg border bg-white"
          value={selectedSector}
          onChange={(e) =>
            setSelectedSector(e.target.value)
          }
        >
          <option value="">Sector</option>

          {[...new Set(data.map((item) => item.sector))]
            .filter(Boolean)
            .map((sector, index) => (
              <option key={index} value={sector}>
                {sector}
              </option>
            ))}
        </select>

        <select
          className="p-3 rounded-lg border bg-white"
          value={selectedSource}
          onChange={(e) =>
            setSelectedSource(e.target.value)
          }
        >
          <option value="">Source</option>

          {[...new Set(data.map((item) => item.source))]
            .filter(Boolean)
            .map((source, index) => (
              <option key={index} value={source}>
                {source}
              </option>
            ))}
        </select>

        <select
          className="p-3 rounded-lg border bg-white"
          value={selectedPestle}
          onChange={(e) =>
            setSelectedPestle(e.target.value)
          }
        >
          <option value="">PESTLE</option>

          {[...new Set(data.map((item) => item.pestle))]
            .filter(Boolean)
            .map((pestle, index) => (
              <option key={index} value={pestle}>
                {pestle}
              </option>
            ))}
        </select>

        <select
          className="p-3 rounded-lg border bg-white"
          value={selectedYear}
          onChange={(e) =>
            setSelectedYear(e.target.value)
          }
        >
          <option value="">Year</option>

          {[...new Set(
            data.map((item) => item.start_year)
          )]
            .filter(Boolean)
            .map((year, index) => (
              <option key={index} value={year}>
                {year}
              </option>
            ))}
        </select>

        <select
          className="p-3 rounded-lg border bg-white"
          value={selectedCity}
          onChange={(e) =>
            setSelectedCity(e.target.value)
          }
        >
          <option value="">City</option>

          {[...new Set(data.map((item) => item.city))]
            .filter(Boolean)
            .map((city, index) => (
              <option key={index} value={city}>
                {city}
              </option>
            ))}
        </select>
      </div>

      {/* CARDS */}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">

        <div className="bg-white p-6 rounded-2xl shadow-lg">
          <h2 className="font-semibold text-lg">
            Total Records
          </h2>

          <p className="text-4xl mt-4 text-blue-500">
            {filteredData.length}
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-lg">
          <h2 className="font-semibold text-lg">
            Avg Relevance
          </h2>

          <p className="text-4xl mt-4 text-green-500">
            {Math.round(
              totalRelevance /
                (filteredData.length || 1)
            )}
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-lg">
          <h2 className="font-semibold text-lg">
            Avg Likelihood
          </h2>

          <p className="text-4xl mt-4 text-purple-500">
            {Math.round(
              totalLikelihood /
                (filteredData.length || 1)
            )}
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-lg">
          <h2 className="font-semibold text-lg">
            Countries
          </h2>

          <p className="text-4xl mt-4 text-red-500">
            {countryLabels.length}
          </p>
        </div>
      </div>

      {/* CHARTS */}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">

        <div className="bg-white p-6 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-bold mb-4">
            Country Intensity
          </h2>

          <Bar data={barData} />
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-bold mb-4">
            Topics Distribution
          </h2>

          <Pie data={pieData} />
        </div>
      </div>

      {/* LINE CHART */}

      <div className="bg-white p-6 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold mb-4">
          Intensity Over Years
        </h2>

        <Line data={lineData} />
      </div>
    </div>
  );
}

export default App;