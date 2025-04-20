
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { hadiths } from "@/lib/data";
import CommentSection from "@/components/CommentSection";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Discussions = () => {
  const [activeTab, setActiveTab] = useState("popular");

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
        <h1 className="text-4xl font-bold text-center text-emerald-800 mb-8">
          Community Discussions
        </h1>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
            <TabsTrigger value="popular">Most Discussed</TabsTrigger>
            <TabsTrigger value="recent">Recent Comments</TabsTrigger>
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
                    <p className="text-gray-600">{hadith.translation}</p>
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
                    <CardDescription className="text-sm">Comment from {new Date(comment.timestamp).toLocaleDateString()}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="border-l-4 border-l-emerald-500 pl-4 py-2">
                      <p>{comment.text}</p>
                    </div>
                    <p className="text-sm mt-4">
                      <span className="font-semibold">From hadith:</span> "{comment.hadith.translation.substring(0, 100)}..."
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
