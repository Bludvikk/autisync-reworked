import { useEffect, useRef } from 'react';
import '../../styles/home2.css';

import { ArrowDownward } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

import { UserWrapper } from '~/components';
import Carousel from '~/components/Carousel';
const Home2 = () => {
  const navigate = useNavigate();

  const items = [
    {
      id: 1,
      image: '/assets/images/academic.png',
      alt: 'Academic',
      description:
        'The ACADEMIC part allows users with autism gives them a voice to share their thoughts and preferences about learning. With clear language and visuals, it helps them express what they enjoy, what challenges them, and how they feel in the classroom. by using questions such as basic math and more',
    },
    {
      id: 2,
      image: '/assets/images/social.png',
      alt: 'Social',
      description:
        'The SOCIAL aids to helps them understand  and to exercise users to help them express their feelings and preferences about social interactions. Using simple methods and visuals, it allows them to understand and develop what social queues and behaviors to further aid them in how they prefer to connect with others.',
    },
    {
      id: 3,
      image: '/assets/images/objects.png',
      alt: 'Objects',
      description:
        'The OBJECTS category is a simple and fun way to engage exploration on users, This helps them in their perception, imagination, and problem-solving skills. to understand and familiarize them into daily items that they encounter.',
    },
  ];

  const items2 = [
    {
      id: 1,
      image: '/assets/images/food.png',
      alt: 'FOODS',
      description:
        'The FOOD identification encourages to help recognize and describe different foods based on visual clues which builds familiarity with various foods in a fun, low-pressure way.',
    },
    {
      id: 2,
      image: '/assets/images/action.png',
      alt: 'Actions',
      description:
        'The ACTION identification encourages them to recognize and describe everyday actions. it helps engage their understanding of movements, routines, and reactions. This activity promotes cognitive development and communication skills by linking actions to words and concepts.',
    },
  ];

  const difficulties = [
    {
      id: 1,
      type: 'Easy',
      description:
        'Perfect for beginners or those who are just starting to learn. The flashcards feature simple, familiar images or words that help reinforce basic skills',
    },
    {
      id: 2,
      type: 'Medium',
      description:
        'Aimed at students with some experience. These flashcards present slightly more complex tasks, encouraging students to recognize and understand a broader range of concepts.',
    },
    {
      id: 3,
      type: 'Hard',
      description:
        'Designed for more advanced learners when ready. The flashcards challenge students to engage with more intricate ideas and scenarios, helping to further develop their identification and cognitive skills.',
    },
  ];

  const imageUrls: string[] = [
    '/assets/images/car1.png',
    '/assets/images/car2.png',
    '/assets/images/car3.png',
    '/assets/images/car4.png',
    '/assets/images/car5.png',
  ];

  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch((error) => {
        console.error('Error attempting to play', error);
      });
    }
  }, []);
  return (
    <>
      <UserWrapper />
      <div className='flex space-y-4 flex-col relative items-center justify-center'>
        {/* <img
          className='w-[1600px] h-[450px] mx-20'
          src='/assets/images/autisync-banner.mp4'
        ></img> */}
        <div>
          <video
            style={{
              borderRadius: '24px',
              maxWidth: '100%',
              width: '1200px',
              margin: '0 auto',
            }}
            playsInline
            loop
            muted
            controls
            src='/assets/images/autisync-banner.mp4'
            ref={videoRef}
          />
        </div>
        <button
          onClick={() => navigate('/quiz/category')}
          className='text-[#FFE381] text-4xl font-semibold z-10 rounded-3xl backdrop-blur-md bg-blue-200/30 p-4 absolute bottom-[20%] hover:scale-110 transition-all duration-300 '
        >
          Start Journey
        </button>
        <div className='absolute bottom-1 items-center flex flex-col justify-center'>
          <h1 className=' text-white'>scroll down to learn more</h1>
          <ArrowDownward className='text-white animate-pulse transition-all duration-500' />
        </div>
      </div>

      {/* Section 1 */}
      <div className='flex flex-col items-center justify-center pt-10'>
        <img
          src='/assets/images/banner-white.png'
          className='w-[820px] h-auto'
        />
        <Carousel items={imageUrls} />
        <hr className='w-[1200px] h-1 mx-auto my-4 bg-[#F7AF5A] border-0 rounded md:my-10'></hr>
      </div>
      <div className='absolute right-0 z-10'>
        <img src={'/assets/images/puzzleright.png'} />
      </div>
      <div className='flex flex-col items-start justify-center p-10 rounded-r-2xl shadow-md mx-20 bg-[#F9EFCA]'>
        <div className='pl-4 flex flex-col  sm:flex-col md:flex-col lg:flex-row gap-8'>
          <div>
            <div className='my-10 flex items-start flex-col justify-start'>
              <h1 className='text-4xl'>What is Autisync?</h1>
              <hr className='w-[320px] mt-1 h-1 bg-[#F7AF5A] border-0 rounded'></hr>
            </div>
            <p className='text-2xl font-light'>
              At AUTISYNC, we create inclusive, user-friendly learning
              experiences tailored for individuals with autism. Our thoughtfully
              designed platform reduces distractions, offers clear navigation,
              and features engaging visuals to support focus and learning.
              Backed by educators and therapists, we combine evidence-based
              practices with innovative design to foster confidence,
              independence, and a love for learning. Join us in empowering
              individuals with autism to reach their full potential!
            </p>
          </div>
          <img
            className='w-[640px] h-auto'
            src='/assets/images/img1.png'
            alt='Image'
          />
        </div>
      </div>
      <div className='flex flex-row items-end justify-center'>
        <img className='w-40' src='/assets/images/r1.png' />
        <h1 className='text-5xl mb-6 text-[#375A63]'> About the Activities</h1>
        <img className='w-40' src='/assets/images/r2.png' />
      </div>
      <hr className='w-[1200px] h-1 mx-auto my-2 bg-[#F7AF5A] border-0 rounded md:my-10'></hr>
      <div className='absolute left-0 z-10'>
        <img src={'/assets/images/puzzleleft.png'} />
      </div>
      <div className='items-center flex flex-col justify-center relative'>
        {/* Lesson Types */}

        <div className='py-20 text-4xl underline'>Categories</div>
        <div className='items-center flex flex-row'>
          {items.length > 1 &&
            items.map((item) => (
              <div
                key={item.id}
                className='flex flex-col gap-y-10 items-center justify-center w-[420px] mx-10'
              >
                <img
                  className='w-[400px] object-center h-[400px]'
                  src={item.image}
                  alt={item.alt}
                />
                <p className='w-[400px] h-[200px]'>{item.description}</p>
              </div>
            ))}
        </div>
        <div className='items-center justify-center flex flex-row'>
          {items2.length > 1 &&
            items2.map((item) => (
              <div
                key={item.id}
                className='flex flex-col gap-y-10 items-center justify-center w-[420px] mx-10'
              >
                <img
                  className='w-[400px] object-center h-[400px]'
                  src={item.image}
                  alt={item.alt}
                />
                <p className='w-[400px] h-[200px]'>{item.description}</p>
              </div>
            ))}
        </div>
      </div>
      <div className='items-center flex flex-col justify-center'>
        {/* Lesson Types */}
        <div className='py-10 text-4xl'>Difficulties</div>
        <div className='items-center flex flex-row'>
          {difficulties.length > 1 &&
            difficulties.map((item) => (
              <div
                key={item.id}
                className='flex flex-col gap-y-10 items-center justify-center w-[420px] mx-10'
              >
                <h1 className='w-[320px] text-center text-5xl bg-[#F9EFCA] border-[1px] border-black p-6 rounded-lg object-center h-auto'>
                  {item.type}
                </h1>
                <p className='w-[400px] h-[400px] text-medium px-10 text-center'>
                  {item.description}
                </p>
              </div>
            ))}
        </div>
        <div className='absolute left-0 z-10'>
          <img src={'/assets/images/puzzleleft.png'} />
        </div>
      </div>
    </>
  );
};

export default Home2;
