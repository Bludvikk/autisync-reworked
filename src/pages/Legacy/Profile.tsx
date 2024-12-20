import React, { useEffect, useState } from 'react';

import { Divider } from 'antd';
import { useNavigate } from 'react-router-dom';

import { IActivity } from '~/data';
import { IUser } from '~/types';
import { collections, useListen, useLogin } from '~/utils';

const Profile: React.FC = () => {
  const [user, setUser] = useState<IUser | null>(null);
  const navigate = useNavigate();
  const { user: currentUser, isLoading } = useLogin();

  const { docs: userInfos, isLoading: isUserInfosLoading } = useListen<IUser>({
    collectionRef: collections.users.ref,
  });

  const { docs: activityDocs, isLoading: isActivitiesLoading } =
    useListen<IActivity>({
      collectionRef: collections.activities.ref,
    });

  useEffect(() => {
    if (!isLoading && currentUser) {
      const userInfo = userInfos?.find((user) => user.id === currentUser.uid);
      setUser(userInfo || null);
    }
  }, [isLoading, currentUser, userInfos]);

  if (isLoading || isUserInfosLoading || isActivitiesLoading) {
    return <div className='text-center mt-10'>Loading...</div>;
  }

  if (!user) {
    return <div className='text-center mt-10'>User not found</div>;
  }

  const activities = activityDocs || [];

  const completedActivities = activities.filter((activity) =>
    user.progress?.some((progress) => progress.activityId === activity.id)
  ).length;

  const totalActivities = activities.length;
  const progressPercentage =
    totalActivities > 0
      ? Math.round((completedActivities / totalActivities) * 100)
      : 0;

  return (
    <div className='max-w-3xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md'>
      <h1 className='text-3xl font-bold mb-4'>Milestones</h1>
      <div className='mb-6'>
        <h2 className='text-2xl font-semibold mb-2'>Name:</h2>
        <p className='text-xl'>
          {user.firstName} {user.surname}
        </p>
      </div>
      <div className='mb-6'>
        <h3 className='text-xl font-semibold mb-2'>Progress:</h3>
        <div className='mb-2'>
          <div className='w-full bg-gray-200 rounded-full h-2.5 mb-4 dark:bg-gray-700'>
            <div
              className='bg-[#F7AF5A] h-2.5 rounded-full'
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
          <p className='text-sm text-gray-700'>
            {completedActivities} out of {totalActivities} activities completed
          </p>
        </div>
        <Divider />
        <div>
          <h3 className='text-xl font-semibold mb-2'> Activities Taken </h3>
          <div className='space-y-3'>
            {user.progress?.map((item, index) => {
              const activity = activities.find(
                (act) => act.id === item.activityId
              );

              const badge = activities.find(
                (act) => act.id === item.activityId
              );

              return (
                <div
                  key={index}
                  className='bg-gray-100 flex flex-row items-center justify-between p-3 rounded-md'
                >
                  <div className='flex flex-col'>
                    <p className='font-semibold'>
                      Title: {activity?.title || 'Unknown'}
                    </p>
                    <p>Date: {item.date}</p>
                    <p>
                      Score: {item.score}/{item.total}
                    </p>
                    <p>Room: {item.room}</p>
                  </div>
                  <div>
                    {badge?.badges?.map((bad, index) => (
                      <div className='flex flex-col items-center' key={index}>
                        <h1 className='text-sm font-light'>Badge Earned</h1>
                        <img className='w-20' src={bad.imageLink} />
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <button
        onClick={() => navigate('/legacy/home2')}
        className='bg-[#F7AF5A] hover:scale-110 text-white font-bold py-2 px-4 rounded'
      >
        Back to Home
      </button>
    </div>
  );
};

export default Profile;
