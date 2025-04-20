
import { useState } from "react";
import FeaturedHadith from "@/components/FeaturedHadith";
import SearchBar from "@/components/SearchBar";
import HadithCard from "@/components/HadithCard";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const hadiths = [
    {
      title: "The Importance of Good Character",
      arabic: "أَكْمَلُ الْمُؤْمِنِينَ إِيمَانًا أَحْسَنُهُمْ خُلُقًا",
      translation: "The most complete of the believers in faith is the one with the best character.",
      narrator: "Narrated by Abu Hurairah (رضي الله عنه)"
    },
    {
      title: "Kindness",
      arabic: "الرَّاحِمُونَ يَرْحَمُهُمُ الرَّحْمَنُ",
      translation: "The merciful ones will be shown mercy by the Most Merciful.",
      narrator: "Narrated by Abdullah ibn Amr (رضي الله عنه)"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        <h1 className="text-4xl font-bold text-center text-emerald-800 mb-8">
          3adith Collection
        </h1>
        
        <div className="mb-12">
          <FeaturedHadith />
        </div>

        <div className="mb-8">
          <SearchBar onSearch={setSearchQuery} />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {hadiths.map((hadith, index) => (
            <HadithCard key={index} {...hadith} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;
