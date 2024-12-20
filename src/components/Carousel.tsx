import React, { useEffect, useState } from 'react';

import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

interface CarouselItemProps {
  imageUrl: string;
  level: number;
}

const itemClasses: Record<number, string> = {
  '-2': 'w-[22%] h-[60%] left-[20%] blur-[2px] shadow-lg rounded-lg ',
  '-1': 'w-[23%] h-[70%] left-[30%] blur-[1.5px] shadow-xl z-10 rounded-lg',
  '0': 'w-[30%] h-[80%] left-[50%]  shadow-2xl z-20 rounded-lg ',
  '1': 'w-[23%] h-[70%] left-[70%] blur-[1.5px] shadow-xl rounded-lg ',
  '2': 'w-[22%] h-[60%] left-[85%] blur-[2px]  shadow-lg rounded-lg',
};

const CarouselItem: React.FC<CarouselItemProps> = ({ imageUrl, level }) => {
  const className = `absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-250 ease-in-out ${itemClasses[level]}`;

  return (
    <div
      className={className}
      style={{
        backgroundImage: `url(${imageUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    />
  );
};

interface CarouselProps {
  items: string[];
}

const Carousel: React.FC<CarouselProps> = ({ items }) => {
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState('');

  useEffect(() => {
    // Any side effects or initialization logic can go here
  }, []);

  const generateItems = (): React.ReactNode[] => {
    const carouselItems: React.ReactNode[] = [];
    for (let i = active - 2; i < active + 3; i++) {
      let index = i;
      if (index < 0) index += items.length;
      else if (index >= items.length) index %= items.length;
      const level = active - i;
      carouselItems.push(
        <CarouselItem key={index} imageUrl={items[index]} level={level} />
      );
    }
    return carouselItems;
  };

  const moveLeft = (): void => {
    setActive((prevActive) =>
      prevActive === 0 ? items.length - 1 : prevActive - 1
    );
    setDirection('left');
  };

  const moveRight = (): void => {
    setActive((prevActive) => (prevActive + 1) % items.length);
    setDirection('right');
  };

  return (
    <div className='h-[640px] w-full mx-auto inset-0 relative overflow-hidden'>
      <div
        className='arrow arrow-left absolute left-0 top-1/2 transform -translate-y-1/2 cursor-pointer'
        onClick={moveLeft}
      >
        <ChevronLeft
          fontSize='large'
          className='hover:scale-150 transition-all duration-700'
        />
      </div>
      <TransitionGroup className='carousel-items flex justify-center items-center h-full'>
        {generateItems().map((item, index) => (
          <CSSTransition
            key={index}
            timeout={500}
            classNames={direction === 'left' ? 'left' : 'right'}
          >
            {item}
          </CSSTransition>
        ))}
      </TransitionGroup>
      <div
        className='arrow arrow-right absolute right-0 top-1/2 transform -translate-y-1/2 cursor-pointer'
        onClick={moveRight}
      >
        <ChevronRight
          fontSize='large'
          className='hover:scale-150 transition-all duration-700'
        />
      </div>
    </div>
  );
};

export default Carousel;
