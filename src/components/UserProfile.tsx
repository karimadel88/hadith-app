import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { User } from "@/lib/data";

interface UserProfileProps {
  user: User;
}

const UserProfile = ({ user }: UserProfileProps) => {
  return (
    <Card className="w-full border-2 border-emerald-700/20 bg-gradient-to-br from-emerald-50/50 to-white">
      <CardHeader className="pb-4">
        <div className="flex items-start gap-4">
          <Avatar className="h-16 w-16 ring-2 ring-emerald-700/20">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback className="bg-emerald-100 text-emerald-900">
              {user.name.substring(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="space-y-1.5">
            <CardTitle className="font-[Amiri] text-emerald-900 text-lg">
              {user.name}
            </CardTitle>
            <CardDescription className="text-gray-600 text-sm">
              {user.email}
            </CardDescription>
            <p className="text-xs text-gray-500 mt-1">
              عضو منذ {new Date(user.joinedAt).toLocaleDateString("ar-SA")}
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="font-[Amiri] text-emerald-800 text-sm">
            تقدم القراءة
          </span>
          <span className="font-[Amiri] font-bold text-emerald-900 text-base">
            {user.progress}%
          </span>
        </div>
        <Progress
          value={user.progress}
          className="h-2.5 bg-gray-100"
          // indicatorClassName="bg-emerald-500"
        />
      </CardContent>
    </Card>
  );
};

export default UserProfile;
