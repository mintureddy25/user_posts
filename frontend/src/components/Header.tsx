import { EnvelopeIcon, PhoneIcon, ArrowLongLeftIcon } from '@heroicons/react/20/solid'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../services/store/store'
import { useEffect, useState } from 'react';
import { getUser } from '../services/api/userapi';
import { clearUserData, setUserData } from '../services/store/authSlice';
import Login from '../features/login';
import { useNavigate } from 'react-router-dom';

const profile = {
  backgroundImage:
    'https://images.unsplash.com/photo-1444628838545-ac4016a5418a?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
}


export default function Header() {

  const userDetails = useSelector((state: RootState) => state.auth.user);
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useDispatch();
  const token = localStorage.getItem('token') || '';
  const navigate = useNavigate();
  useEffect(() => {
    const getUserDetails = async ()  => {

    try{
      setLoading(true);
      const response = await getUser();
      dispatch(setUserData({user:response, token}));

    }catch(error){
      console.log(error);
    }finally{
      setLoading(false);  

      

    } 
    if(!userDetails && token){
      getUserDetails();
    }
  
    }
  }, [])

  const handleLogout =()=>{
    dispatch(clearUserData());
    navigate('/');
  }

  if(loading || !userDetails) return <></>;

  
  return (
    <div>
      <div>
        <img alt="" src={profile.backgroundImage} className="h-32 w-full object-cover lg:h-48" />
      </div>
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="-mt-12 sm:-mt-16 sm:flex sm:items-end sm:space-x-5">
          <div className="flex">
            <img alt="" src={userDetails.image} className="size-24 rounded-full ring-4 ring-white sm:size-32" />
          </div>
          <div className="mt-6 sm:flex sm:min-w-0 sm:flex-1 sm:items-center sm:justify-end sm:space-x-6 sm:pb-1">
            <div className="mt-6 min-w-0 flex-1 sm:hidden md:block">
              <h1 className="truncate text-2xl font-bold text-gray-900">{userDetails.username}</h1>
            </div>
            <div className="mt-6 flex flex-col justify-stretch space-y-3 sm:flex-row sm:space-x-4 sm:space-y-0">
              {/* <button
                type="button"
                className="inline-flex justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              >
                <EnvelopeIcon aria-hidden="true" className="-ml-0.5 mr-1.5 size-5 text-gray-400" />
                <span>Message</span>
              </button>
              <button
                type="button"
                className="inline-flex justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              >
                <PhoneIcon aria-hidden="true" className="-ml-0.5 mr-1.5 size-5 text-gray-400" />
                <span>Call</span>
              </button> */}
              {/* Post Button */}
            </div>
          </div>
        </div>
        <div className="mt-6 hidden min-w-0 flex-1 sm:block md:hidden">
          <h1 className="truncate text-2xl font-bold text-gray-900">{userDetails.username}</h1>
        </div>
        {/* Logout Button in the top-right corner */}
        <div className="absolute top-4 right-4">
          <button
          onClick={handleLogout}
            type="button"
            className="inline-flex justify-center items-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-red-700"
          >
            <ArrowLongLeftIcon aria-hidden="true" className="mr-1.5 h-5 w-5 text-white" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </div>
  )
}
