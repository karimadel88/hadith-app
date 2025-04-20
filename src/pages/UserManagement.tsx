
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { users, currentUser } from "@/lib/data";
import UserProfile from "@/components/UserProfile";
import ReadingProgressBoard from "@/components/ReadingProgressBoard";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const UserManagement = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
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
            الملف الشخصي
          </h1>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full" dir="rtl">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="profile">الملف الشخصي</TabsTrigger>
            <TabsTrigger value="progress">تقدم القراءة</TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile" className="mt-6">
            <UserProfile user={currentUser} />
          </TabsContent>
          
          <TabsContent value="progress" className="mt-6">
            <ReadingProgressBoard userId={currentUser.id} />
          </TabsContent>
        </Tabs>

        <Card className="w-full mt-8">
          <CardHeader>
            <CardTitle className="text-emerald-800" dir="rtl">المستخدمون النشطون</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {users
                .filter(user => user.id !== currentUser.id)
                .map(user => (
                  <UserProfile key={user.id} user={user} />
                ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UserManagement;
