export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  category: string;
  author: string;
  date: string;
  thumbnail: string;
  description: string;
  content: string;
  tags: string;
  views: number;
  featured: boolean;
}

export interface BlogResponse {
  posts: BlogPost[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalPosts: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
  sidebar: {
    categories: string[];
    tags: string[];
    recentPosts: BlogPost[];
    featuredPosts: BlogPost[];
  };
  cache: {
    lastUpdated: string;
    nextUpdate: string;
  };
}

export interface SinglePostResponse {
  post: BlogPost;
} 