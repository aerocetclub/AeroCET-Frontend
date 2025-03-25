import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import clsx from 'clsx';
import { useNavigate } from 'react-router-dom';

export default function Achievements() {
  const [isActive, setIsActive] = useState(false);
  interface Achievement {
    image: string | undefined;
  }

  const [achievements, setAchievements] = useState<Achievement[]>([]); // Fixed missing state
  const teamRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/achievements`)
      .then((response) => {
        console.log(response.data); 
        setAchievements(response.data); 
        
        // Simulate a 1-second loading delay
        setTimeout(() => {
          setIsActive(false); // Corrected the state setter
        }, 1000);
      })
      .catch((error) => {
        console.error("Error fetching achievements:", error);
      });

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsActive(entry.isIntersecting);
      },
      { threshold: 0.2 }
    );

    if (teamRef.current) {
      observer.observe(teamRef.current);
    }

    return () => {
      if (teamRef.current) {
        observer.unobserve(teamRef.current);
      }
    };
  }, []);

  const goTo = () => {
    navigate('/');
  };

  return (
    <div
      onClick={goTo}
      ref={teamRef}
      className={clsx(
        "p-6 w-full shad lg:m-44 md:my-64 items-center lg:h-[600px] md:h-[700px] sm:h-[700px] flex-1 flex flex-col bg-gray-200 rounded-3xl",
        { 'opacity-0 translate-y-8': !isActive },
        { 'opacity-100 translate-y-0 transition-all duration-700 ease-in-out delay-200': isActive }
      )}
    >
      {/* Heading */}
      <h1
        className={clsx(
          "lg:text-4xl text-3xl font-bold text-gray-800 my-12",
          "transition-all duration-500 ease-in-out",
          { 'opacity-0 translate-y-8': !isActive },
          { 'opacity-100 translate-y-0 delay-500': isActive }
        )}
      >
        Achievements
      </h1>

      {/* Image List */}
      <div className="flex flex-wrap md:flex-row overflow-auto flex-col gap-3">
        {[...achievements].reverse().map((item, index) => (
          <div
            key={index}
            className={clsx(
              "flex-1 flex justify-center items-center min-w-0",
              "transition-all duration-500 ease-in-out",
              { 'opacity-0 translate-y-8': !isActive },
              { 'opacity-100 translate-y-0 delay-700': isActive }
            )}
          >
            <img
              src={item.image}
              alt="Achievement"
              className="rounded-xl w-full max-h-96 object-cover shadow-lg"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
