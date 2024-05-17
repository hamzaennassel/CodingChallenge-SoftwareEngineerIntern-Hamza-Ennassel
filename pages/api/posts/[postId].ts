// pages/api/posts/[postId].ts
import { NextApiRequest, NextApiResponse } from 'next';
import { connectToMongoDB } from '../../../database/db';
import { ObjectId } from 'mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { postId } = req.query;
    const collection = await connectToMongoDB();

    switch (req.method) {
        case 'GET':
            try {
                const post = await collection.findOne({ _id: new ObjectId(postId as string) });
                if (post) {
                    res.status(200).json(post);
                } else {
                    res.status(404).json({ message: 'Post not found' });
                }
            } catch (error) {
                console.error('Error fetching the post:', error);
                res.status(500).json({ message: 'Failed to fetch the post' });
            }
            break;
            case 'PUT':
                try {
                  const { title, content } = req.body;
                  // Validate input
                  if (!title || !content) {
                    return res.status(400).json({ message: 'Title and content are required' });
                  }
              
                  const updatedPost = await collection.findOneAndUpdate(
                    { _id: new ObjectId(postId as string) },
                    { $set: { title, content } },
                    { returnDocument: 'after' }
                  );
              
                  if (updatedPost.value) {
                    res.status(200).json(updatedPost.value);
                  } else {
                    res.status(404).json({ message: 'Post not found' });
                  }
                } catch (error) {
                  console.error('Error updating the post:', error);
                  
                }
                break;
        case 'DELETE':
            try {
                const result = await collection.deleteOne({ _id: new ObjectId(postId as string) });
                if (result.deletedCount === 1) {
                    res.status(200).json({ message: 'Post deleted successfully' });
                } else {
                    res.status(404).json({ message: 'Post not found' });
                }
            } catch (error) {
                console.error('Error deleting the post:', error);
                res.status(500).json({ message: 'Failed to delete the post' });
            }
            break;
        default:
            res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
            res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
