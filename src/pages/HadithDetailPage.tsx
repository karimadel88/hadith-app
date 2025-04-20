
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchHadithById } from "@/lib/data";
import HadithDetail from "@/components/HadithDetail";
import { Skeleton } from "@/components/ui/skeleton";

const HadithDetailPage = () => {
  const { id } = useParams();
  const [hadith, setHadith] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      setLoading(true);
      fetchHadithById(id)
        .then((data) => {
          setHadith(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching hadith:", error);
          setLoading(false);
        });
    }
  }, [id]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">
        <h1 className="text-4xl font-bold text-center text-emerald-800 mb-8">
          Hadith Detail
        </h1>
        
        {loading ? (
          <div className="space-y-4">
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-64 w-full" />
            <Skeleton className="h-24 w-full" />
          </div>
        ) : hadith ? (
          <HadithDetail hadith={hadith} />
        ) : (
          <div className="text-center py-10">
            <h2 className="text-2xl font-semibold text-gray-700">Hadith not found</h2>
            <p className="text-gray-500">The hadith you're looking for doesn't exist or has been removed.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default HadithDetailPage;
