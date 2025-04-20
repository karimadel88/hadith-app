
import { Card, CardContent } from "@/components/ui/card";

const FeaturedHadith = () => {
  return (
    <Card className="bg-gradient-to-br from-emerald-700 to-emerald-900 text-white">
      <CardContent className="p-8 space-y-6">
        <p className="text-3xl font-semibold">Hadith of the Day</p>
        <p className="text-right text-2xl leading-relaxed" dir="rtl">
          إِنَّمَا الْأَعْمَالُ بِالنِّيَّاتِ
        </p>
        <p className="text-xl">
          "Actions are judged by intentions."
        </p>
        <p className="text-emerald-200">Narrated by Umar ibn Al-Khattab (رضي الله عنه)</p>
      </CardContent>
    </Card>
  );
};

export default FeaturedHadith;
