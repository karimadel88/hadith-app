import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Comment, currentUser, users } from "@/lib/data";
import { MessageCircle, ThumbsUp } from "lucide-react";

interface CommentSectionProps {
  comments: Comment[];
  hadithId: string;
  onAddComment?: (text: string) => void;
}

const CommentSection = ({
  comments,
  hadithId,
  onAddComment,
}: CommentSectionProps) => {
  const [newComment, setNewComment] = useState("");

  const handleAddComment = () => {
    if (newComment.trim() && onAddComment) {
      onAddComment(newComment);
      setNewComment("");
    }
  };

  // Helper function to find user by ID
  const findUser = (userId: string) => {
    return users.find((u) => u.id === userId);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <MessageCircle className="h-5 w-5 text-emerald-700" />
        <h3 className="text-lg font-semibold text-emerald-800">
          Comments ({comments.length})
        </h3>
      </div>

      {/* Add new comment */}
      <div className="flex space-x-4">
        <Avatar className="h-10 w-10">
          <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
          <AvatarFallback>
            {currentUser.name.substring(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1 space-y-2">
          <Textarea
            placeholder="Share your thoughts..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="min-h-[80px]"
          />
          <Button
            onClick={handleAddComment}
            className="bg-emerald-600 hover:bg-emerald-700"
          >
            Add Comment
          </Button>
        </div>
      </div>

      {/* Comments list */}
      <div className="space-y-4">
        {comments.length === 0 ? (
          <p className="text-gray-500 italic">كن أول من يعلق على هذا الحديث.</p>
        ) : (
          comments.map((comment) => {
            const user = findUser(comment.userId);
            return (
              <Card
                key={comment.id}
                className="border-l-4 border-l-emerald-500"
              >
                <CardContent className="p-4">
                  <div className="flex space-x-4">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={user?.avatar} alt={user?.name} />
                      <AvatarFallback>
                        {user?.name.substring(0, 2).toUpperCase() || "UN"}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <h4 className="font-semibold">
                          {user?.name || "مستخدم غير معروف"}
                        </h4>
                        <span className="text-sm text-gray-500">
                          {new Date(comment.timestamp).toLocaleDateString(
                            "ar-SA"
                          )}
                        </span>
                      </div>
                      <p className="my-2">{comment.text}</p>
                      <div className="flex items-center text-sm text-gray-500">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="flex items-center space-x-1"
                        >
                          <ThumbsUp className="h-4 w-4" />
                          <span>{comment.likes}</span>
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })
        )}
      </div>
    </div>
  );
};

export default CommentSection;
