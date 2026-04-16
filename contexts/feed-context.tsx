import React, { createContext, ReactNode, useContext, useMemo, useState } from 'react';

export type FeedPost = {
  description: string;
  imageUri: string;
};

type FeedContextValue = {
  post: FeedPost | null;
  setPost: (next: FeedPost | null) => void;
};

const FeedContext = createContext<FeedContextValue | undefined>(undefined);

export function FeedProvider({ children }: { children: ReactNode }) {
  const [post, setPost] = useState<FeedPost | null>(null);
  const value = useMemo(() => ({ post, setPost }), [post]);

  return <FeedContext.Provider value={value}>{children}</FeedContext.Provider>;
}

export function useFeed() {
  const context = useContext(FeedContext);

  if (!context) {
    throw new Error('useFeed deve ser usado dentro de FeedProvider.');
  }

  return context;
}
