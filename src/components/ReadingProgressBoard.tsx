import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ReadingProgress, hadiths, readingProgress, users } from "@/lib/data";
import { CheckCircle } from "lucide-react";

interface ReadingProgressBoardProps {
  userId?: string; // If provided, shows only this user's progress
}

const ReadingProgressBoard = ({ userId }: ReadingProgressBoardProps) => {
  // Filter progress by userId if provided
  const filteredProgress = userId
    ? readingProgress.filter((p) => p.userId === userId)
    : readingProgress;

  // Get unique user IDs from the filtered progress
  const uniqueUserIds = Array.from(
    new Set(filteredProgress.map((p) => p.userId))
  );

  // Create a map to easily look up hadith details
  const hadithMap = new Map(hadiths.map((h) => [h.id, h]));

  return (
    <Card className="w-full font-['Noto_Naskh_Arabic'] bg-[#f2f9f2] border-emerald-100 shadow-sm">
      <CardHeader className="border-b border-emerald-200/50 py-3">
        <CardTitle className="text-emerald-800 text-2xl text-right mr-6">
          سجل القراءة
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <div className="bg-white rounded-lg overflow-hidden border border-emerald-100">
          <Table dir="rtl" className="border-collapse w-full">
            <TableHeader>
              <TableRow>
                <TableHead className="w-2/3 bg-emerald-50 py-3 px-6 text-emerald-800 text-lg font-semibold text-right">
                  <span className="text-emerald-600 ml-2">◆</span>
                  الحديث
                </TableHead>
                <TableHead className="w-1/3 bg-emerald-50 py-3 px-6 text-emerald-800 text-lg font-semibold text-right">
                  <span className="text-emerald-600 ml-2">◆</span>
                  تاريخ القراءة
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProgress.map((progress, index) => {
                const hadith = hadithMap.get(progress.hadithId);
                return (
                  <TableRow
                    key={index}
                    className="hover:bg-emerald-50/40 border-b border-emerald-100 last:border-0"
                  >
                    <TableCell className="py-4 px-6">
                      <div className="flex items-center gap-3 text-emerald-900">
                        {progress.completed && (
                          <CheckCircle className="h-5 w-5 text-emerald-600" />
                        )}
                        <span className="text-base font-medium text-right flex-1">
                          {hadith?.title || "حديث غير معروف"}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="py-4 px-6 text-base text-emerald-700 font-medium">
                      {new Date(progress.dateRead).toLocaleDateString("ar-SA")}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReadingProgressBoard;
