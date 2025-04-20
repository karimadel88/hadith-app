
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

export interface Comment {
  id: string;
  userId: string;
  hadithId: string;
  text: string;
  timestamp: string;
  likes: number;
}

export interface Hadith {
  id: string;
  title: string;
  arabic: string;
  translation: string;
  narrator: string;
  chapter: string;
  book: string;
  comments?: Comment[];
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
    joinedAt: "2023-09-15"
  },
  {
    id: "2",
    name: "Fatima Hassan",
    avatar: "https://i.pravatar.cc/150?img=5",
    email: "fatima@example.com",
    progress: 42,
    joinedAt: "2023-10-21"
  },
  {
    id: "3",
    name: "Mohammad Khan",
    avatar: "https://i.pravatar.cc/150?img=8",
    email: "mohammad@example.com",
    progress: 78,
    joinedAt: "2023-08-03"
  }
];

// Expanded hadith collection
export const hadiths: Hadith[] = [
  {
    id: "1",
    title: "The Importance of Good Character",
    arabic: "أَكْمَلُ الْمُؤْمِنِينَ إِيمَانًا أَحْسَنُهُمْ خُلُقًا",
    translation: "The most complete of the believers in faith is the one with the best character.",
    narrator: "Narrated by Abu Hurairah (رضي الله عنه)",
    chapter: "Good Character",
    book: "Sunan Abu Dawood",
    comments: [
      {
        id: "c1",
        userId: "2",
        hadithId: "1",
        text: "This hadith reminds us of the importance of good character in our daily interactions.",
        timestamp: "2024-04-10T14:23:00Z",
        likes: 5
      },
      {
        id: "c2",
        userId: "3",
        hadithId: "1",
        text: "I've been trying to embody this teaching in my workplace. It's challenging but rewarding.",
        timestamp: "2024-04-11T09:45:00Z",
        likes: 3
      }
    ]
  },
  {
    id: "2",
    title: "Kindness",
    arabic: "الرَّاحِمُونَ يَرْحَمُهُمُ الرَّحْمَنُ",
    translation: "The merciful ones will be shown mercy by the Most Merciful.",
    narrator: "Narrated by Abdullah ibn Amr (رضي الله عنه)",
    chapter: "Mercy",
    book: "Jami at-Tirmidhi",
    comments: [
      {
        id: "c3",
        userId: "1",
        hadithId: "2",
        text: "This hadith always moves me deeply. Mercy is the foundation of human connection.",
        timestamp: "2024-04-09T16:30:00Z",
        likes: 7
      }
    ]
  },
  {
    id: "3",
    title: "Actions and Intentions",
    arabic: "إِنَّمَا الْأَعْمَالُ بِالنِّيَّاتِ",
    translation: "Actions are judged by intentions.",
    narrator: "Narrated by Umar ibn Al-Khattab (رضي الله عنه)",
    chapter: "Intentions",
    book: "Sahih Bukhari",
    comments: []
  },
  {
    id: "4",
    title: "Brotherhood",
    arabic: "لَا يُؤْمِنُ أَحَدُكُمْ حَتَّى يُحِبَّ لِأَخِيهِ مَا يُحِبُّ لِنَفْسِهِ",
    translation: "None of you truly believes until he loves for his brother what he loves for himself.",
    narrator: "Narrated by Anas ibn Malik (رضي الله عنه)",
    chapter: "Faith",
    book: "Sahih Bukhari",
    comments: []
  },
  {
    id: "5",
    title: "Seeking Knowledge",
    arabic: "طَلَبُ الْعِلْمِ فَرِيضَةٌ عَلَى كُلِّ مُسْلِمٍ",
    translation: "Seeking knowledge is an obligation upon every Muslim.",
    narrator: "Narrated by Anas ibn Malik (رضي الله عنه)",
    chapter: "Knowledge",
    book: "Sunan Ibn Majah",
    comments: []
  }
];

// Reading progress data
export const readingProgress: ReadingProgress[] = [
  { userId: "1", hadithId: "1", completed: true, dateRead: "2024-04-01T10:15:00Z" },
  { userId: "1", hadithId: "2", completed: true, dateRead: "2024-04-05T14:30:00Z" },
  { userId: "1", hadithId: "3", completed: true, dateRead: "2024-04-08T09:45:00Z" },
  { userId: "2", hadithId: "1", completed: true, dateRead: "2024-04-02T16:20:00Z" },
  { userId: "2", hadithId: "2", completed: true, dateRead: "2024-04-07T11:05:00Z" },
  { userId: "3", hadithId: "1", completed: true, dateRead: "2024-04-03T08:50:00Z" },
  { userId: "3", hadithId: "2", completed: true, dateRead: "2024-04-06T13:25:00Z" },
  { userId: "3", hadithId: "3", completed: true, dateRead: "2024-04-10T15:40:00Z" },
  { userId: "3", hadithId: "4", completed: true, dateRead: "2024-04-12T10:15:00Z" }
];

// Mock API functions (to be replaced with real API calls later)
export const fetchHadiths = () => {
  return Promise.resolve(hadiths);
};

export const fetchHadithById = (id: string) => {
  const hadith = hadiths.find(h => h.id === id);
  return Promise.resolve(hadith);
};

export const fetchUserById = (id: string) => {
  const user = users.find(u => u.id === id);
  return Promise.resolve(user);
};

export const fetchUserProgress = (userId: string) => {
  const progress = readingProgress.filter(p => p.userId === userId);
  return Promise.resolve(progress);
};

export const fetchComments = (hadithId: string) => {
  const hadith = hadiths.find(h => h.id === hadithId);
  return Promise.resolve(hadith?.comments || []);
};

// Mock authentication state
export const currentUser = users[0]; // Default logged in user for demo
