
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Hadith } from "@/lib/data";
import { MessageCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface HadithCardProps {
  hadith: Hadith;
}

const HadithCard = ({ hadith }: HadithCardProps) => {
  const navigate = useNavigate();
  const commentCount = hadith.comments?.length || 0;

  const handleCardClick = () => {
    navigate(`/hadith/${hadith.id}`);
  };

  return (
    <Card 
      className="w-full transition-all duration-300 hover:shadow-lg cursor-pointer"
      onClick={handleCardClick}
    >
      <CardHeader>
        <CardTitle className="text-emerald-800">{hadith.title}</CardTitle>
        <CardDescription>
          <div className="flex justify-between">
            <span>{hadith.narrator}</span>
            <div className="flex items-center space-x-1">
              <MessageCircle className="h-4 w-4" />
              <span>{commentCount}</span>
            </div>
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-right text-2xl leading-relaxed text-navy-900" dir="rtl">{hadith.arabic}</p>
        <p className="text-gray-600">{hadith.translation}</p>
      </CardContent>
    </Card>
  );
};

export default HadithCard;
