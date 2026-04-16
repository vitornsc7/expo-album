import React, { createContext, ReactNode, useContext, useMemo, useState } from 'react';

export type FeedPost = {
  id: string;
  description: string;
  imageUri: string;
};

type FeedContextValue = {
  posts: FeedPost[];
  addPost: (next: FeedPost) => void;
};

const FeedContext = createContext<FeedContextValue | undefined>(undefined);

export function FeedProvider({ children }: { children: ReactNode }) {
  const [posts, setPosts] = useState<FeedPost[]>([]);

  function addPost(next: FeedPost) {
    setPosts((prev) => [next, ...prev]);
  }

  const value = useMemo(() => ({ posts, addPost }), [posts]);

  return <FeedContext.Provider value={value}>{children}</FeedContext.Provider>;
}

export function useFeed() {
  const context = useContext(FeedContext);

  if (!context) {
    throw new Error('useFeed deve ser usado dentro de FeedProvider.');
  }

  return context;
}
