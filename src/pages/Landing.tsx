import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LogIn, UserPlus } from "lucide-react";
import { useEffect } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = localStorage.getItem("currentUser");
    if (currentUser) {
      navigate("/home"); // Redirect to home if already logged in
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center space-y-6 mb-16">
          <h1 className="text-5xl font-bold text-emerald-800" dir="rtl">
            موسوعة الحديث الشريف
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto" dir="rtl">
            اكتشف وتعلم الأحاديث النبوية الشريفة مع مجتمع من المتعلمين
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="text-right text-emerald-800" dir="rtl">
                تسجيل الدخول
              </CardTitle>
              <CardDescription className="text-right" dir="rtl">
                لديك حساب؟ سجل دخولك للمتابعة
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                asChild
                className="w-full bg-emerald-600 hover:bg-emerald-700"
              >
                <Link
                  to="/login"
                  className="flex items-center justify-center gap-2"
                >
                  <LogIn className="h-5 w-5" />
                  <span>تسجيل الدخول</span>
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-right text-emerald-800" dir="rtl">
                حساب جديد
              </CardTitle>
              <CardDescription className="text-right" dir="rtl">
                انضم إلينا وابدأ رحلة التعلم
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                asChild
                variant="outline"
                className="w-full border-emerald-600 text-emerald-600 hover:bg-emerald-50"
              >
                <Link
                  to="/register"
                  className="flex items-center justify-center gap-2"
                >
                  <UserPlus className="h-5 w-5" />
                  <span>إنشاء حساب</span>
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="mt-16 text-center space-y-4">
          <h2 className="text-3xl font-semibold text-emerald-800" dir="rtl">
            مميزات الموقع
          </h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="p-6 rounded-lg bg-white shadow-sm">
              <h3
                className="text-xl font-semibold mb-2 text-emerald-700"
                dir="rtl"
              >
                مكتبة شاملة
              </h3>
              <p className="text-gray-600" dir="rtl">
                مجموعة واسعة من الأحاديث النبوية الشريفة
              </p>
            </div>
            <div className="p-6 rounded-lg bg-white shadow-sm">
              <h3
                className="text-xl font-semibold mb-2 text-emerald-700"
                dir="rtl"
              >
                تتبع تقدمك
              </h3>
              <p className="text-gray-600" dir="rtl">
                سجل وتابع تقدمك في القراءة والتعلم
              </p>
            </div>
            <div className="p-6 rounded-lg bg-white shadow-sm">
              <h3
                className="text-xl font-semibold mb-2 text-emerald-700"
                dir="rtl"
              >
                مناقشات تفاعلية
              </h3>
              <p className="text-gray-600" dir="rtl">
                شارك في النقاشات مع المجتمع
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
