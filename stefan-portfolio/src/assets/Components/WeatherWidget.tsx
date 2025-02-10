import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Cloud, Sun } from "lucide-react";

const WeatherWidget = () => {
  const [weather, setWeather] = useState<{
    temperature: number | null;
    condition: string | null;
  }>({
    temperature: null,
    condition: null,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchWeather = async (latitude: number, longitude: number) => {
    const apiKey = "247d0b4961f3706fb17dc42845f3ae1e";
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch weather data");
      }
      const data = await response.json();
      setWeather({
        temperature: data.main.temp,
        condition: data.weather[0].main,
      });
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  const fetchDefaultWeather = () => {
    // Default coordinates for Skopje
    const skopjeLatitude = 41.9973;
    const skopjeLongitude = 21.428;
    fetchWeather(skopjeLatitude, skopjeLongitude);
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          fetchWeather(position.coords.latitude, position.coords.longitude);
        },
        () => {
          // If user denies location access or location retrieval fails, use default location
          fetchDefaultWeather();
        }
      );
    } else {
      // If geolocation is not supported, use default location
      fetchDefaultWeather();
    }
  }, []);

  if (loading) {
    return <div>Loading weather...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-black/50 backdrop-blur-md rounded-lg p-4"
    >
      <div className="flex items-center gap-2 mb-2">
        <Cloud className="h-4 w-4" />
        <span className="text-sm">Weather</span>
      </div>
      <div className="flex items-center justify-between">
        <div>
          <div className="text-2xl font-bold">{weather.temperature}°C</div>
          <div className="text-sm text-white/60">{weather.condition}</div>
        </div>
        <Sun className="h-6 w-6" />
      </div>
    </motion.div>
  );
};

export default WeatherWidget;
