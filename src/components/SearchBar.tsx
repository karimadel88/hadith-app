
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar = ({ onSearch }: SearchBarProps) => {
  return (
    <div className="relative w-full max-w-xl mx-auto">
      <Input
        type="text"
        placeholder="Search hadith..."
        className="pl-10 h-12"
        onChange={(e) => onSearch(e.target.value)}
      />
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
    </div>
  );
};

export default SearchBar;
