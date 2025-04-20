
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface HadithCardProps {
  title: string;
  arabic: string;
  translation: string;
  narrator: string;
}

const HadithCard = ({ title, arabic, translation, narrator }: HadithCardProps) => {
  return (
    <Card className="w-full transition-all duration-300 hover:shadow-lg">
      <CardHeader>
        <CardTitle className="text-emerald-800">{title}</CardTitle>
        <CardDescription>{narrator}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-right text-2xl leading-relaxed text-navy-900" dir="rtl">{arabic}</p>
        <p className="text-gray-600">{translation}</p>
      </CardContent>
    </Card>
  );
};

export default HadithCard;
