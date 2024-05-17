import '../../app/globals.css'
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';  

const UpdatePostPage: React.FC = () => {
  const router = useRouter();
  const { postId } = router.query ?? { postId: '' };

  const [post, setPost] = useState({ title: '', content: '' });

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`/api/posts/${postId}`);
        if (res.ok) {
          const postData = await res.json();
          setPost(postData);
        } else {
          throw new Error('Failed to fetch post data');
        }
      } catch (error) {
        console.error('Error fetching post data:', error);
      }
    };

    if (postId) {
      fetchPost();
    }
  }, [postId]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/posts/${postId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(post),
        
      });
      if (response.ok) {
        router.push('/listposts');
      } else {
        throw new Error('Failed to update post');
      }
    } catch (error) {
      console.error('Error updating post:', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setPost({ ...post, [name]: value });
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="p-8 bg-white rounded shadow-lg max-w-md w-full">
        <h1 className="text-xl font-bold mb-4">Update Post</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title:</label>
            <input
              type="text"
              id="title"
              name="title"
              value={post.title}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="content" className="block text-sm font-medium text-gray-700">Content:</label>
            <textarea
              id="content"
              name="content"
              value={post.content}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              rows={4}
            />
          </div>
          <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Update Post
          </button>
          <button onClick={() => router.push('/listposts')} className="text-white bg-blue-500 hover:bg-blue-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
          Back to Home
        </button>
        </form>
      </div>
    </div>
  );
};

export default UpdatePostPage;
