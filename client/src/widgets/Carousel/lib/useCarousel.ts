import { useState, useEffect, useCallback } from 'react';

export const useCarousel = (images: string[], interval: number) => {
  const [activeIndex, setActiveIndex] = useState(0);
  
  const nextSlide = useCallback(() => {
    setActiveIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  }, [images.length]);

  const prevSlide = useCallback(() => {
    setActiveIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  }, [images.length]);

  useEffect(() => {
    const timer = setInterval(nextSlide, interval);
    return () => clearInterval(timer);
  }, [nextSlide, interval]);

  return { activeIndex, nextSlide, prevSlide };
};