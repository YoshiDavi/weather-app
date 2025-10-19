interface WeatherInfoProps {
  data: any;
}

export function WeatherInfo({ data }: WeatherInfoProps) {
  return (
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
  );
}
