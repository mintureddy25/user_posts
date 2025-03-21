import React, { useState, FormEvent, useEffect } from 'react';
import { updatePost, getPresignedUrl } from '../../services/api/postapi';
import { getImageUrl } from '../../components/utils';

interface EditPostProps {
  post: Post;
  onClose: () => void;
  setRefresh: () => void;
}

interface Post {
  id: string;
  imageKey: string;
  title: string;
  description: string;
}

const EditPost: React.FC<EditPostProps> = ({ post, onClose, setRefresh }) => {
  const [image, setImage] = useState<File | null>(null);
  const [title, setTitle] = useState<string>(post.title);
  const [description, setDescription] = useState<string>(post.description);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    setTitle(post.title);
    setDescription(post.description);
    setImage(null);
  }, [post]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSuccessMessage(null);

    const file = image ? image : null;
    const fileName = file ? (file.name).trim().replace(/\s+/g, '_') : '';
    const fileType = file ? file.type : '';

    try {
      let imageKey = post.imageKey;

      if (file) {
        const presignedUrlResponse = await getPresignedUrl({ fileName, fileType });
        const { presignedUrl, key } = presignedUrlResponse;

        const imageUploadResponse = await fetch(presignedUrl, {
          method: 'PUT',
          body: file,
          headers: {
            'Content-Type': fileType,
          },
        });

        if (!imageUploadResponse.ok) {
          throw new Error('Image upload failed');
        }

        imageKey = key;
      }

      const postData = {
        imageKey: imageKey,
        title: title,
        description: description,
      };

      await updatePost(post.id,postData);

      setSuccessMessage('Post updated successfully!');
      setImage(null);
      setTitle('');
      setDescription('');
      setIsSubmitting(false);

      setRefresh?.();

      onClose();
    } catch (error) {
      console.error('Error updating post:', error);
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Edit Post</h2>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="image" className="block text-lg font-medium text-gray-700">
              Image Upload (optional)
            </label>
            <input
              type="file"
              id="image"
              onChange={handleImageChange}
              className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
            {post.imageKey && !image && (
              <div className="mt-2 text-sm text-gray-500">
                <img src={getImageUrl(post.imageKey)} alt="Post image" className="w-16 h-16 rounded-full object-cover" />
              </div>
            )}
          </div>

          <div>
            <label htmlFor="title" className="block text-lg font-medium text-gray-700">
              Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={handleTitleChange}
              className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-lg font-medium text-gray-700">
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={handleDescriptionChange}
              rows={4}
              className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>

          {successMessage && (
            <div className="text-green-500 text-center font-medium mt-2">
              {successMessage}
            </div>
          )}

          <div className="flex justify-between">
            <button
              type="button"
              onClick={handleCancel}
              className="w-1/3 px-4 py-2 bg-gray-300 text-black font-semibold rounded-md shadow-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-1/3 px-4 py-2 bg-indigo-600 text-white font-semibold rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {isSubmitting ? 'Updating Post...' : 'Update Post'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPost;
