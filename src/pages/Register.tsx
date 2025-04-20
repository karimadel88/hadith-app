
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { UserPlus } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { mockRegister } from "@/utils/mockAuth";
import { toast } from "sonner";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const user = mockRegister(email, password, name);
    
    if (user) {
      toast.success("تم إنشاء الحساب بنجاح");
      navigate("/home");
    } else {
      toast.error("البريد الإلكتروني مستخدم بالفعل");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white flex items-center justify-center px-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-right text-emerald-800" dir="rtl">إنشاء حساب جديد</CardTitle>
          <CardDescription className="text-right" dir="rtl">
            انضم إلينا وابدأ رحلة التعلم
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-right block text-sm font-medium" dir="rtl">الاسم</label>
              <Input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="الاسم الكامل"
                className="text-right"
                dir="rtl"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-right block text-sm font-medium" dir="rtl">البريد الإلكتروني</label>
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
              <label className="text-right block text-sm font-medium" dir="rtl">كلمة المرور</label>
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
            <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700">
              <UserPlus className="h-5 w-5 ml-2" />
              إنشاء حساب
            </Button>
          </form>
          <p className="mt-4 text-center text-sm text-gray-600" dir="rtl">
            لديك حساب بالفعل؟{" "}
            <Link to="/login" className="text-emerald-600 hover:underline">
              سجل دخولك
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Register;
