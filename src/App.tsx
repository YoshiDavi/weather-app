import { useEffect, useState } from "react";
import "./index.css";
import { getWeather } from "./services/getWeather";
import { SearchBar } from "./components/SearchBar";
import { WeatherInfo } from "./components/WeatherInfo";
import { AirConditions } from "./components/AirConditions";

export default function App() {
  const [city, setCity] = useState("");
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState("");
  const [dark, setDark] = useState(false);

  async function handleGetWeather() {
    if (!city) return;

    try {
      const result = await getWeather({ city });
      setData(result);
      setError("");
    } catch (err: any) {
      setError(err.message || "Erro ao buscar cidade");
      setData(null);
    }
  }

  return (
    <main
      className={`flex justify-center items-start md:items-center min-h-[100dvh] w-full p-10 transition-all duration-500
      ${
        dark
          ? "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 text-gray-100"
          : "bg-gradient-to-br from-sky-400 via-sky-500 to-blue-600 text-white"
      }`}
    >

      <button
        onClick={() => setDark(!dark)}
        className={`fixed top-4 right-4 rounded-xl px-3 py-2 font-medium transition z-20
        ${
          dark
            ? "bg-sky-500 hover:bg-sky-600"
            : "bg-gray-700 hover:bg-gray-600 text-yellow-300"
        }`}
      >
        {dark ? "☀️" : "🌙"}
      </button>

      <section
        className={`relative backdrop-blur-xl border shadow-2xl rounded-2xl p-8 md:p-10
        w-full md:max-w-5xl flex flex-col md:flex-row gap-8 transition-all duration-500
        ${dark ? "bg-gray-800/70 border-gray-700" : "bg-white/50 border-white/30"}
      `}
      >
        <div className="flex-1 flex flex-col justify-center space-y-6 text-center md:text-left">
          <SearchBar
            city={city}
            setCity={setCity}
            onSearch={handleGetWeather}
            dark={dark}
          />
          {error && <p className="text-red-400">{error}</p>}
          <WeatherInfo data={data} />
        </div>

        <AirConditions data={data} dark={dark} />
      </section>
    </main>
  );
}
