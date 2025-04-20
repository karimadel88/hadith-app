
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchHadithById } from "@/lib/data";
import HadithDetail from "@/components/HadithDetail";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const HadithDetailPage = () => {
  const { id } = useParams();
  const [hadith, setHadith] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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
        <div className="flex justify-between items-center">
          <Button 
            variant="outline" 
            onClick={() => navigate(-1)}
            className="flex items-center space-x-2"
          >
            <ArrowLeft className="h-5 w-5 ml-2" />
            <span>رجوع</span>
          </Button>
          <h1 className="text-4xl font-bold text-emerald-800" dir="rtl">
            تفاصيل الحديث
          </h1>
        </div>
        
        {loading ? (
          <div className="space-y-4">
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-64 w-full" />
            <Skeleton className="h-24 w-full" />
          </div>
        ) : hadith ? (
          <HadithDetail hadith={hadith} />
        ) : (
          <div className="text-center py-10" dir="rtl">
            <h2 className="text-2xl font-semibold text-gray-700">لم يتم العثور على الحديث</h2>
            <p className="text-gray-500">الحديث الذي تبحث عنه غير موجود أو تمت إزالته.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default HadithDetailPage;
