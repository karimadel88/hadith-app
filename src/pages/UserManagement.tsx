
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { users, currentUser } from "@/lib/data";
import UserProfile from "@/components/UserProfile";
import ReadingProgressBoard from "@/components/ReadingProgressBoard";

const UserManagement = () => {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        <h1 className="text-4xl font-bold text-center text-emerald-800 mb-8">
          User Profile
        </h1>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="progress">Reading Progress</TabsTrigger>
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
            <CardTitle className="text-emerald-800">Other Active Users</CardTitle>
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
