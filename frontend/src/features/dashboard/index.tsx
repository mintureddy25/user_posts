import React, { useState, useEffect } from 'react';
import { deletePost, getAllPosts } from '../../services/api/postapi';
import CreatePost from '../post/create';
import { getImageUrl } from '../../components/utils';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../services/store/store';
import EditPost from '../post/update';
import { PlusIcon } from '@heroicons/react/20/solid';


interface Post {
  id: string;
  imageKey: string;
  title: string;
  description: string;
}


export default function Dashboard() {
  const [posts, setPosts] = useState<any[]>([]); 
  const [loading, setLoading] = useState<boolean>(true);
  const [showCreatPopup, setShowCreatePopup] = useState<boolean>(false);
  const [refresh, setRefresh] = useState<boolean>(false);
  const userDetails = useSelector((state: RootState) => state.auth.user);
  const [showEditPopup, setShowEditPopup] = useState<boolean>(false);
  const navigate = useNavigate();
  const [selectedPost, setSelectedPost] = useState<Post>({ id: '', imageKey: '', title: '', description: '' });

  const handleEditPost = (post: Post) => {
    setSelectedPost(post);
    setShowEditPopup(true);
  };



  useEffect(() => {

    const fetchPosts = async () => {
      try {
        const postsData = await getAllPosts();
        setPosts(postsData);
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [showCreatPopup]);

  const handleCreatePost = () => {
    setShowCreatePopup(true);
    
  };
  const refreshPosts =()=>{

    setRefresh(prev => !prev);

  }
  const closePopup = () => {
    setShowCreatePopup(false);
    setShowEditPopup(false);
  };

  const handleDeletePost = async (postId: string) => {
    try {
      const response = await deletePost(postId);
      setPosts(posts.filter((post) => post.id !== postId));
    } catch (error) {
      console.error('Error deleting post:', error);
    }}


  return (
    <>
    {showCreatPopup && <CreatePost setRefresh={refreshPosts} onClose={closePopup} />}
    {showEditPopup && <EditPost post={selectedPost} setRefresh={refreshPosts} onClose={closePopup} />}
    <div className="bg-white">
    
  <div className="mx-auto max-w-7xl px-6 lg:px-8">
  <button
      type="button"
      onClick={handleCreatePost}
      className="inline-flex items-center justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
    >
      {/* Plus icon from Heroicons */}
      <PlusIcon className="h-5 w-5 text-blue-900 mr-2" />
      <span className="ml-1">Add Post</span>
    </button>
    <ul
      role="list"
      className="mx-auto mt-8 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3 xl:grid-cols-4"
    >
      {posts.map((post) => (
        <li key={post.id} className="relative">
          <img
            alt=""
            src={getImageUrl(post.imageKey)}
            className="aspect-[14/13] w-full rounded-2xl object-cover"
            onClick={()=>{navigate(`/dashboard/${post.id}`)}}
          />
          
          {/* Title and Icons Container */}
          <div className="flex items-center justify-between mt-4">
            {/* Post Title */}
            <h3 className="text-lg font-semibold tracking-tight text-black">
              {post.title}
            </h3>
            
            {/* Icons Container */}
            <div className="flex items-center space-x-2">
              {/* Edit Icon (Pencil) */}
              <button onClick={() => handleEditPost(post)}className="text-gray-600 hover:text-gray-900">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 20h9M16 4l4 4m-4 0L12 9l-4-4m8 4V4m-4 16h4M4 12V4l4 4m0 0l4 4m0 0L8 4m0 0V12"
                  />
                </svg>
              </button>
              
              {/* Delete Icon (Cross or X) */}
              <button onClick={()=>handleDeletePost(post.id)} className="text-red-600 hover:text-red-800">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
        </li>
      ))}
    </ul>
  </div>
</div>

    </>
  );
}
