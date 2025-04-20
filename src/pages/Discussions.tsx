
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { hadiths } from "@/lib/data";
import CommentSection from "@/components/CommentSection";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Discussions = () => {
  const [activeTab, setActiveTab] = useState("popular");
  const navigate = useNavigate();

  // Get hadiths with comments
  const hadithsWithComments = hadiths.filter(h => h.comments && h.comments.length > 0);
  
  // Sort by most commented
  const mostCommented = [...hadithsWithComments].sort((a, b) => 
    (b.comments?.length || 0) - (a.comments?.length || 0)
  );

  // Get recent comments
  const recentComments = hadithsWithComments
    .flatMap(h => (h.comments || []).map(c => ({ ...c, hadith: h })))
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    .slice(0, 5);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        <div className="flex justify-between items-center">
          <Button 
            variant="outline" 
            onClick={() => navigate(-1)}
            className="flex items-center space-x-2"
          >
            <ArrowLeft className="h-5 w-5 ml-2" />
            <span>رجوع</span>
          </Button>
          <h1 className="text-4xl font-bold text-emerald-800" dir="rtl">
            مناقشات المجتمع
          </h1>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full" dir="rtl">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
            <TabsTrigger value="popular">الأكثر نقاشاً</TabsTrigger>
            <TabsTrigger value="recent">أحدث التعليقات</TabsTrigger>
          </TabsList>
          
          <TabsContent value="popular" className="mt-6">
            <div className="space-y-8">
              {mostCommented.map(hadith => (
                <Card key={hadith.id} className="w-full">
                  <CardHeader>
                    <CardTitle className="text-emerald-800">{hadith.title}</CardTitle>
                    <CardDescription>{hadith.narrator}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <p className="text-right text-2xl leading-relaxed text-navy-900" dir="rtl">{hadith.arabic}</p>
                    <p className="text-gray-600" dir="rtl">{hadith.translation}</p>
                    <CommentSection comments={hadith.comments || []} hadithId={hadith.id} />
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="recent" className="mt-6">
            <div className="space-y-4">
              {recentComments.map((comment, index) => (
                <Card key={index} className="w-full">
                  <CardHeader>
                    <CardTitle className="text-emerald-800 text-lg">{comment.hadith.title}</CardTitle>
                    <CardDescription className="text-sm" dir="rtl">
                      تعليق من {new Date(comment.timestamp).toLocaleDateString('ar-SA')}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="border-r-4 border-r-emerald-500 pr-4 py-2" dir="rtl">
                      <p>{comment.text}</p>
                    </div>
                    <p className="text-sm mt-4" dir="rtl">
                      <span className="font-semibold">من حديث:</span> "{comment.hadith.translation.substring(0, 100)}..."
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Discussions;
