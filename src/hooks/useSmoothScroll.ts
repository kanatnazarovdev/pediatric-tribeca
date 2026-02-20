"use client"

import { useCallback } from 'react';

export const useSmoothScroll = () => {
  const scrollToId = useCallback((id: string) => {
    const element = document.getElementById(id);
    
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });

      const cleanUrl = window.location.pathname;
      window.history.replaceState(null, '', cleanUrl);
    }
  }, []);

  return scrollToId;
};