import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { users } from "@/lib/data";
import UserProfile from "@/components/UserProfile";
import ReadingProgressBoard from "@/components/ReadingProgressBoard";
import { Button } from "@/components/ui/button";
import { ArrowLeft, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Helper to get current user from localStorage or fallback to mock
function getCurrentUser() {
  const stored = localStorage.getItem("currentUser");
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      return null;
    }
  }
  // fallback to first mock user for dev/demo
  return users[0];
}

const UserManagement = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [currentUser, setCurrentUser] = useState(getCurrentUser());
  const navigate = useNavigate();

  useEffect(() => {
    setCurrentUser(getCurrentUser());
  }, []);

  // Mock for user progress, ready for API integration
  // Replace with API call: fetchUserProgress(currentUser.id)
  const userProgress = {
    progress: currentUser?.progress ?? 0,
    // add more fields as needed
  };

  // Mock for user profile, ready for API integration
  // Replace with API call: fetchUserById(currentUser.id)
  const userProfile = currentUser;

  return (
    <div
      className="min-h-screen bg-[#fcfcfc] bg-[url('/islamic-pattern.png')] bg-fixed bg-opacity-5"
      dir="rtl"
    >
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Header Card */}
        <div className="bg-white rounded-xl shadow-md border border-emerald-100 p-4 md:p-6 mb-8">
          <div className="flex flex-row-reverse justify-between items-center">
            <Button
              variant="ghost"
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 hover:bg-emerald-50 text-emerald-600"
            >
              <span className="font-arabic">رجوع</span>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex flex-row-reverse items-center gap-4">
              <h1 className="text-2xl md:text-4xl font-bold text-emerald-900 font-arabic">
                الملف الشخصي
              </h1>
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-emerald-50 flex items-center justify-center">
                <User className="w-6 h-6 md:w-8 md:h-8 text-emerald-600" />
              </div>
            </div>
          </div>
        </div>

        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full"
          dir="rtl"
        >
          <TabsList className="grid w-full grid-cols-2 bg-white rounded-xl shadow-sm border border-emerald-100 p-1">
            <TabsTrigger
              value="profile"
              className="data-[state=active]:bg-emerald-600 data-[state=active]:text-white rounded-lg transition-all duration-200 font-arabic"
            >
              الملف الشخصي
            </TabsTrigger>
            <TabsTrigger
              value="progress"
              className="data-[state=active]:bg-emerald-600 data-[state=active]:text-white rounded-lg transition-all duration-200 font-arabic"
            >
              تقدم القراءة
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="mt-6">
            <div className="bg-white rounded-xl shadow-md border border-emerald-100 p-6">
              <UserProfile user={userProfile} />
            </div>
          </TabsContent>

          <TabsContent value="progress" className="mt-6">
            <div className="bg-white rounded-xl shadow-md border border-emerald-100 p-6">
              <ReadingProgressBoard userId={userProfile?.id} />
            </div>
          </TabsContent>
        </Tabs>

        <div className="mt-8 bg-white rounded-xl shadow-md border border-emerald-100">
          <div className="p-6 border-b border-emerald-100">
            <div className="flex flex-row items-center gap-3 justify-start">
              <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center">
                <User className="w-5 h-5 text-emerald-600" />
              </div>
              <h2 className="text-xl font-arabic text-emerald-900">
                المستخدمون النشطون
              </h2>
            </div>
          </div>
          <div className="p-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3" dir="rtl">
              {users
                .filter((user) => user.id !== userProfile?.id)
                .map((user) => (
                  <div
                    key={user.id}
                    className="bg-white rounded-xl shadow-sm border border-emerald-100 p-4 hover:shadow-md hover:border-emerald-200 transition-all duration-300"
                  >
                    <UserProfile user={user} />
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;
