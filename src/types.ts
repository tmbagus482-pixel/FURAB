export interface UserProfile {
  uid: string;
  displayName: string;
  email: string;
  photoURL?: string;
  role: 'admin' | 'member';
  bio?: string;
  joinedAt: string;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  type: 'kopdar' | 'nobar' | 'charity';
  imageUrl?: string;
  createdAt: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  imageUrl: string;
  videoUrl?: string;
  type: 'photo' | 'video';
  uploadedBy: string;
  createdAt: string;
}

export interface NewsArticle {
  id: string;
  title: string;
  content: string;
  authorId: string;
  imageUrl?: string;
  createdAt: string;
}

export interface Comment {
  id: string;
  targetId: string;
  userId: string;
  userName: string;
  content: string;
  createdAt: string;
}
