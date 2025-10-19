import { Search } from "lucide-react";

interface SearchBarProps {
  city: string;
  setCity: (value: string) => void;
  onSearch: () => void;
  dark: boolean;
}

export function SearchBar({ city, setCity, onSearch, dark }: SearchBarProps) {
  return (
    <div className="flex gap-3">
      <input
        value={city}
        onChange={(e) => setCity(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && onSearch()}
        type="text"
        placeholder="Digite o nome da cidade..."
        className={`flex-1 p-3 rounded-xl placeholder-white/70 
        focus:outline-none border transition
        ${
          dark
            ? "bg-gray-700 border-gray-600 text-white"
            : "bg-white/20 border-white/30 text-white"
        }`}
      />
      <button
        onClick={onSearch}
        className={`rounded-xl px-4 py-2 font-medium transition flex items-center justify-center
        ${
          dark
            ? "bg-blue-500 hover:bg-blue-600"
            : "bg-sky-500 hover:bg-sky-600"
        }`}
        title="Buscar cidade"
      >
        <Search size={20} />
      </button>
    </div>
  );
}
