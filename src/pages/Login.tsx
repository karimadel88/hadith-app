import { useState, useEffect } from "react";
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
import { Link, useNavigate } from "react-router-dom";
import { mockLogin } from "@/utils/mockAuth";
import { toast } from "sonner";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = localStorage.getItem("currentUser");
    if (currentUser) {
      navigate("/home"); // Redirect to home if already logged in
    }
  }, [navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const user = mockLogin(email, password);

    if (user) {
      toast.success("تم تسجيل الدخول بنجاح");
      navigate("/home");
    } else {
      toast.error("البريد الإلكتروني أو كلمة المرور غير صحيحة");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white flex items-center justify-center px-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-right text-emerald-800" dir="rtl">
            تسجيل الدخول
          </CardTitle>
          <CardDescription className="text-right" dir="rtl">
            أدخل بيانات حسابك للمتابعة
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-right block text-sm font-medium" dir="rtl">
                البريد الإلكتروني
              </label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@domain.com"
                className="text-right"
                dir="rtl"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-right block text-sm font-medium" dir="rtl">
                كلمة المرور
              </label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="text-right"
                dir="rtl"
                required
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-emerald-600 hover:bg-emerald-700"
            >
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
