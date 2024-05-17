// pages/api/posts/index.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { connectToMongoDB } from '../../database/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const collection = await connectToMongoDB();

    switch (req.method) {
        case 'GET':
            try {
                const posts = await collection.find({}).toArray();
                res.status(200).json(posts);
            } catch (error) {
                console.error('Error fetching posts:', error);
                res.status(500).json({ message: 'Failed to fetch posts' });
            }
            break;
        case 'POST':
            try {
                const { title, content } = req.body;
                await collection.insertOne({ title, content });
                res.status(201).json({ message: 'Post created successfully' });
            } catch (error) {
                console.error('Error creating post:', error);
                res.status(500).json({ message: 'Failed to create post' });
            }
            break;
        default:
            res.setHeader('Allow', ['GET', 'POST']);
            res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
