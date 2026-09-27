import React, { createContext, useContext, useState, useEffect } from 'react';
import { CommunityPost, PrayerRequest, Testimony } from '../types';
import { MOCK_COMMUNITY_POSTS, MOCK_PRAYER_REQUESTS, MOCK_TESTIMONIES } from '../data/mockData';

interface CommunityContextType {
  posts: CommunityPost[];
  prayerRequests: PrayerRequest[];
  testimonies: Testimony[];
  addPost: (content: string, scriptureRef?: string, category?: CommunityPost['category']) => void;
  toggleLikePost: (postId: string) => void;
  toggleAmenPost: (postId: string) => void;
  addPrayerRequest: (title: string, details: string, scriptureFocus?: string, isAnonymous?: boolean) => void;
  prayForRequest: (requestId: string) => void;
  addTestimony: (title: string, story: string, category: string) => void;
  toggleAmenTestimony: (testimonyId: string) => void;
}

const CommunityContext = createContext<CommunityContextType | undefined>(undefined);

export const CommunityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [posts, setPosts] = useState<CommunityPost[]>(() => {
    const saved = localStorage.getItem('zionova_community_posts');
    return saved ? JSON.parse(saved) : MOCK_COMMUNITY_POSTS;
  });

  const [prayerRequests, setPrayerRequests] = useState<PrayerRequest[]>(() => {
    const saved = localStorage.getItem('zionova_prayer_requests');
    return saved ? JSON.parse(saved) : MOCK_PRAYER_REQUESTS;
  });

  const [testimonies, setTestimonies] = useState<Testimony[]>(() => {
    const saved = localStorage.getItem('zionova_testimonies');
    return saved ? JSON.parse(saved) : MOCK_TESTIMONIES;
  });

  useEffect(() => {
    localStorage.setItem('zionova_community_posts', JSON.stringify(posts));
  }, [posts]);

  useEffect(() => {
    localStorage.setItem('zionova_prayer_requests', JSON.stringify(prayerRequests));
  }, [prayerRequests]);

  useEffect(() => {
    localStorage.setItem('zionova_testimonies', JSON.stringify(testimonies));
  }, [testimonies]);

  const addPost = (content: string, scriptureRef?: string, category: CommunityPost['category'] = 'GENERAL') => {
    const newPost: CommunityPost = {
      id: `post-${Date.now()}`,
      authorName: 'Emmanuel Adebayo',
      authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80',
      authorRole: 'USER',
      content,
      scriptureRef,
      category,
      createdAt: 'Just now',
      likesCount: 1,
      commentsCount: 0,
      amenCount: 1,
      userLiked: true,
      userAmen: true,
    };
    setPosts((prev) => [newPost, ...prev]);
  };

  const toggleLikePost = (postId: string) => {
    setPosts((prev) =>
      prev.map((post) => {
        if (post.id === postId) {
          const isLiked = post.userLiked;
          return {
            ...post,
            likesCount: isLiked ? post.likesCount - 1 : post.likesCount + 1,
            userLiked: !isLiked,
          };
        }
        return post;
      })
    );
  };

  const toggleAmenPost = (postId: string) => {
    setPosts((prev) =>
      prev.map((post) => {
        if (post.id === postId) {
          const isAmen = post.userAmen;
          return {
            ...post,
            amenCount: isAmen ? post.amenCount - 1 : post.amenCount + 1,
            userAmen: !isAmen,
          };
        }
        return post;
      })
    );
  };

  const addPrayerRequest = (
    title: string,
    details: string,
    scriptureFocus?: string,
    isAnonymous: boolean = false
  ) => {
    const newRequest: PrayerRequest = {
      id: `pr-${Date.now()}`,
      authorName: isAnonymous ? 'Anonymous Believer' : 'Emmanuel Adebayo',
      title,
      details,
      scriptureFocus,
      isAnonymous,
      prayedCount: 1,
      createdAt: 'Just now',
      status: 'ACTIVE',
      hasUserPrayed: true,
    };
    setPrayerRequests((prev) => [newRequest, ...prev]);
  };

  const prayForRequest = (requestId: string) => {
    setPrayerRequests((prev) =>
      prev.map((req) => {
        if (req.id === requestId) {
          const alreadyPrayed = req.hasUserPrayed;
          return {
            ...req,
            prayedCount: alreadyPrayed ? req.prayedCount - 1 : req.prayedCount + 1,
            hasUserPrayed: !alreadyPrayed,
          };
        }
        return req;
      })
    );
  };

  const addTestimony = (title: string, story: string, category: string) => {
    const newTestimony: Testimony = {
      id: `test-${Date.now()}`,
      authorName: 'Emmanuel Adebayo',
      title,
      story,
      category,
      createdAt: 'Today',
      likesCount: 1,
      amenCount: 1,
      isVerified: true,
    };
    setTestimonies((prev) => [newTestimony, ...prev]);
  };

  const toggleAmenTestimony = (testimonyId: string) => {
    setTestimonies((prev) =>
      prev.map((test) => {
        if (test.id === testimonyId) {
          return {
            ...test,
            amenCount: test.amenCount + 1,
          };
        }
        return test;
      })
    );
  };

  return (
    <CommunityContext.Provider
      value={{
        posts,
        prayerRequests,
        testimonies,
        addPost,
        toggleLikePost,
        toggleAmenPost,
        addPrayerRequest,
        prayForRequest,
        addTestimony,
        toggleAmenTestimony,
      }}
    >
      {children}
    </CommunityContext.Provider>
  );
};

export const useCommunity = () => {
  const context = useContext(CommunityContext);
  if (!context) {
    throw new Error('useCommunity must be used within a CommunityProvider');
  }
  return context;
};
