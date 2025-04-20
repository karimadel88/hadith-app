// Dummy data for the application
// This will be replaced with API calls to your backend later

export interface User {
  id: string;
  name: string;
  avatar: string;
  email: string;
  progress: number;
  joinedAt: string;
}

export interface Hadith {
  id: string;
  title: string;
  arabic: string;
  translation: string;
  narrator: string;
  chapter: string;
  book: string;
  comments: Comment[];
  grade?: string;
  explanation?: string;
  hints?: string[];
}

export interface Comment {
  id: string;
  userId: string;
  hadithId: string;
  text: string;
  timestamp: string;
  likes: number;
}

export interface ReadingProgress {
  userId: string;
  hadithId: string;
  completed: boolean;
  dateRead: string;
}

// Dummy users
export const users: User[] = [
  {
    id: "1",
    name: "Ahmed Ali",
    avatar: "https://i.pravatar.cc/150?img=1",
    email: "ahmed@example.com",
    progress: 65,
    joinedAt: "2023-09-15",
  },
  {
    id: "2",
    name: "Fatima Hassan",
    avatar: "https://i.pravatar.cc/150?img=5",
    email: "fatima@example.com",
    progress: 42,
    joinedAt: "2023-10-21",
  },
  {
    id: "3",
    name: "Mohammad Khan",
    avatar: "https://i.pravatar.cc/150?img=8",
    email: "mohammad@example.com",
    progress: 78,
    joinedAt: "2023-08-03",
  },
];

// Reading progress data
export const readingProgress: ReadingProgress[] = [
  {
    userId: "1",
    hadithId: "1",
    completed: true,
    dateRead: "2024-04-01T10:15:00Z",
  },
  {
    userId: "1",
    hadithId: "2",
    completed: true,
    dateRead: "2024-04-05T14:30:00Z",
  },
  {
    userId: "1",
    hadithId: "3",
    completed: true,
    dateRead: "2024-04-08T09:45:00Z",
  },
  {
    userId: "2",
    hadithId: "1",
    completed: true,
    dateRead: "2024-04-02T16:20:00Z",
  },
  {
    userId: "2",
    hadithId: "2",
    completed: true,
    dateRead: "2024-04-07T11:05:00Z",
  },
  {
    userId: "3",
    hadithId: "1",
    completed: true,
    dateRead: "2024-04-03T08:50:00Z",
  },
  {
    userId: "3",
    hadithId: "2",
    completed: true,
    dateRead: "2024-04-06T13:25:00Z",
  },
  {
    userId: "3",
    hadithId: "3",
    completed: true,
    dateRead: "2024-04-10T15:40:00Z",
  },
  {
    userId: "3",
    hadithId: "4",
    completed: true,
    dateRead: "2024-04-12T10:15:00Z",
  },
];

// Mock comments data
export const comments: Comment[] = [
  {
    id: "1",
    userId: "1",
    hadithId: "1",
    text: "This is a very inspiring hadith.",
    timestamp: "2024-04-01T12:00:00Z",
    likes: 10,
  },
  {
    id: "2",
    userId: "2",
    hadithId: "1",
    text: "I found this hadith very helpful.",
    timestamp: "2024-04-02T14:00:00Z",
    likes: 5,
  },
  {
    id: "3",
    userId: "3",
    hadithId: "2",
    text: "Great explanation of this hadith.",
    timestamp: "2024-04-03T16:00:00Z",
    likes: 8,
  },
  {
    id: "4",
    userId: "1",
    hadithId: "3",
    text: "This hadith is very profound.",
    timestamp: "2024-04-04T18:00:00Z",
    likes: 12,
  },
];

// Dummy hadiths data
export const hadiths: Hadith[] = [
  {
    id: "1",
    title: "الحديث الاول",
    arabic: "إِنَّمَا الْأَعْمَالُ بِالنِّيَّاتِ",
    translation: "Actions are judged by intentions.",
    narrator: "Umar ibn Al-Khattab",
    chapter: "Faith",
    book: "Sahih Bukhari",
    comments: [],
    grade: "Sahih",
    explanation: "This hadith emphasizes the importance of intentions.",
    hints: ["Intention", "Faith"],
  },
  {
    id: "2",
    title: "الحديث الثاني",
    arabic: "الدِّينُ النَّصِيحَةُ",
    translation: "Religion is sincerity.",
    narrator: "Tamim Al-Dari",
    chapter: "Faith",
    book: "Sahih Muslim",
    comments: [],
    grade: "Sahih",
    explanation: "This hadith highlights the value of sincerity in religion.",
    hints: ["Sincerity", "Faith"],
  },
  // Add more hadiths as needed
];

// Mock API functions (to be replaced with real API calls later)

export const fetchHadiths = async (
  categoryId: string = "1",
  page: number = 1,
  perPage: number = 5
): Promise<Hadith[]> => {
  try {
    const apiUrl = `https://hadeethenc.com/api/v1/hadeeths/list/?language=ar&category_id=${categoryId}&page=${page}&per_page=${perPage}`;

    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error("Failed to fetch hadiths");
    }

    const data = await response.json();

    const hadiths = data.data.map((hadeeth: any) => ({
      id: hadeeth.id,
      title: hadeeth.title,
      arabic: hadeeth.hadeeth,
      translation: hadeeth.explanation || "", // Using explanation as translation
      narrator: hadeeth.attribution,
      chapter: `Category ${hadeeth.categories?.[0] || "Unknown"}`,
      book: hadeeth.reference?.split("\n")?.[0] || "Unknown Book",
      grade: hadeeth.grade,
      explanation: hadeeth.explanation,
      hints: hadeeth.hints,
      comments: [], // Initialize with empty comments
    }));

    return hadiths;
  } catch (error) {
    console.error("Error fetching hadiths:", error);
    return []; // Return empty array in case of error
  }
};

// Additional function to fetch a single hadith by ID
export const fetchHadithById = async (id: string): Promise<Hadith | null> => {
  try {
    const apiUrl = `https://hadeethenc.com/api/v1/hadeeths/one/?language=ar&id=${id}`;

    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error("Failed to fetch hadith");
    }

    const hadeeth = await response.json();

    return {
      id: hadeeth.id,
      title: hadeeth.title,
      arabic: hadeeth.hadeeth,
      translation: hadeeth.explanation || "",
      narrator: hadeeth.attribution,
      chapter: `Category ${hadeeth.categories?.[0] || "Unknown"}`,
      book: hadeeth.reference?.split("\n")?.[0] || "Unknown Book",
      grade: hadeeth.grade,
      explanation: hadeeth.explanation,
      hints: hadeeth.hints,
      comments: [],
    };
  } catch (error) {
    console.error("Error fetching hadith:", error);
    return null;
  }
};

export const fetchUserById = (id: string) => {
  const user = users.find((u) => u.id === id);
  return Promise.resolve(user);
};

export const fetchUserProgress = (userId: string) => {
  const progress = readingProgress.filter((p) => p.userId === userId);
  return Promise.resolve(progress);
};

export const fetchComments = (hadithId: string) => {
  const hadithComments = comments.filter((c) => c.hadithId === hadithId);
  return Promise.resolve(hadithComments);
};

// Mock authentication state
export const currentUser = users[0]; // Default logged in user for demo
