import { Search, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { useDebounce } from "@/hooks/use-debounce";
import { removeDiacritics } from "@/utils/arabic-utils";

interface SearchBarProps {
  onSearch: (query: string) => void;
  isLoading?: boolean;
}

const SearchBar = ({ onSearch, isLoading }: SearchBarProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearch = useDebounce(searchTerm, 300);

  useEffect(() => {
    // Normalize the search term before sending it
    const normalizedSearch = removeDiacritics(debouncedSearch);
    onSearch(normalizedSearch);
  }, [debouncedSearch, onSearch]);

  return (
    <div className="relative w-full">
      <Input
        type="text"
        value={searchTerm}
        placeholder="ابحث عن حديث..."
        className="pl-10 h-12 text-right w-full rounded-lg focus-visible:ring-emerald-500"
        dir="rtl"
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="absolute left-3 top-1/2 -translate-y-1/2">
        {isLoading ? (
          <Loader2 className="h-5 w-5 text-emerald-600 animate-spin" />
        ) : (
          <Search className="h-5 w-5 text-gray-400" />
        )}
      </div>
    </div>
  );
};

export default SearchBar;
