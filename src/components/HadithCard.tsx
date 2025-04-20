import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Hadith } from "@/lib/data";
import { useNavigate } from "react-router-dom";

interface HadithCardProps {
  hadith: Hadith;
}

const HadithCard = ({ hadith }: HadithCardProps) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/hadith/${hadith.id}`);
  };

  return (
    <Card
      className="w-full transition-all duration-300 hover:shadow-lg cursor-pointer text-right"
      onClick={handleCardClick}
    >
      <CardHeader>
        <CardTitle className="text-emerald-800">{hadith.title}</CardTitle>
      </CardHeader>
    </Card>
  );
};

export default HadithCard;
