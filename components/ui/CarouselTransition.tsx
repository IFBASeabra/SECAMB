'use client';
import { Carousel } from '@material-tailwind/react';
import { useState, useEffect } from 'react';
import Image from 'next/image';

type ArrowProps = {
  handleClick: () => void;
  isDisabled: boolean;
};

type NavigationProps = {
  setActiveIndex: (index: number) => void;
  activeIndex: number;
  length: number;
};

const PrevArrow = ({ handleClick, isDisabled }: ArrowProps) => (
  <button
    onClick={handleClick}
    disabled={isDisabled}
    className="absolute top-2/4 left-4 -translate-y-2/4 rounded-full select-none transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-12 h-12 text-white hover:bg-white/10 active:bg-white/30 grid place-items-center"
  >
    <svg
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      className="h-7 w-7"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M15 19l-7-7 7-7"
      />
    </svg>
  </button>
);

const NextArrow = ({ handleClick, isDisabled }: ArrowProps) => (
  <button
    onClick={handleClick}
    disabled={isDisabled}
    className="absolute top-2/4 right-4 -translate-y-2/4 rounded-full select-none transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-12 h-12 text-white hover:bg-white/10 active:bg-white/30 grid place-items-center"
  >
    <svg
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      className="h-7 w-7"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M9 5l7 7-7 7"
      />
    </svg>
  </button>
);

const Navigation = ({
  setActiveIndex,
  activeIndex,
  length,
}: NavigationProps) => (
  <div className="absolute bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2">
    {Array.from({ length }).map((_, i) => (
      <span
        key={i}
        className={`block h-3 w-3 cursor-pointer rounded-full transition-colors ${
          activeIndex === i ? 'bg-white' : 'bg-white/50'
        }`}
        onClick={() => setActiveIndex(i)}
      />
    ))}
  </div>
);

export function CarouselTransition() {
  const slides = [
    {
      image: '/seabra.jpg',
      text: 'Promovendo o crescimento sustentável, valorizando nossas riquezas naturais e culturais!',
    },
    {
      image: '/morros.webp',
      text: 'Aqui, o progresso caminha lado a lado com a natureza e a cultura do nosso povo.',
    },
    {
      image: '/cachoeira.jpg',
      text: 'Onde o turismo encanta, o meio ambiente é respeitado e o desenvolvimento é feito com responsabilidade',
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 3000);
    return () => clearInterval(interval);
  }, [slides.length]);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="absolute w-full h-[300px] lg:h-[400px]">
      {/* Imagem ativa com next/image */}
      <div className="absolute w-full h-full">
        <Image
          src={slides[activeIndex].image}
          alt={`Imagem ${activeIndex + 1}`}
          fill
          className="object-cover rounded-xl duration-[3000ms] ease-in-out"
          priority
        />
      </div>

      {/* Texto */}
      <div className="absolute inset-0 flex justify-center items-left text-center p-4 bg-black/50 z-70">
        <div className="text-green-100">
          <h2 className="text-3xl font-medium mb-4">
            <strong>SECAMB</strong>
          </h2>
          <span className="text-lg font-medium">
            {slides[activeIndex].text}
          </span>
        </div>
      </div>

      <PrevArrow handleClick={handlePrev} isDisabled={false} />
      <NextArrow handleClick={handleNext} isDisabled={false} />
      <Navigation
        setActiveIndex={setActiveIndex}
        activeIndex={activeIndex}
        length={slides.length}
      />
    </div>
  );
}
