import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Comment, Hadith, currentUser } from "@/lib/data";
import CommentSection from "./CommentSection";
import { Bookmark, Share } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HadithDetailProps {
  hadith: Hadith;
}

const HadithDetail = ({ hadith }: HadithDetailProps) => {
  const [comments, setComments] = useState<Comment[]>(hadith.comments || []);

  const handleAddComment = (text: string) => {
    const newComment: Comment = {
      id: `c${Date.now()}`,
      userId: currentUser.id,
      hadithId: hadith.id,
      text: text,
      timestamp: new Date().toISOString(),
      likes: 0,
    };

    setComments([...comments, newComment]);
  };

  return (
    <div className="space-y-8">
      <Card className="w-full">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">
                <Bookmark className="h-4 w-4 ml-2" />
                حفظ
              </Button>
              <Button variant="outline" size="sm">
                <Share className="h-4 w-4 ml-2" />
                مشاركة
              </Button>
            </div>
            <CardTitle className="text-emerald-800 text-2xl text-right">
              {hadith.title}
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <p
            className="text-right text-3xl leading-relaxed text-navy-900"
            dir="rtl"
          >
            {hadith.arabic}
          </p>
          <p className="text-xl text-gray-700" dir="rtl">
            {hadith.translation}
          </p>
          <div className="flex justify-between text-gray-600 text-sm" dir="rtl">
            <p>{hadith.narrator}</p>
            <p>
              <span className="font-semibold">المصدر:</span> {hadith.book}
            </p>
          </div>
        </CardContent>
      </Card>

      <CommentSection
        comments={comments}
        hadithId={hadith.id}
        onAddComment={handleAddComment}
      />
    </div>
  );
};

export default HadithDetail;
