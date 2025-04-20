
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ReadingProgress, hadiths, readingProgress, users } from "@/lib/data";
import { CheckCircle } from "lucide-react";

interface ReadingProgressBoardProps {
  userId?: string; // If provided, shows only this user's progress
}

const ReadingProgressBoard = ({ userId }: ReadingProgressBoardProps) => {
  // Filter progress by userId if provided
  const filteredProgress = userId 
    ? readingProgress.filter(p => p.userId === userId) 
    : readingProgress;

  // Get unique user IDs from the filtered progress
  const uniqueUserIds = Array.from(new Set(filteredProgress.map(p => p.userId)));
  
  // Create a map to easily look up hadith details
  const hadithMap = new Map(hadiths.map(h => [h.id, h]));

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-emerald-800">Reading Progress</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Hadith</TableHead>
              <TableHead>Book</TableHead>
              <TableHead>Read By</TableHead>
              <TableHead>Date Read</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProgress.map((progress, index) => {
              const hadith = hadithMap.get(progress.hadithId);
              const user = users.find(u => u.id === progress.userId);
              
              return (
                <TableRow key={index}>
                  <TableCell className="font-medium">
                    <div className="flex items-center">
                      {progress.completed && <CheckCircle className="mr-2 h-4 w-4 text-emerald-600" />}
                      {hadith?.title || 'Unknown Hadith'}
                    </div>
                  </TableCell>
                  <TableCell>{hadith?.book || 'Unknown'}</TableCell>
                  <TableCell>{user?.name || 'Unknown User'}</TableCell>
                  <TableCell>{new Date(progress.dateRead).toLocaleDateString()}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default ReadingProgressBoard;
