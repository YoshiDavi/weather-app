interface GetWeatherProps {
  city: string;
}

export async function getWeather({ city }: GetWeatherProps) {
  const API_KEY = import.meta.env.VITE_API_KEY;

  if (!city) return null;

  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=pt_br&appid=${API_KEY}`
    );

    if (!res.ok) throw new Error("Cidade não encontrada");

    const data = await res.json();
    return data;
  } catch (err: any) {
    console.error("Erro na requisição:", err.message);
    throw err; // deixa o componente lidar com o erro
  }
}
