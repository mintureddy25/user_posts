import { CameraIcon } from '@heroicons/react/20/solid';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { marked} from 'marked';
import { getPost } from '../../services/api/postapi';
import { getImageUrl } from '../../components/utils';


interface Post{
    id: number,
    title: string,
    description: string,
    imageKey: string
}
export default function Post() {
  const { id } = useParams(); // Get the post ID from the URL parameters
  const [post, setPost] = useState<any>(null); // State to hold the fetched post data
  const [loading, setLoading] = useState(true); // Loading state
  const navigate = useNavigate();
  

  useEffect(() => {
    const fetchPost = async () => {
      if (id) {
        try {
          const postData = await getPost(id);
          setPost(postData);
          setLoading(false);
        } catch (error) {
          console.error('Error fetching post:', error);
          setLoading(false);
        }
      }
    };

    fetchPost();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!post) {
    return <div>Post not found.</div>;
  }

  const descriptionHtml = marked(post.description);

  return (
    <div className="overflow-hidden bg-white">
      <div className="relative mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="absolute bottom-0 left-3/4 top-0 hidden w-screen bg-gray-50 lg:block" />
        <div className="mx-auto max-w-prose text-base lg:grid lg:max-w-none lg:grid-cols-2 lg:gap-8">
          <div>
            <div className='cursor-pointer' onClick={()=>{navigate('/dashboard')}}>
            <h2 className="text-xl font-semibold text-indigo-600"><p>&larr;</p>Back</h2></div>
            <h3 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{post.title}</h3>
          </div>
        </div>
        <div className="mt-8 lg:grid lg:grid-cols-2 lg:gap-8">
          <div className="relative lg:col-start-2 lg:row-start-1">
            <svg
              fill="none"
              width={404}
              height={384}
              viewBox="0 0 404 384"
              aria-hidden="true"
              className="absolute right-0 top-0 -mr-20 -mt-20 hidden lg:block"
            >
              <defs>
                <pattern
                  x={0}
                  y={0}
                  id="de316486-4a29-4312-bdfc-fbce2132a2c1"
                  width={20}
                  height={20}
                  patternUnits="userSpaceOnUse"
                >
                  <rect x={0} y={0} fill="currentColor" width={4} height={4} className="text-gray-200" />
                </pattern>
              </defs>
              <rect fill="url(#de316486-4a29-4312-bdfc-fbce2132a2c1)" width={404} height={384} />
            </svg>
            <div className="relative mx-auto max-w-prose text-base lg:max-w-none">
              <figure>
                <img
                  alt="Post image"
                  src={getImageUrl(post.imageKey)}
                  width={1184}
                  height={1376}
                  className="aspect-[12/7] w-full rounded-lg object-cover shadow-lg lg:aspect-auto"
                />
                <figcaption className="mt-3 flex text-sm text-gray-500">
                  {/* <CameraIcon aria-hidden="true" className="size-5 flex-none text-gray-400" /> */}
                  {/* <span className="ml-2">Photograph by {post.imageAuthor}</span> */}
                </figcaption>
              </figure>
            </div>
          </div>
          <div className="mt-8 lg:mt-0">
            <div className="mx-auto text-base text-gray-500">
              <div
                className="text-lg"
                dangerouslySetInnerHTML={{ __html: String(descriptionHtml) }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
