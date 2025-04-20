
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import FeaturedHadith from "@/components/FeaturedHadith";
import SearchBar from "@/components/SearchBar";
import HadithCard from "@/components/HadithCard";
import UserProfile from "@/components/UserProfile";
import { Button } from "@/components/ui/button";
import { fetchHadiths, currentUser, Hadith } from "@/lib/data";
import { User, MessageCircle, ArrowLeft, LogOut } from "lucide-react";
import { mockLogout } from "@/utils/mockAuth";
import { toast } from "sonner";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [hadiths, setHadiths] = useState<Hadith[]>([]);
  const [filteredHadiths, setFilteredHadiths] = useState<Hadith[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchHadiths()
      .then((data) => {
        setHadiths(data);
        setFilteredHadiths(data);
      })
      .catch((error) => {
        console.error("Error fetching hadiths:", error);
      });
  }, []);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (!query.trim()) {
      setFilteredHadiths(hadiths);
      return;
    }

    const filtered = hadiths.filter(
      (hadith) =>
        hadith.title.toLowerCase().includes(query.toLowerCase()) ||
        hadith.translation.toLowerCase().includes(query.toLowerCase()) ||
        hadith.narrator.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredHadiths(filtered);
  };

  const handleLogout = () => {
    mockLogout();
    toast.success("تم تسجيل الخروج بنجاح");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-4xl font-bold text-emerald-800" dir="rtl">
            مجموعة الأحاديث
          </h1>
          <div className="flex space-x-4">
            <Button onClick={handleLogout} variant="destructive" className="flex items-center space-x-2 mr-2">
              <LogOut className="h-5 w-5 ml-2" />
              <span>تسجيل الخروج</span>
            </Button>
            <Button asChild variant="outline" className="flex items-center space-x-2">
              <Link to="/user">
                <User className="h-5 w-5 ml-2" />
                <span>الملف الشخصي</span>
              </Link>
            </Button>
            <Button asChild className="bg-emerald-600 hover:bg-emerald-700 flex items-center space-x-2">
              <Link to="/discussions">
                <MessageCircle className="h-5 w-5 ml-2" />
                <span>المناقشات</span>
              </Link>
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="mb-12">
              <FeaturedHadith />
            </div>

            <div className="mb-8">
              <SearchBar onSearch={handleSearch} />
            </div>

            <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
              {filteredHadiths.map((hadith) => (
                <HadithCard key={hadith.id} hadith={hadith} />
              ))}
            </div>
          </div>
          
          <div className="space-y-6">
            <UserProfile user={currentUser} />
            
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="text-lg font-semibold text-emerald-800 mb-4" dir="rtl">إحصائيات سريعة</h3>
              <div className="space-y-2">
                <div className="flex justify-between" dir="rtl">
                  <span>إجمالي الأحاديث:</span>
                  <span className="font-medium">{hadiths.length}</span>
                </div>
                <div className="flex justify-between" dir="rtl">
                  <span>الأحاديث المقروءة:</span>
                  <span className="font-medium">{Math.floor(currentUser.progress * hadiths.length / 100)}</span>
                </div>
                <div className="flex justify-between" dir="rtl">
                  <span>المستخدمون النشطون:</span>
                  <span className="font-medium">3</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
