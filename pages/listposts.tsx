import '../app/globals.css'
import { EyeIcon, PencilIcon, TrashIcon } from '@heroicons/react/outline';
import React, { useEffect, useState } from 'react';

import axios from 'axios';
import { useRouter } from 'next/router';

const PostsPage: React.FC = () => {
  const [posts, setPosts] = useState([]);
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);
  
  const [totalPosts, setTotalPosts] = useState(0);
   

  const totalPages = Math.ceil(totalPosts / postsPerPage);

  const goToNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const goToPreviousPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  

  useEffect(() => {
    async function fetchPosts() {
      const url = currentPage === 1 
        ? '/api/posts/' // Initial fetch without pagination
        : `/api/posts?page=${currentPage}&limit=${postsPerPage}`; // Fetch with pagination

      try {
        const response = await axios.get(url);
        if (currentPage === 1) {
          // Assuming the initial API doesn't use pagination
          setPosts(response.data);
          setTotalPosts(response.data.length); // If total posts is not given, calculate from array length
        } else {
          // When API call includes pagination
          setPosts(response.data.posts);  // Assuming the API returns posts under a 'posts' key
          setTotalPosts(response.data.total);  // Assuming 'total' is a key in the response
        }
      } catch (error) {
        console.error('Error fetching posts:', error);
        setPosts([]);
        setTotalPosts(0);
      }
    }

    fetchPosts();
  }, [currentPage, postsPerPage]);

  const handleShow = (postId: string) => {
    router.push(`/showpost/${postId}`);
  };

  const handleUpdate = (postId: string) => {
    router.push(`/updatepost/${postId}`);
  };

  const handleDelete = async (postId: string) => {
    try {
      await axios.delete(`/api/posts/${postId}`);
      setPosts(posts.filter((post) => post._id !== postId));
    } catch (error) {
      console.error('Error deleting post:', error);
      // Gérer les erreurs de suppression, afficher un message d'erreur à l'utilisateur, etc.
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Posts List</h1>
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full leading-normal">
          <thead>
            <tr className="text-left text-gray-700 bg-gray-100">
              <th className="px-5 py-3 border-b-2 border-gray-200">Title</th>
              <th className="px-5 py-3 border-b-2 border-gray-200">Content</th>
              <th className="px-5 py-3 border-b-2 border-gray-200">Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post._id} className="border-b">
                <td className="px-5 py-3 border-b">{post.title}</td>
                <td className="px-5 py-3 border-b">{post.content}</td>
                <td className="px-5 py-3 border-b text-sm space-x-3">
                  <button onClick={() => handleShow(post._id)} className="text-blue-500 hover:text-blue-700">
                    <EyeIcon className="h-5 w-5 inline" />
                  </button>
                  <button onClick={() => handleUpdate(post._id)} className="text-yellow-500 hover:text-yellow-700">
                    <PencilIcon className="h-5 w-5 inline" />
                  </button>
                  <button onClick={() => handleDelete(post._id)} className="text-red-500 hover:text-red-700">
                    <TrashIcon className="h-5 w-5 inline" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-between mt-4">
        <button onClick={goToPreviousPage} disabled={currentPage === 1} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">Previous</button>
        <button onClick={goToNextPage} disabled={currentPage === totalPages} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">Next</button>
      </div>
    </div>
  );
  
};

export default PostsPage;
