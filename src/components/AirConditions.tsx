interface AirConditionsProps {
  data: any;
  dark: boolean;
}

export function AirConditions({ data, dark }: AirConditionsProps) {
  return (
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
  );
}
