import { useState } from "react";
import { Search } from "lucide-react";
import "./index.css";

export default function App() {
  const [city, setCity] = useState("");
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState("");
  const [dark, setDark] = useState(false);

  const API_KEY = import.meta.env.VITE_OPENWEATHER_KEY;

  async function getWeather() {
    if (!city) return;
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=pt_br&appid=${API_KEY}`
      );
      if (!res.ok) throw new Error("Cidade não encontrada");
      const json = await res.json();
      setData(json);
      setError("");
    } catch (err: any) {
      setError(err.message);
      setData(null);
    }
  }

  return (
    <main
      className={`flex justify-center items-start md:items-center min-h-[100dvh] w-full p-10 transition-all duration-500
      ${dark
        ? "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 text-gray-100"
        : "bg-gradient-to-br from-sky-400 via-sky-500 to-blue-600 text-white"}
      `}
    >
      <button
        onClick={() => setDark(!dark)}
        className={`fixed top-4 right-4 rounded-xl px-3 py-2 font-medium transition z-20
        ${dark ? "bg-sky-500 hover:bg-sky-600" : "bg-gray-700 hover:bg-gray-600 text-yellow-300"}
      `}
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
          <div className="flex gap-3">
            <input
              value={city}
              onChange={(e) => setCity(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && getWeather()} // <-- aqui faz o Enter funcionar
              type="text"
              placeholder="Digite o nome da cidade..."
              className={`flex-1 p-3 rounded-xl placeholder-white/70 
              focus:outline-none border transition
              ${dark
                ? "bg-gray-700 border-gray-600 text-white"
                : "bg-white/20 border-white/30 text-white"}
            `}
            />
            <button
              onClick={getWeather}
              className={`rounded-xl px-4 py-2 font-medium transition flex items-center justify-center
              ${dark ? "bg-blue-500 hover:bg-blue-600" : "bg-sky-500 hover:bg-sky-600"}
            `}
              title="Buscar cidade"
            >
              <Search size={20} />
            </button>
          </div>

          {error && <p className="text-red-400">{error}</p>}

          <div className="space-y-2">
            <h2 className="text-7xl font-bold">
              {data ? `${Math.round(data.main.temp)}°C` : "0°C"}
            </h2>
            <p className="text-xl opacity-90 capitalize">
              {data ? data.weather[0].description : ""}
            </p>
            <p className="opacity-80">
              Sensação térmica:{" "}
              {data ? `${Math.round(data.main.feels_like)}°C` : "0°C"}
            </p>
          </div>

          <div className="flex justify-center md:justify-start gap-6 text-sm mt-4 opacity-90">
            <div>
              <p className="font-semibold">Min</p>
              <p>{data ? `${Math.round(data.main.temp_min)}°C` : "0°C"}</p>
            </div>
            <div>
              <p className="font-semibold">Max</p>
              <p>{data ? `${Math.round(data.main.temp_max)}°C` : "0°C"}</p>
            </div>
          </div>
        </div>

        <div
          className={`flex-1 flex flex-col justify-center rounded-xl p-6 space-y-4 transition text-center
          ${dark ? "bg-gray-700/50" : "bg-white/10"}
        `}
        >
          <h1 className="text-2xl font-semibold mb-12">Condições do ar</h1>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p>💧 Umidade</p>
              <p className="text-xl font-semibold">
                {data ? `${data.main.humidity}%` : "0%"}
              </p>
            </div>
            <div>
              <p>🌬️ Vento</p>
              <p className="text-xl font-semibold">
                {data ? `${data.wind.speed} m/s` : "0 m/s"}
              </p>
            </div>
            <div>
              <p>☁️ Nuvens</p>
              <p className="text-xl font-semibold">
                {data ? `${data.clouds.all}%` : "0%"}
              </p>
            </div>
            <div>
              <p>📍 Pressão</p>
              <p className="text-xl font-semibold">
                {data ? `${data.main.pressure} hPa` : "0 hPa"}
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
