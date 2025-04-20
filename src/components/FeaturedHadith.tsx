
import { Card, CardContent } from "@/components/ui/card";

const FeaturedHadith = () => {
  return (
    <Card className="bg-gradient-to-br from-emerald-700 to-emerald-900 text-white">
      <CardContent className="p-8 space-y-6">
        <p className="text-3xl font-semibold text-right" dir="rtl">حديث اليوم</p>
        <p className="text-right text-2xl leading-relaxed" dir="rtl">
          إِنَّمَا الْأَعْمَالُ بِالنِّيَّاتِ
        </p>
        <p className="text-xl text-right" dir="rtl">
          إنما الأعمال بالنيات، وإنما لكل امرئ ما نوى
        </p>
        <p className="text-emerald-200 text-right" dir="rtl">رواه عمر بن الخطاب رضي الله عنه</p>
      </CardContent>
    </Card>
  );
};

export default FeaturedHadith;
