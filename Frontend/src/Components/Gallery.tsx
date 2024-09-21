import './Gallery.css';
import dummy from '../assets/images/sample picture.jpeg';
import { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';

export default function Gallery() {
  const [isActive, setIsActive] = useState(false);
  const galleryRef = useRef<HTMLDivElement | null>(null);

  // Intersection Observer logic
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsActive(entry.isIntersecting);
      },
      { threshold: 0.1 } // Adjust based on when you want the effect to trigger
    );

    if (galleryRef.current) {
      observer.observe(galleryRef.current);
    }

    return () => {
      if (galleryRef.current) {
        observer.unobserve(galleryRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={galleryRef}
      className={clsx(
        "p-24 w-full shad lg:h-[700px] md:h-[600px] sm:h-[600px] items-center flex-1 flex justify-around lg:flex-row sm:flex-col",
        { 'opacity-0 translate-y-8': !isActive }, // Hidden state
        { 'opacity-100 translate-y-0 transition-all duration-1000 delay-200 ease-in-out': isActive } // Visible state
      )}
    >
      {/* First Scrollable Column */}
      <div className={clsx(
        "flex flex-col scroll-container lg:w-[300px] md:w-[500px] sm:w-[250px] scroll-up items-center justify-around gap-3",
        { 'opacity-0 translate-y-8': !isActive }, // Hidden state
        { 'opacity-100 translate-y-0 transition-all duration-700 delay-300 ease-in-out': isActive } // Visible state
      )}>
        {Array.from({ length: 10 }).map((_, index) => (
          <img key={index} src={dummy} alt="Loader-image" className="rounded-3xl" />
        ))}
      </div>

      {/* Second Scrollable Column */}
      <div className={clsx(
        "flex flex-col scroll-container lg:w-[400px] md:w-[500px] sm:w-[250px] scroll-down items-center justify-around gap-3 mx-2",
        { 'opacity-0 translate-y-8': !isActive }, // Hidden state
        { 'opacity-100 translate-y-0 transition-all duration-1000 delay-700 ease-in-out': isActive } // Visible state
      )}>
        {Array.from({ length: 18 }).map((_, index) => (
          <img key={index} src={dummy} alt="Loader-image" className="rounded-3xl" />
        ))}
      </div>

      {/* Third Scrollable Column */}
      <div className={clsx(
        "flex flex-col scroll-container lg:w-[300px] md:w-[500px] sm:w-[250px] scroll-up items-center justify-around gap-3",
        { 'opacity-0 translate-y-8': !isActive }, // Hidden state
        { 'opacity-100 translate-y-0 transition-all duration-700 delay-500 ease-in-out': isActive } // Visible state
      )}>
        {Array.from({ length: 7 }).map((_, index) => (
          <img key={index} src={dummy} alt="Loader-image" className="rounded-3xl" />
        ))}
      </div>
    </div>
  );
}
