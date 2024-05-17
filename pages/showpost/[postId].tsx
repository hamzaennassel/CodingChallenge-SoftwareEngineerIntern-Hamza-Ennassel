import '../../app/globals.css'
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';  // Assurez-vous d'utiliser 'next/router'

const ShowPostPage: React.FC = () => {
  const router = useRouter();
  
  const { postId } = router.query ?? { postId: '' };
 

  const [post, setPost] = useState<{ title: string; content: string; } | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      if (postId) {
        try {
          const response = await fetch(`/api/posts/${postId}`);
          if (response.ok) {
            const postData = await response.json();
            setPost(postData);
          } else {
            throw new Error('Post not found');
          }
        } catch (error) {
          console.error('Error fetching post:', error);
        }
      }
    };

    fetchPost();
  }, [postId]);

  if (!post) {
    return <div>Loading...</div>;  // ou une gestion d'affichage pour les états de chargement ou d'erreur
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="p-8 bg-white rounded shadow-lg max-w-lg w-full">
        <h1 className="text-2xl font-bold mb-3">{post.title}</h1>
        <p className="text-gray-700 text-base mb-4">
          {post.content}
        </p>
        <button onClick={() => router.push('/listposts')} className="text-white bg-blue-500 hover:bg-blue-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default ShowPostPage;
