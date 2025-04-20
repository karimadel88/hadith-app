
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { LogIn } from "lucide-react";
import { Link } from "react-router-dom";

const Login = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Will be implemented with actual authentication later
    console.log("Login attempt");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white flex items-center justify-center px-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-right text-emerald-800" dir="rtl">تسجيل الدخول</CardTitle>
          <CardDescription className="text-right" dir="rtl">
            أدخل بيانات حسابك للمتابعة
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-right block text-sm font-medium" dir="rtl">البريد الإلكتروني</label>
              <Input
                type="email"
                placeholder="example@domain.com"
                className="text-right"
                dir="rtl"
              />
            </div>
            <div className="space-y-2">
              <label className="text-right block text-sm font-medium" dir="rtl">كلمة المرور</label>
              <Input
                type="password"
                placeholder="••••••••"
                className="text-right"
                dir="rtl"
              />
            </div>
            <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700">
              <LogIn className="h-5 w-5 ml-2" />
              تسجيل الدخول
            </Button>
          </form>
          <p className="mt-4 text-center text-sm text-gray-600" dir="rtl">
            ليس لديك حساب؟{" "}
            <Link to="/register" className="text-emerald-600 hover:underline">
              سجل الآن
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
