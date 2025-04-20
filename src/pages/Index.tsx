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
import { removeDiacritics } from "@/utils/arabic-utils";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [hadiths, setHadiths] = useState<Hadith[]>([]);
  const [filteredHadiths, setFilteredHadiths] = useState<Hadith[]>([]);
  const [page, setPage] = useState(1); // Track current page
  const [loadingMore, setLoadingMore] = useState(false); // Track loading state for "Show More"
  const [isSearching, setIsSearching] = useState(false);
  const perPage = 10; // Number of Hadiths per page
  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = localStorage.getItem("currentUser");
    if (!currentUser) {
      navigate("/login"); // Redirect to login if not logged in
    }
  }, [navigate]);

  useEffect(() => {
    fetchHadiths(undefined, 1, perPage) // Fetch initial 10 Hadiths
      .then((data) => {
        console.log("Fetched hadiths:", data);
        setHadiths(data);
        setFilteredHadiths(data);
      })
      .catch((error) => {
        console.error("Error fetching hadiths:", error);
      });
  }, []);

  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    setIsSearching(true);

    try {
      if (!query.trim()) {
        setFilteredHadiths(hadiths);
        return;
      }

      const normalizedQuery = removeDiacritics(query.toLowerCase());
      const filtered = hadiths.filter((hadith) => {
        const searchableText = [
          hadith.title,
          hadith.translation,
          hadith.narrator,
          hadith.arabic,
          hadith.book,
          hadith.chapter,
        ].map((text) => removeDiacritics((text || "").toLowerCase()));

        return searchableText.some((text) => text.includes(normalizedQuery));
      });

      setFilteredHadiths(filtered);
    } catch (error) {
      console.error("Error during search:", error);
      toast.error("حدث خطأ أثناء البحث");
    } finally {
      setIsSearching(false);
    }
  };

  const handleShowMore = () => {
    setLoadingMore(true);
    fetchHadiths(undefined, page + 1, perPage) // Fetch next 10 Hadiths
      .then((newHadiths) => {
        setHadiths((prev) => [...prev, ...newHadiths]);
        setFilteredHadiths((prev) => [...prev, ...newHadiths]);
        setPage((prev) => prev + 1);
      })
      .catch((error) => {
        console.error("Error fetching more hadiths:", error);
      })
      .finally(() => {
        setLoadingMore(false);
      });
  };

  const handleLogout = () => {
    mockLogout();
    toast.success("تم تسجيل الخروج بنجاح");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-[#fcfcfc] bg-[url('/islamic-pattern.png')] bg-fixed bg-opacity-5">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="bg-white rounded-xl shadow-md border border-emerald-100 p-4 md:p-6 mb-8">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 md:gap-0">
            <div className="flex items-center gap-4 order-2 md:order-1">
              <Button
                onClick={handleLogout}
                variant="ghost"
                className="flex items-center gap-2 hover:bg-red-50 text-red-600 hover:text-red-700 text-sm md:text-base"
              >
                <LogOut className="h-4 w-4 md:h-5 md:w-5" />
                <span className="font-arabic">خروج</span>
              </Button>
              <Button
                asChild
                variant="ghost"
                className="flex items-center gap-2 hover:bg-emerald-50 text-emerald-600 text-sm md:text-base"
              >
                <Link to="/user" className="flex items-center gap-2">
                  <User className="h-4 w-4 md:h-5 md:w-5" />
                  <span className="font-arabic">الملف الشخصي</span>
                </Link>
              </Button>
              <Button
                asChild
                className="bg-emerald-600 hover:bg-emerald-700 flex items-center gap-2 text-sm md:text-base"
              >
                <Link to="/discussions" className="flex items-center gap-2">
                  <MessageCircle className="h-4 w-4 md:h-5 md:w-5" />
                  <span className="font-arabic">المناقشات</span>
                </Link>
              </Button>
            </div>

            <div className="flex items-center gap-4 order-1 md:order-2 justify-between md:justify-start">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-emerald-50 flex items-center justify-center">
                <svg
                  className="w-6 h-6 md:w-8 md:h-8 text-emerald-600"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <path
                    d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h1
                className="text-2xl md:text-4xl font-bold text-emerald-900"
                dir="rtl"
              >
                مجموعة الأحاديث
              </h1>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Stats Sidebar - Now First */}
          <div className="order-2 lg:order-1 space-y-6">
            <div className="bg-white rounded-xl p-6 shadow-md border border-emerald-100">
              <div className="flex items-center gap-3 mb-6 flex-row-reverse justify-between">
                <h3 className="text-xl font-arabic text-emerald-900">
                  إحصائيات سريعة
                </h3>
                <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-emerald-600"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path
                      d="M12 6v6l4 2"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <circle cx="12" cy="12" r="10" strokeWidth="2" />
                  </svg>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-emerald-50 rounded-lg">
                  <span className="font-bold text-emerald-900">
                    {hadiths.length}
                  </span>
                  <span className="font-arabic text-emerald-800">
                    إجمالي الأحاديث
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 bg-emerald-50 rounded-lg">
                  <span className="font-bold text-emerald-900">
                    {Math.floor((currentUser.progress * hadiths.length) / 100)}
                  </span>
                  <span className="font-arabic text-emerald-800">
                    الأحاديث المقروءة
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 bg-emerald-50 rounded-lg">
                  <span className="font-bold text-emerald-900">٣</span>
                  <span className="font-arabic text-emerald-800">
                    المستخدمون النشطون
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content - Now Second */}
          <div className="order-1 lg:order-2 lg:col-span-3 space-y-6">
            <div className="bg-white rounded-xl p-6 shadow-md border border-emerald-100">
              <h2 className="text-2xl font-arabic text-emerald-900 mb-6 text-right">
                حديث مختار
              </h2>
              <FeaturedHadith />
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md border border-emerald-100">
              <SearchBar onSearch={handleSearch} isLoading={isSearching} />
              {filteredHadiths.length === 0 && searchQuery && !isSearching && (
                <div className="text-center py-8 text-gray-500" dir="rtl">
                  لا توجد نتائج للبحث
                </div>
              )}
            </div>

            <div className="grid gap-6 md:grid-cols-2 rtl">
              {filteredHadiths.map((hadith) => (
                <div
                  key={hadith.id}
                  className="bg-white rounded-xl shadow-md border border-emerald-100 transition-all duration-300 hover:shadow-lg hover:border-emerald-200"
                >
                  <HadithCard hadith={hadith} />
                </div>
              ))}
            </div>

            <div className="text-center py-6">
              <Button
                onClick={handleShowMore}
                disabled={loadingMore}
                className="bg-emerald-600 hover:bg-emerald-700 text-lg px-8 py-3 rounded-full font-arabic shadow-md"
              >
                {loadingMore ? "جاري التحميل..." : "عرض المزيد"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
