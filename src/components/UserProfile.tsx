
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { User } from "@/lib/data";

interface UserProfileProps {
  user: User;
}

const UserProfile = ({ user }: UserProfileProps) => {
  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <div className="flex items-center space-x-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback>{user.name.substring(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-emerald-800">{user.name}</CardTitle>
            <CardDescription>{user.email}</CardDescription>
            <p className="text-xs text-gray-500">Member since {new Date(user.joinedAt).toLocaleDateString()}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Reading Progress</span>
            <span className="font-medium">{user.progress}%</span>
          </div>
          <Progress value={user.progress} className="h-2 bg-emerald-100" indicatorClassName="bg-emerald-600" />
        </div>
      </CardContent>
    </Card>
  );
};

export default UserProfile;
